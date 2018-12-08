const linkEmployer = async ({ user, employerId }) => {
  return user.update({ employerLinkState: 'APPROVED' })
}

const unlinkEmployer = async ({ user }) => {
  return user.update({ employerLinkState: 'REJECTED' })
}

module.exports = async (_, { linkEmployeeRequestId, status }, { sequelize, redis, res, session, models, user }) => {
  try {
    // TODO sanitize
    const linkEmployeeRequestIdSanitized = linkEmployeeRequestId
    const statusStanitized = status

    /* Get LinkEmployeeToEmployerRequest */
    let linkEmployeeRequest = await models.LinkEmployeeToEmployerRequests.findOne({
      where: {
        id: linkEmployeeRequestIdSanitized,
      },
    })

    const txn = await sequelize.transaction()

    /* Update status of the LinkEmployeeToEmployerRequest */
    linkEmployeeRequest = await linkEmployeeRequest.update({ status: statusStanitized })

    let employerId = null

    /* Link or unlink employer based on status change */
    switch(statusStanitized) {
      case 'APPROVED':
        employerId = user.employerId
        await linkEmployer({ user, employerId })
        break
      case 'REJECTED':
      default:
        await unlinkEmployer({ user })
    }

    await txn.commit()

    return linkEmployeeRequest.get({ plain: true })
  } catch (e) {
    throw e
  }
}
