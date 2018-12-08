const { path } = require('ramda')

module.exports = async (_, $, { req, res, sequelize, models, session, user }) => {
  try {
    const employer = await models.Employers.findOne({ where: { id: user.employerId } })
    if (!employer) return null
    return employer.get({ plain: true })
  } catch (error) {
    console.error(error)
    return null
  }
}

