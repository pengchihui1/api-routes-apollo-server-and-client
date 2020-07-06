import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text } from '@chakra-ui/core'
import Router from 'next/router'

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

const Index = () => {
  // 执行查询
  const { loading, error, data: { viewer } } = useQuery(ViewerQuery)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <ThemeProvider>
      <Text as='samp' color='tomato'>apollo-server数据列表</Text>
      <ul>
        {viewer.map(function (item, index) {
          return <li key={index}>name:{item.name}---- pwd:{item.pwd}----email:{item.email}</li>
        })}
      </ul>

      <div />

      <Button type='submit' onClick={() => { Router.push('/apollo-mutations') }}>进入添加页面</Button>
      <div />
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
