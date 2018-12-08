const { path } = require('ramda')

/*
 * AuthorizedUserDirective MUTATING
**/
module.exports = async (next, source, args, context) => {
  console.log('[AuthorizedUserDirective] Adding policy context.')
  try {
    const { models, session } = context
    // TODO sanitize and session input
    const id = path(['user', 'id'], session)
    if (!id) throw new Error('errors.AuthorizedUserDirective.no-id')

    const user = await models.Users.findOne({ where: { id } })

    if (!user || !user.id) {
      throw new Error('errors.AuthorizedUserDirective.no-user')
    }

    /* Modify context with user object */
    context.user = user // TODO - deep assign

    // TODO - roles

    // if (!user.hasRole(requiredRole)) {
      // throw new Error("errors.AuthorizedUserDirective.not-authorized")
    // }
    return next(source, args, context)
  } catch(error) {
    throw new Error('errors.AuthorizedUserDirective.operation') 
  }
}
