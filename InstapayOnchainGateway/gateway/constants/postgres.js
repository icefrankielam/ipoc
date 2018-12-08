const host = process.env.IPOC_POSTGRES_HOST || '127.0.0.1'
const port = process.env.IPOC_POSTGRES_PORT || 5432
const database = process.env.IPOC_POSTGRES_DATABASE || 'postgres'
const dialect = 'postgres'
const user = process.env.IPOC_POSTGRES_USER || 'postgres'
const password = process.env.IPOC_POSTGRES_PASSWORD || 'password'
const url = `postgresql://${user}:${password}@${host}:${port}/${database}`

module.exports = {
  host,
  port,
  database,
  dialect,
  password,
  url,
  user,
}
