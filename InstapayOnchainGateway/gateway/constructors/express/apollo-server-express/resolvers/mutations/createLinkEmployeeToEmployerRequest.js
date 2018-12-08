module.exports = async (_, { employerId }, { redis, res, session, models, user, sequelize }) => {
  try {
    // TODO sanitize

    const userId = user.id

    if (!employerId) {
      throw new Error('errors.createLinkPolicyToEmployerRequest.missing-values')
    }

    const txn = await sequelize.transaction()

    await user.update({ employerId })

    let [linkEmployeeToEmployerRequest, created] = await models.LinkEmployeeToEmployerRequests.findOrCreate({
      where: {
        userId,
        status: 'PENDING_REVIEW',
      },
      defaults: {
        employerId,
      },
    })

    if (!created) {
      /* Update request with new employer if necessary */
      linkEmployeeToEmployerRequest = await linkEmployeeToEmployerRequest.update({
        employerId,
        userId,
        status: 'PENDING_REVIEW',
      })
    }

    console.log('requests: ', linkEmployeeToEmployerRequest.get({ plain: true }))

    await txn.commit()
    return linkEmployeeToEmployerRequest.get({ plain: true })
  } catch (e) {
    throw e
  }
}
