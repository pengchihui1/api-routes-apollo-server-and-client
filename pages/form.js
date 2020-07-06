import gql from 'graphql-tag'
import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/core'
import Router from 'next/router'

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
  // 执行增加
  const [addTodo, { data }] = useMutation(ADD_TODO)

  var num = 1
  const obj = {
    id: num++,
    name: 'dfe',
    status: 'cached',
    titile: '荔枝',
    email: null,
    pwd: null,
    success: true
  }
  const [datas, setDatas] = useState(obj)

  return (
    <ThemeProvider>
      <FormControl>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input type='email' id='email' aria-describedby='email-helper-text' />
        <FormHelperText id='email-helper-text'>
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <Button type='submit' onClick={() => { Router.push('/') }}>添加</Button>
      <div />
    </ThemeProvider>
  )
}

export default Index
