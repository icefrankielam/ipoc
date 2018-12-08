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
process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_ROPSTEN = process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_ROPSTEN || '0x74506c5651b4e496b369fa4ebdd9422629a0d838'
process.env.IPOC_ETH_NETWORK = process.env.IPOC_ETH_NETWORK || 'ropsten'
process.env.IPOC_ETH_ACCOUNT = process.env.IPOC_ETH_ACCOUNT || '0xa9Af3D88E5167cA6E9413CBB9b946EC95FE469ee'
process.env.IPOC_ETH_PRIVATE_KEY = process.env.IPOC_ETH_PRIVATE_KEY || ''
process.env.REDIS_HOST = process.env.REDIS_HOST || 'redis'
process.env.REDIS_PORT = process.env.REDIS_PORT || 6379
process.env.PUSH_SUBSCRIPTION_ENCRYPTION_KEY = process.env.PUSH_SUBSCRIPTION_ENCRYPTION_KEY || 'push_subscription_key'
process.env.WS_GETH_URL = process.env.WS_GETH_URL || 'https://ropsten.infura.io/v3/bb33dcb7a6b94ab4a66d33d12ec0c53e'


require('@/main').run()
require('@/constructors/EthereumDaemon').run()
