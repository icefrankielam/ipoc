const { loan } = require('@/utils/contracts')
const moment = require('moment')

const FEE = 5

const getPayableDays = () => {
  let daysPayable = 0
  let limit
  const date = moment().date()

  if (date > 15) {
    limit = moment().daysInMonth()
  } else {
    limit = 15 
  }
  for (let i = date; i < limit; i++) {
    if (moment().add(i, 'd').day() < 6) daysPayable++
  }
  return daysPayable
}


module.exports = async (_, properties, { redis, res, session, models, user }) => {
  console.log('[Mutations][createInstapay]')
  try {
    // user

    const availableWages = getPayableDays() * user.wagesPerDay

    const amount = availableWages - FEE

    const pay = await loan({ amount })
    console.log(pay)

    return { status: 'hello' }
  } catch (e) {
    throw e
  }
}
