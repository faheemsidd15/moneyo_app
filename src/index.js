import React from 'react'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Routes from './routes'

const client = new ApolloClient({
  uri: 'https://localhost:4000',
  cache: new InMemoryCache(),
})

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
