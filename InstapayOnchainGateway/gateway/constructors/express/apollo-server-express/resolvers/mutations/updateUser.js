module.exports = async (_, properties, { redis, res, session, models, user }) => {
  try {
    // TODO sanitize
    console.log('properties: ', properties)
    const updatedUser = await user.update(properties)

    return updatedUser.get({ plain: true })
  } catch (e) {
    throw e
  }
}
