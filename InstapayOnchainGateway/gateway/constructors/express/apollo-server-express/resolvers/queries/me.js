/* Return the currently logged in user */
module.exports = async (_, {}, { req, session, models, user }) => {
  try {
    return user.get({ plain: true })
  } catch (error) {
    console.error('errors.me', error)
    return null
  }
}
