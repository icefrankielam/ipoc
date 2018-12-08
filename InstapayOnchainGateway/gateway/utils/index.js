module.exports.sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))

module.exports.waitForConnection = async ({
  attempts = Infinity,
  interval = 3000, /* ms */
  connect = () => {},
  onError = error => {
    console.error('Connection error.', error)
    throw new Error('Failed to connect')
  },
}) => {
  if (attempts === 0) {
    onError()
  }
  try {
    return connect()
  } catch (e) {
    onError(e, attempts)
    await sleep(interval)
    return run(connectionString, attempts - 1, interval)
  }
}
