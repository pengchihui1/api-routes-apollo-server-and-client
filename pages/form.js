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
  mutation CreateTodo($name:String ,$pwd:String) {
    addTodo(name:$name, pwd:$pwd) {	
			name
			pwd
		}
	}
`

const Index = () => {
  const [user, setUser] = useState([])
  // 执行查询
  const { loading, error, data } = useQuery(ViewerQuery)
  // 首次记录查询的内容
  useEffect(() => {
    // console.log('nimei', data.viewer.length)
    if (data.viewer.length) {
      // console.log(data.viewer)
      setUser(data.viewer)
    }
  }, [data.viewer])

  // 执行增加
  const [addTodo] = useMutation(ADD_TODO)

  function validateName (value) {
    let error
    if (!value) {
      error = 'Name is required'
    } else {

    }
    return error
  }

  return (
    <ThemeProvider>
      <Formik
        initialValues={{ name: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          addTodo({ variables: { name: values.name, pwd: values.password } })
            .then(({ data }) => {
              setSubmitting(false)
              // 执行增加后的对象 添加到 useState中
              setUser([...user, { ...data.addTodo, id: parseInt(Math.random() * 100) }])
            })
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input {...field} id='name' placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input {...field} id='password' placeholder='password' />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              variantColor='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>

      <List as='ol' styleType='disc'>
        {console.log(user)}
        {
          user.map(function (item, index) {
            return <ListItem key={index}>{item.id}-------{item.name}------- {item.pwd}--------{item.email}</ListItem>
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
