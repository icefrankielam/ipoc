const GraphQLJSON = require('graphql-type-json')

/* Queries */
const me = require('./queries/me')
const myEmployer = require('./queries/myEmployer')
const myBalances = require('./queries/myBalances')
const employers = require('./queries/employers')
const linkEmployeeToEmployerRequests = require('./queries/linkEmployeeToEmployerRequests')
const myLinkEmployerRequest = require('./queries/myLinkEmployerRequest')
const employerLinkedUsers = require('./queries/employerLinkedUsers')

/* Mutations */
const register = require('./mutations/register')
const login = require('./mutations/login')
const logout = require('./mutations/logout')
const createLinkEmployeeToEmployerRequest = require('./mutations/createLinkEmployeeToEmployerRequest')
const updateLinkEmployeeToEmployerRequest = require('./mutations/updateLinkEmployeeToEmployerRequest')
const updateUser = require('./mutations/updateUser')
const createInstapay = require('./mutations/createInstapay')


const resolvers = {
  Query: {
    me,
    myEmployer,
    myBalances,
    employers,
    linkEmployeeToEmployerRequests,
    myLinkEmployerRequest,
    employerLinkedUsers,
  },
  Mutation: {
    register,
    login,
    logout,
    updateUser,
    createInstapay,
    createLinkEmployeeToEmployerRequest,
    updateLinkEmployeeToEmployerRequest,
  },
  JSON: GraphQLJSON,
}

module.exports = resolvers
