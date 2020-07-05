import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../apollo/client'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

export default function App ({ Component, pageProps, children }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
		<ThemeProvider>
      <CSSReset />
      {children}
			<Component {...pageProps} />
    </ThemeProvider>
    
    </ApolloProvider>
  )
}
