import ApolloClient from 'apollo-boost'
import localStorage from '@/constructors/localStorage'

const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_ENDPOINT || '/graphql',
  request: operation => {
    const headers = {}
    const accessToken = localStorage.getItem('accessToken')
    const tokenType = 'Bearer'
    if (accessToken) {
      headers['authorization'] = `${tokenType} ${accessToken}`
    }
    operation.setContext({ headers })
  },
})

window.client = client

export default client
