const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const { createSession } = require('@/utils/session')

const SALT_ROUNDS = 10

module.exports = async (_, {
  firstName,
  lastName,
  email,
  phone,
  wallet,
  password,
  userType,
  employerId,
  employerName,
}, { req, res, models }) => {
  try {
    // TODO sanitize inputs
    // TODO separate into createUser and createEmployer workflows
    const passwordSanitized = password
    const passwordHash = await bcrypt.hash(passwordSanitized, SALT_ROUNDS)
    const firstNameSanitized = firstName
    const lastNameSanitized = lastName
    const emailSanitized = email
    const walletSanitized = wallet
    const phoneSanitized = phone
    const userTypeSanitized = userType
    const employerNameSanitized = employerName
    const employerIdSanitized = employerId

    const isEmployer = userTypeSanitized === 'EMPLOYER'

    if (isEmployer && !employerNameSanitized) {
      throw new Error('errors.register.invalid-arguments')
    }

    const shouldFindOrCreateEmployer = (isEmployer || employerId)

    /* Create offchain user */
    const [user, created] = await models.Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        firstName: firstNameSanitized,
        lastName: lastNameSanitized,
        email: emailSanitized,
        phone: phoneSanitized,
        wallet: walletSanitized,
        userType: userTypeSanitized,
        passwordHash,
        employerId: employerIdSanitized,
      },
    })

    if (!user || !user.id) {
      throw new Error('errors.register.no-user')
    }
    
    /* Create offchain employer */
    if (shouldFindOrCreateEmployer) {
      const [employer, created] = await models.Employers.findOrCreate({
        where: {
          [Op.or]: [
            { id: employerId },
            { name: employerNameSanitized },
          ],
        },
        defaults: {
          name: employerNameSanitized,
          email: emailSanitized,
          wallet: walletSanitized,
          phone: phoneSanitized,
        },
      })

      /* Add Employer reference to User */
      user.update({ employerId: employer.id })
    }
    

    return {
      user: user.get({ plain: true }),
      tokenData: await createSession({ req, res, user }), /* Create user session */
    }
  } catch (error) {
    console.error(error)
    return error
  }
}
