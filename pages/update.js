import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, FormControl, FormLabel, FormErrorMessage, Input, List, ListItem } from '@chakra-ui/core'
import { Formik, Field, Form } from 'formik'
import { useRouter } from 'next/router'

// 定义修改内容
const UPDATE_ONE = gql`
   mutation  updataOnes($id:Int,$name:String ,$pwd:String) {
    updataOne(id:$id,name:$name, pwd:$pwd) {
      id	
			name
			pwd
		}
	}
`

const updata = (props) => {
  // 使用路由
  const router = useRouter()
  const id1 = router.query.id
  const a1 = router.query.name
  const a2 = router.query.pwd

  // 执行修改
  const [updateTodo] = useMutation(UPDATE_ONE)
  if (!id1 || !a1 || !a2) return null

  return (
    <ThemeProvider>
      <Formik
        initialValues={{ name: a1, password: a2 }}
        onSubmit={(values, { setSubmitting }) => {
          // const namea = values.name == '' ? a1 : values.name
          // const pwda = values.password == '' ? a2 : values.password
          console.log(id1, values.name, values.password)
          updateTodo({ variables: { id: parseInt(id1), name: values.name, pwd: values.password } })
            .then(({ data }) => {
              console.log('更新成功:')
              console.log(data.updataOne)
              router.push('/form')
              setSubmitting(false)
            }).catch((error) => {
              console.log('更新失败')
              setSubmitting(false)
            })
        }}

      >
        {isSubmitting => (
          <Form>
            <Field name='name'>
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input {...field} id='name' />
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input {...field} id='password' />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              variantColor='teal'
              // isLoading={isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>

    </ThemeProvider>
  )
}

export default updata
