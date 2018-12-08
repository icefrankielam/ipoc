const { path } = require('ramda')

module.exports = async (_, $, { req, res, sequelize, models, session, user }) => {
  try {
    // const employer = await models.Employers.findOne({ where: { id: user.employerId } })
    let linkEmployeeRequest = await models.LinkEmployeeToEmployerRequests.findOne({
      where: {
        employerId: user.employerId,
        userId: user.id,
      },
    })
    return linkEmployeeRequest.get({ plain: true })
  } catch (error) {
    console.error(error)
    return null
  }
}

