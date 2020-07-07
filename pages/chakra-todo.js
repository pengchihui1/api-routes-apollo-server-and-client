import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { initializeApollo } from '../apollo/client'
import { ThemeProvider, Button, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box } from '@chakra-ui/core'

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
      <Box width={['100%', '600px', '800px', '1000px']} border={{ sm: 'none', md: '1px solid #7d7d7d' }} h margin='0 auto' mt='20px' padding='20px'>
        <Box padding='10px' opacity='0.4' color='#228B22'>
          <Text display='flex' justifyContent='center' fontSize='24px' b>
            chakra-apollo-todo
          </Text>
        </Box>
        <Box height='auto' display='flex' justifyContent='space-between'>
          {/* 左侧数据列表  删除 修改 */}
          <Box
            width='60%'
            height='400px'
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
            bordre='1px solid black'
          />
          {/* 右侧添加 */}
          <Box width='30%' bordre='1px solid #363636' />
        </Box>
      </Box>
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
