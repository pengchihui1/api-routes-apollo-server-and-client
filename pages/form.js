import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, List, ListItem } from '@chakra-ui/core'
import Router from 'next/router'
import { Formik, Field } from 'formik'

// 定义查询内容
const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
			titile
			email
			pwd
			success
    }
  }
`

// 定义增加内容
const ADD_TODO = gql`
  mutation CreateTodo($id:Int,$name:String ,$pwd:String) {
    addTodo(id:$id,name:$name, pwd:$pwd) {	
			name
			pwd
		}
	}
`

var num = 5
const Index = () => {
  const [user, setUser] = useState([])
  // 执行查询
  const { data } = useQuery(ViewerQuery)
  // 页面初始化 数据
  useEffect(() => {
    if (data.viewer.length) {
      console.log(data.viewer)
      setUser(data.viewer)
    }
  }, [data.viewer])

  // 执行增加  
  const [addTodo] = useMutation(ADD_TODO)

  return (
    <ThemeProvider>
      <Formik
        initialValues={{ name: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          num++
          //随机id
					const ida = parseInt(Math.random() * 1000) + num
          //添加过程
					addTodo({ variables: { id: ida, name: values.name, pwd: values.password } })
            .then(({ data }) => {
              // console.log("添加成功")
							console.log(data)
              // 执行增加返回后的对象 添加到useState中 { ...data.addTodo, id: parseInt(Math.random() * 100) }
              // setUser([...user, { ...data.addTodo, id:ida }])
							 setUser([...user, { ...data.addTodo, id:ida }])
							 setSubmitting(false)
            }).catch((error)=>{
							 console.log("添加失败")
							 setSubmitting(false)
						})
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name='name' >
              {({ field, form }) => (
                <FormControl >
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input {...field} id='name' placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password' >
              {({ field, form }) => (
                <FormControl >
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input {...field} id='password' placeholder='password' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              type='submit'
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>

      <List as='ol' styleType='disc'>
        {/* {console.log(user)} */}
        {
          user.map(function (item, index) {
            return <ListItem key={index} mb='10px'>{item.id}-------{item.name}------- {item.pwd}--------{item.email}<Button onClick={() => { Router.push({ pathname: '/delete', query: { id: item.id} })}}>删除</Button><Button ml='20px' onClick={() => { Router.push({ pathname: '/update', query: { id: item.id, name: item.name, pwd: item.pwd } }) }}>修改</Button></ListItem>
          })
        }
      </List>
    </ThemeProvider>
  )
}

export async function getStaticProps () {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: ViewerQuery
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}
export default Index
