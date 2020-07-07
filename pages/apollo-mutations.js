import React, { useState,useRef ,useEffect} from "react";
import Router from 'next/router'
import { ThemeProvider,Button , Input} from "@chakra-ui/core";
import { useQuery,useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { initializeApollo } from '../apollo/client'

// 定义增加内容
const ADD_TODO = gql`
  mutation AddTodo($name:String! ,$pwd:String!) {
    addTodo(name:$name, pwd:$pwd) {
     returning{
		 name
	     pwd
	
	 }
    }
  }
`


const Indexss = () => {
	
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

export default Indexss