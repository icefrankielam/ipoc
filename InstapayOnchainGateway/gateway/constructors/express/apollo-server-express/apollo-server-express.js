const { ApolloServer } = require('apollo-server-express')
const { sequelize, models } = require('@/constructors/sequelize')
const { packages } = require('@/config')

const schema = require('./schema')
const resolvers = require('./resolvers')
const { sessionFromRequest } = require('@/utils/session')


const apolloServerExpress = new ApolloServer({
  schema,
  resolvers,
  context: async ({ req, res }) => {
    const session = await sessionFromRequest({ req })
    return {
      req,
      res,
      redis: packages.express.redis ? require('@/constructors/redis') : null,
      sequelize,
      models,
      session,
    }
  },
  playground: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
})

module.exports = apolloServerExpress
