/*
 * Server (Gateway) - Bootstrap
**/

const packageJson = require('@/package.json')
const { packages, options } = require('@/config')

const run = async () => {
  console.log(`Bootstrapping Server (Gateway) version ${packageJson.version} ... (${Date.now()})`)
  if (options.migrateOnStartup) await require('@/bin/migrate').run()
  console.log('Constructing API interfaces...')
  const server = await require(`@/constructors/${options.server}`).run()
}

module.exports.run = run
