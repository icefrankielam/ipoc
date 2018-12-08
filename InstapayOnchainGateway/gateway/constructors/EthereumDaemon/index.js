const { sequelize, models } = require('@/constructors/sequelize')

// Allow for clean nodemon restarts (see https://github.com/remy/nodemon/issues/1025#issuecomment-308049864)
process.on('SIGINT', () => {
  process.exit()
})

process.on('uncaughtException', (e) => {
  console.error(`[Daemon] unhandled exception: ${e.message} ${e}`)
  process.exit(1)
})

const run = async () => {
  try {
    console.info('[Daemon] Starting...')
    require('./listeners/InstapayOnchainLiquidityPool/logInstapayCreated').run({ sequelize, models })
  } catch (e) {
    console.error('[Daemon] Error.')
    console.error(e)
  }
}

module.exports.run = run
