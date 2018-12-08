const axios = require('axios')

const DEFAULT_NETWORK = 'mainnet'

const KYBER_ROOT_URL = {
  ropsten: 'https://ropsten-api.kyber.network',
  mainnet: 'https://api.kyber.network',
}


class Kyber {

  constructor({ network, lazy = false }) {
    this.ROOT_API_URL = KYBER_ROOT_URL[network] || KYBER_ROOT_URL[DEFAULT_NETWORK]
    this.lazy = lazy
    this.rates = {}
    if (!lazy) this.getSupportedTokens()
  }

  async getSupportedTokens() {
    try {
      const { data } = await axios.get(`${this.ROOT_API_URL}/currencies`)
      this.supportedTokens = data.data
    } catch (error) {
      console.error(error)
    }
    return this.supportedTokens
  }

  async getBuyRates(id, qty) {
    try {
      this.rates[id] = await axios.get(`${this.ROOT_API_URL}/buy_rate?id=${id}&qty=${qty}`)
    } catch (error) {
      console.error(error)
    }
    return this.rates[id]
  }

  async getBuyRateForToken(token, qty = 1) {
    try {
      this.tokens = await axios.get(`${this.ROOT_API_URL}/buy_rate?id=${this.supportedTokens.find(entity => entity.id === token)}&qty=${qty}`)
    } catch (error) {
      console.error(error)
    }
    return this.buyRates
  }

  async getTradeDetails(user_address, src_id, dst_id, src_qty, min_dst_qty, gas_price) {
    try {
      this.tradeDetails = await axios.get(`${this.ROOT_API_URL}/trade_data?user_address=${user_address}&src_id=${src_id}&dst_id=${dst_id}&src_qty=${src_qty}&min_dst_qty=${min_dst_qty}&gas_price=${gas_price}`)
    } catch (error) {
      console.error(error)
    }
    return this.tradeDetails
  }

  async getAllPrices() {
    try {
      this.market = await axios.get(`${this.ROOT_API_URL}/market`)
    } catch (error) {
      console.error(error)
    }
    return this.market
  }

}


// await getSupportedTokens()
// await getBuyRates('0xdd974D5C2e2928deA5F71b9825b8b646686BD200', '300')
// await getTradeDetails('0x8fa07f46353a2b17e92645592a94a0fc1ceb783f', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '0xdd974D5C2e2928deA5F71b9825b8b646686BD200', '0.6', '300', 'medium')


module.exports = Kyber
