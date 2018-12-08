require('module-alias/register')

const cp = require('child_process')

const { sequelize } = require('@/constructors/sequelize')
const { waitForConnection } = require('@/utils')

const run = () => waitForConnection({
  connect: async () => {
    console.log('[Migrate] Running migrations...')
    try {
      // await sequelize.createSchema('public')
      /* Sequelize migrations via sequelize-cli */
      await cp.spawn('yarn', ['migrate'], {
        env: process.env,
        stdio: 'inherit',
      })
      /* Sync tables to models */
      await sequelize.sync({ logging: false })
      console.log('[Migrate] Success.')
    } catch (error) {}
  },
  onError(error, attempts) {
    if (attempts === 0) {
      console.error('[Migrate] Failed. Maximum attempts reached. Exiting.')
      console.error(error)
      process.exit(1)
    }
  },
})

module.exports.run = run
