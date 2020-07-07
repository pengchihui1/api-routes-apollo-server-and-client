import { missingDirectiveArgMessage } from 'graphql/validation/rules/ProvidedRequiredArguments'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/core'
import { useRouter } from 'next/router'

// 定义删除内容
const RemoveOne = gql`
 mutation removeToDo($id:Int) {
    removeOne(id:$id) {	
      id
      name
      pwd
		}
	} 
`
const deletes = () => {
	// 使用路由
	const router = useRouter()
	const id1 =router.query.id
		//执行删除
	const [removeOnes] = useMutation(RemoveOne)
	 if (!id1 ) return null
	 
	// 删除事件
	function onRemove () {
	  removeOnes({ variables: { id: parseInt(id1) } }).then(({ data }) => {
	    console.log('删除成功:')
	    // console.log(data)
	    router.push('/form')
	  })
		// .catch((error) => {
	 //    console.log('删除失败')
	 //  })
	}
	
  return(
	 <ThemeProvider>
     <Button
      mt={4}
			onClick={()=>{onRemove()}}
    >
     确认删除
    </Button>
	</ThemeProvider>
  )
}

export default deletes
