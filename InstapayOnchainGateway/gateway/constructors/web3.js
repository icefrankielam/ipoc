const Web3 = require('web3')


let web3
let reconnectTimeout

const reconnect = () => {
  clearTimeout(reconnectTimeout)
  reconnectTimeout = setTimeout(() => {
    const socketAddress = process.env.WS_GETH_URL
    console.log(`[Geth websocket] Re-connecting: ${socketAddress}...`)
    web3 = Web3Provider({ socketAddress })
  }, 5000)
}

const Web3Provider = ({ socketAddress = `wss://${process.env.IPOC_ETH_NETWORK}.infura.io/ws` }) => {
  const { WebsocketProvider, HttpProvider } = Web3.providers
  console.log(`[Geth websocket] Initializing connection... ${socketAddress}`)
  let provider = new WebsocketProvider(socketAddress)
  provider.on('connect', () => console.log(`[Geth websocket] connected: ${socketAddress}.`))
  provider.on('end', e => {
    console.error(`[Geth websocket] Connection ended: ${socketAddress}.`)
    reconnect()
  })
  provider.on('error', e => {
    console.error(`[Geth websocket] Error: ${socketAddress}.`, e)
    reconnect()
  })
  return new Web3(provider)
}


// module.exports = Web3Provider({ socketAddress: process.env.WS_GETH_URL })
console.log('process.env.WS_GETH_URL: ', process.env.WS_GETH_URL)
module.exports = new Web3(new Web3.providers.HttpProvider(process.env.WS_GETH_URL))
