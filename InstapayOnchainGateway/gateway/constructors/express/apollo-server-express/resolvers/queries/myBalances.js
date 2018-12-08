const { path } = require('ramda')

module.exports = async (_, $, { req, res, sequelize, models, session, user }) => {
  try {
    const users = await models.Users.findAll({
      where: {
        employerId: user.employerId,
      },
      raw: true,
    })
    return users
  } catch (error) {
    console.error(error)
    return null
  }
}

