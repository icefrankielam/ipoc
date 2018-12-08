const axios = require('axios')
const Tx = require('ethereumjs-tx')

const web3 = require('@/constructors/web3')
const Kyber = require('@/constructors/kyber')

const kyber = new Kyber({ network: process.env.IPOC_ETH_NETWORK })

const instaPayPoolContractABI = require('./InstaPayPool/abi.json')

const networkAddressMap = {
  mainnet: {
    InstaPayPool: process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_MAINNET,
  },
  ropsten: {
    InstaPayPool: process.env.IPOC_INSTAPAY_POOL_CONTRACT_ADDRESS_ROPSTEN,
  },
}


const instaPayPoolContract = new web3.eth.Contract(instaPayPoolContractABI, networkAddressMap[process.env.IPOC_ETH_NETWORK].InstaPayPool)


const getNonce = address => {
  // http://qnimate.com/calculating-nonce-for-raw-transactions-in-geth/
  return web3.eth.getTransactionCount(address).then(count => {
    console.log('[utils][contracts][getNonce] nonce count: ', count)
    return count // TODO - get working, probably need geth node to sync fully
    return new Promise((resolve, reject) => {
      try {
        const getPendingTxCount = () => web3.currentProvider.send({
          method: 'txpool_inspect',
          params: [],
          jsonrpc: '2.0',
          id: new Date().getTime(),
        }, (error, result) => {
          console.log('[utils][contracts][getNonce] nonce result: ', result)
          if (error) {
            console.log('[utils][contracts][getNonce] nonce error:', error)
            // continue even if error
          }
          const good = result && result.result && result.result.pending
          if (good && result.result.pending[address]) {
            const pendingTxCount = Object.keys(result.result.pending[address]).length
            console.log(`[utils][contracts][getNonce] ${pendingTxCount} pending transactions found!`)
            resolve(count + pendingTxCount)
          }
          resolve(count)
        })
      } catch (error) {
        console.error(error)
        return resolve(count)
      }
    })
  })
}


const DEFAULT_GAS_PRICE = 8
const DEFAULT_GAS_LIMIT = 3e7
const getGasPriceJSON = async () => {
  try {
    const { data } = await axios('https://ethgasstation.info/json/ethgasAPI.json')
    return data
  } catch (error) {
    console.log(error)
    console.log('[utils][contracts][getGasPriceJSON] Fetch failed, using default value.')
    // return default if fetch failed
    return {fast: DEFAULT_GAS_PRICE}
  }
}

const getGasPrice = async () => {
  const gasPriceJSON = await getGasPriceJSON()
  const gasPrice = gasPriceJSON['fast']/10
  // console.log('gas price: ', gasPrice)
  // Wei expects numbers as strings or BigNumber objects to avoid precision errors
  return Number(web3.utils.toWei(gasPrice.toString(), 'shannon')) + 1000000000
}



const loan = async ({ borrowerAddress, amount }) => {
  try {
    console.log('borrowerAddress: ', borrowerAddress)
    console.log('amount: ', amount)
    const amountString = web3.utils.toWei(amount.toString())
    console.log('amountString: ', amountString)
    const borrowerAddressEncoded = web3.eth.abi.encodeParameter('address', borrowerAddress)
    const amountStringEncoded = web3.eth.abi.encodeParameter('uint256', amountString)
    console.log('borrowerAddressEncoded: ', borrowerAddressEncoded)
    console.log('amountStringEncoded: ', amountStringEncoded)
    const txBuilder = instaPayPoolContract.methods.loan(
      borrowerAddress,
      amountStringEncoded
    )
    const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.IPOC_ETH_PRIVATE_KEY)
    console.log('account: ', account)
    web3.eth.accounts.wallet.add(account)
    const nonce = await getNonce(process.env.IPOC_ETH_ACCOUNT)
    console.log('nonce: ', nonce)

    const bal = await web3.eth.getBalance(web3.eth.accounts.wallet[0].address)
    console.log('balance: ', bal)

    const gasPrice = await getGasPrice()
    console.log('gasPrice: ', gasPrice)

    const txObject = {
      gas: web3.utils.toHex(2e5),
      gasPrice: web3.utils.toHex(gasPrice),
      data: txBuilder.encodeABI(),
      from: account.address,
      to: instaPayPoolContract._address,
      nonce: web3.utils.toHex(nonce),
      chainId: 3,
    }

    const rawTx = new Tx(txObject)
    console.log('rawTx: ', rawTx)
    rawTx.sign(new Buffer.from(process.env.IPOC_ETH_PRIVATE_KEY, 'hex'))
    const serializedTx = rawTx.serialize()
    const hexTx = serializedTx.toString('hex')
    const prefixedTx = '0x' + hexTx
    const tx = await web3.eth.sendSignedTransaction(prefixedTx)
    console.log('[utils][contracts][loan] transactionHash: ', tx.transactionHash)
    return tx
    return null
  } catch (error) {
    console.error(error)
    console.log('error.name', error.name)
    console.log('error.message', error.message)
    console.log('\n\n retry \n\n')
    if (true /* TODO - is "connection not open" */) {
      setTimeout(() => loan({ amount, borrowerAddress }), 3000)
    }
  }
}



