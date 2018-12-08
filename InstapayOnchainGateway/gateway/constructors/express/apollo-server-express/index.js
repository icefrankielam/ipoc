const apolloServerExpress = require('./apollo-server-express')


module.exports.run = ({ app }) => {
  apolloServerExpress.applyMiddleware({ app, path: '/graphql' })
  console.log(`Initialized ApolloServerExpress middleware.`)
  return [app, apolloServerExpress]
}
