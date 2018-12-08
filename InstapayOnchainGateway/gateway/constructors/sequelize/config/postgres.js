const fs = require('fs')

module.exports = {
  development: {
    username: process.env.IPOC_POSTGRES_USER || 'postgres',
    password: process.env.IPOC_POSTGRES_PASSWORD || 'password',
    database: process.env.IPOC_POSTGRES_DATABASE || 'postgres',
    host: process.env.IPOC_POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.IPOC_POSTGRES_USER || 'postgres',
    password: process.env.IPOC_POSTGRES_PASSWORD || 'password',
    database: process.env.IPOC_POSTGRES_DATABASE || 'postgres',
    host: process.env.IPOC_POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.IPOC_POSTGRES_USER || 'postgres',
    password: process.env.IPOC_POSTGRES_PASSWORD || 'password',
    database: process.env.IPOC_POSTGRES_DATABASE || 'postgres',
    host: process.env.IPOC_POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/postgres-ca-master.crt')
    //   }
    // }
  },
}