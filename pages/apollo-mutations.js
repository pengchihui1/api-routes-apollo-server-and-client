import React, { useState, useRef, useEffect } from 'react'
import Router from 'next/router'
import { ThemeProvider, Button, Input } from '@chakra-ui/core'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { initializeApollo } from '../apollo/client'

// 定义增加内容
const ADD_TODO = gql`
<<<<<<< HEAD
  mutation AddTodo($name:String! ,$pwd:String!) {
    addTodo(name:$name, pwd:$pwd) {
     returning{
		 name
	     pwd
	
	 }
    }
  }
=======
  mutation CreateTodo($name:String ,$pwd:String) {
    addTodo(name:$name, pwd:$pwd) {	
			name
			pwd
		}
	}
>>>>>>> 8c19a70e99e4c813b9137b5608e42dae051f00e1
`
// mutation查询mutation {addTodo{name 	pwd }	}

const Indexss = () => {
<<<<<<< HEAD
	
	//执行增加
    const [addTodo, { data,error: mutationError } ] = useMutation(ADD_TODO);
	console.log(addTodo)
	console.log(data) 
	
	 return(
	 <ThemeProvider>
	    <div>
      <form  onSubmit={e => {e.preventDefault(); addTodo({variables:{ name:'123sdfef',pwd:'485safe' }}); }} >
        <Button type="submit">Add Todo</Button>
      </form>
    </div>
	</ThemeProvider>
	 )
	
}
export async function getStaticProps () {
  const apolloClient = initializeApollo()
  await apolloClient.query({
	mutation:ADD_TODO
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}
=======
  // 执行增加
  const [addTodo, { data }] = useMutation(ADD_TODO)

  return (
    <ThemeProvider>
      <div>
        <form onSubmit={e => { e.preventDefault; addTodo({ variables: { name: '123sdfef', pwd: '485safe' } }) }}>
          <Button type='submit'>  Add Todo</Button>
        </form>
      </div>
    </ThemeProvider>
  )
}
>>>>>>> 8c19a70e99e4c813b9137b5608e42dae051f00e1

export default Indexss
