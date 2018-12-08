module.exports = async (_, $, { req, res, sequelize, models, user }) => {
  return await models.LinkEmployeeToEmployerRequests.findAll({
    where: {
      employerId: user.employerId,
    },
    raw: true,
  })
}
