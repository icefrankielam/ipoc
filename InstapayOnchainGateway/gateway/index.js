/*
 * Server (Gateway) - Entry
**/

require('module-alias/register')

/* Set default env vars for running locally (without docker-compose) */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.PUSH_SUBSCRIPTION_ENCRYPTION_KEY = process.env.PUSH_SUBSCRIPTION_ENCRYPTION_KEY || 'push_subscription_key'
process.env.WEBPUSH_PUBLIC_KEY = process.env.WEBPUSH_PUBLIC_KEY || ''
process.env.WEBPUSH_PRIVATE_KEY = process.env.WEBPUSH_PRIVATE_KEY || ''
process.env.IPOC_EXPRESS_PORT = process.env.IPOC_EXPRESS_PORT || 8000
process.env.IPOC_EXPRESS_SESSION_SECRET = process.env.IPOC_EXPRESS_SESSION_SECRET || 'keyboard cat'
process.env.IPOC_POSTGRES_USER = process.env.IPOC_POSTGRES_USER || 'postgres'
process.env.IPOC_POSTGRES_HOST = process.env.IPOC_POSTGRES_HOST || '127.0.0.1'
process.env.IPOC_POSTGRES_DATABASE = process.env.IPOC_POSTGRES_DATABASE || 'postgres'
process.env.IPOC_POSTGRES_PASSWORD = process.env.IPOC_POSTGRES_PASSWORD || 'password'
process.env.IPOC_POSTGRES_PORT = process.env.IPOC_POSTGRES_PORT || 5432
process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_MAINNET = process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_MAINNET || ''
process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_ROPSTEN = process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_ROPSTEN || '0x730666Fd1409Da3F6d51752C475fDA0934E634E2'
process.env.IPOC_ETH_NETWORK = process.env.IPOC_ETH_NETWORK || 'ropsten'
process.env.IPOC_ETH_ACCOUNT = process.env.IPOC_ETH_ACCOUNT || '0xa9Af3D88E5167cA6E9413CBB9b946EC95FE469ee'
process.env.IPOC_ETH_PRIVATE_KEY = process.env.IPOC_ETH_PRIVATE_KEY || ''
process.env.REDIS_HOST = process.env.REDIS_HOST || 'redis'
process.env.REDIS_PORT = process.env.REDIS_PORT || 6379
process.env.PUSH_SUBSCRIPTION_ENCRYPTION_KEY = process.env.PUSH_SUBSCRIPTION_ENCRYPTION_KEY || 'push_subscription_key'
process.env.WS_GETH_URL = process.env.WS_GETH_URL || 'https://ropsten.infura.io/v3/5ac20e6191bc48e6baf744e90cb12bf6'
process.env.IPOC_INFURA_PROJECT_ID = process.env.IPOC_INFURA_PROJECT_ID || '5ac20e6191bc48e6baf744e90cb12bf6'
process.env.IPOC_INFURA_PROJECT_SECRET = process.env.IPOC_INFURA_PROJECT_SECRET || 'a60b25fea0de4820bf2bdcb75bca591b'


require('@/main').run()
require('@/constructors/EthereumDaemon').run()
