 module.exports = async (_, { employerId }, { req, res, sequelize, models, user }) => {
  try {

    console.log('user.employerId: ', user.employerId)

    if (employerId) {
      return await models.LifePolicies.findAll({ where: { employerId } })
    }

    return await models.LifePolicies.findAll({ where: { employerId: user.employerId } })
  } catch(error) {
    console.error('errors.employerLinkedPolicies', error)
    return null
  }
}
