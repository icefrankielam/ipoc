module.exports = async (_, $, { req, res, sequelize, models }) => {
  return await models.Employers.findAll({ raw: true })
}
