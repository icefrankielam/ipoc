const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const AuthorizedUserDirective = require('./directives/AuthorizedUserDirective')

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers: {
    AuthorizedUser: AuthorizedUserDirective,
  },
})