const { Client } = require('pg')

const { waitForConnection } = require('@/utils')

const {
  url,
  host,
} = require('@/constants/postgres')

const run = () => waitForConnection({
  connect: async () => {
    const client = new Client({ connectionString: url })
    const pgInterface = await client.connect()
    console.log(`Connected to postgres host: ${host}`)
    return pgInterface
  },
  onError(e) {
    console.error('Error connecting to postgres', e)
  },
})

module.exports = run()
