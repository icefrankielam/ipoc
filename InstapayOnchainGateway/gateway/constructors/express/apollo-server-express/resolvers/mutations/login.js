const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const { createSession } = require('@/utils/session')

const SALT_ROUNDS = 10 // TODO bcrypt shared vars

module.exports = async (_, {
  identifier,
  password,
}, { req, res, models }) => {
  try {
    // TODO sanitize and standardize inputs
    if (!identifier) throw new Error('errors.auth.no-identifier')
    if (!password) throw new Error('errors.auth.no-password')

    const user = await models.Users.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    })

    if (!user || !user.id) {
      throw new Error('errors.auth.no-user')
    }

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) {
      throw new Error('errors.auth.invalid-password')
    }

    /* Create user session */
    const tokenData = await createSession({ req, res, user })

    return {
      tokenData,
      user: user.get({ plain: true }),
    }
  } catch (error) {
    console.error(error)
    return error
  }
}
