import { missingDirectiveArgMessage } from 'graphql/validation/rules/ProvidedRequiredArguments'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/core'
import { useRouter } from 'next/router'

// 定义查询内容
const NewQuery = gql`
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
const deletes = () => {
  // 使用路由
  const router = useRouter()
  const id1 = router.query.id
  // 执行查询
  const { data } = useQuery(NewQuery)

  // 查询事件
  function onQuery() {
    viewer({ variables: { id: parseInt(id1) } }).then(({ data }) => {
      console.log('查询成功:')
      // console.log(data)
      router.push('/form')
    }).catch((error) => {
      console.log('查询失败')
    })
  }

  return (
    <ThemeProvider>
      <Button
        mt={4}
        onClick={() => { onQuery() }}
      >
        重新查询数据
      </Button>
    </ThemeProvider>
  )
}

export default deletes
