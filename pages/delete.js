import { missingDirectiveArgMessage } from 'graphql/validation/rules/ProvidedRequiredArguments'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/core'
import Router from 'next/router'


// 定义删除内容
const removeTodo = gql`
 mutation removeToDo($id:Int) {
    removeTodo(id:$id) {	
      id
			name
      email	
		}
	}
`
const delete = () => {
  rerutn(
    <div></div>
  )
}

export default delete