const repay = async ({ amount, borrowerAddress }) => {
  try {
    console.log('amount: ', amount)
    console.log('borrowerAddress: ', borrowerAddress)
    const txBuilder = instaPayPoolContract.methods.repay(
      borrowerAddress,
      web3.eth.abi.encodeParameter('uint256', web3.utils.toWei(amount.toString())) // BN
    )
    const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.IPOC_ETH_PRIVATE_KEY)

    web3.eth.accounts.wallet.add(account)
    const nonce = await getNonce(process.env.IPOC_ETH_ACCOUNT)

    // const bal = await web3.eth.getBalance(web3.eth.accounts.wallet[0].address)
    // console.log('balance: ', bal)

    const gasPrice = await getGasPrice()


    const txObject = {
      gas: web3.utils.toHex(2e5),
      gasPrice: web3.utils.toHex(gasPrice),
      data: txBuilder.encodeABI(),
      from: account.address,
      to: instaPayPoolContract._address,
      nonce: web3.utils.toHex(nonce),
      chainId: 3,
    }

    const rawTx = new Tx(txObject)
    rawTx.sign(new Buffer.from(process.env.IPOC_ETH_PRIVATE_KEY, 'hex'))
    const serializedTx = rawTx.serialize()
    const hexTx = serializedTx.toString('hex')
    const prefixedTx = '0x' + hexTx
    const tx = await web3.eth.sendSignedTransaction(prefixedTx)
    console.log('[utils][contracts][repay] transactionHash: ', tx.transactionHash)
    return tx
    return null
  } catch (error) {
    console.error(error)
    console.log('error.name', error.name)
    console.log('error.message', error.message)
    console.log('\n\n retry \n\n')
    if (true /* TODO - is "connection not open" */) {
      setTimeout(() => repay({ borrowerAddress, amount }), 3000)
    }
  }
}

const stabilize = async ({}) => {
  try {
    const txBuilder = instaPayPoolContract.methods.stabilize()
    const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.IPOC_ETH_PRIVATE_KEY)

    web3.eth.accounts.wallet.add(account)
    const nonce = await getNonce(process.env.IPOC_ETH_ACCOUNT)

    // const bal = await web3.eth.getBalance(web3.eth.accounts.wallet[0].address)
    // console.log('balance: ', bal)

    const gasPrice = await getGasPrice()


    const txObject = {
      gas: web3.utils.toHex(2e5),
      gasPrice: web3.utils.toHex(gasPrice),
      data: txBuilder.encodeABI(),
      from: account.address,
      to: instaPayPoolContract._address,
      nonce: web3.utils.toHex(nonce),
      chainId: 3,
    }

    const rawTx = new Tx(txObject)
    rawTx.sign(new Buffer.from(process.env.IPOC_ETH_PRIVATE_KEY, 'hex'))
    const serializedTx = rawTx.serialize()
    const hexTx = serializedTx.toString('hex')
    const prefixedTx = '0x' + hexTx
    const tx = await web3.eth.sendSignedTransaction(prefixedTx)
    console.log('[utils][contracts][stabilize] transactionHash: ', tx.transactionHash)
    return tx
    return null
  } catch (error) {
    console.error(error)
    console.log('error.name', error.name)
    console.log('error.message', error.message)
    console.log('\n\n retry \n\n')
    if (true /* TODO - is "connection not open" */) {
      setTimeout(() => stabilize({}), 3000)
    }
  }
}


const fund = async ({ amount }) => {
  try {
    const txBuilder = instaPayPoolContract.methods.fund(
      web3.eth.abi.encodeParameter('uint256', amount * Math.pow(10, 18)) // BN
    )
    const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.IPOC_ETH_PRIVATE_KEY)

    web3.eth.accounts.wallet.add(account)
    const nonce = await getNonce(process.env.IPOC_ETH_ACCOUNT)

    // const bal = await web3.eth.getBalance(web3.eth.accounts.wallet[0].address)
    // console.log('balance: ', bal)

    const gasPrice = await getGasPrice()


    const txObject = {
      gas: web3.utils.toHex(2e5),
      gasPrice: web3.utils.toHex(gasPrice),
      data: txBuilder.encodeABI(),
      from: account.address,
      to: instaPayPoolContract._address,
      nonce: web3.utils.toHex(nonce),
      chainId: 3,
    }

    const rawTx = new Tx(txObject)
    rawTx.sign(new Buffer.from(process.env.IPOC_ETH_PRIVATE_KEY, 'hex'))
    const serializedTx = rawTx.serialize()
    const hexTx = serializedTx.toString('hex')
    const prefixedTx = '0x' + hexTx
    const tx = await web3.eth.sendSignedTransaction(prefixedTx)
    console.log('[utils][contracts][fund] transactionHash: ', tx.transactionHash)
    return tx
    return null
  } catch (error) {
    console.error(error)
    console.log('error.name', error.name)
    console.log('error.message', error.message)
    console.log('\n\n retry \n\n')
    if (true /* TODO - is "connection not open" */) {
      setTimeout(() => fund({}), 3000)
    }
  }
}




module.exports = {
  getNonce,
  instaPayPoolContract,
  loan,
  repay,
  stabilize,
  fund,
}
