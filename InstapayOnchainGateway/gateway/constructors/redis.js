const bluebird = require('bluebird')
const { createClient, RedisClient, Multi } = require('redis')

const { waitForConnection } = require('@/utils')

const run = () => waitForConnection({
  connect: async () => {
    console.log('Connecting to redis...')
    /* use promises for redis methods */
    bluebird.promisifyAll(RedisClient.prototype)
    bluebird.promisifyAll(Multi.prototype)

    const client = await createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    })

    client.on('error', err => console.error('RedisClient error:', err))

    console.log('RedisClient keys:', await client.keysAsync('*'))
    return client
  },
  onError(e) {
    console.error('Error connecting to redis: ', e)
  },
})

module.exports = run()
