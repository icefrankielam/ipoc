import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { path } from 'ramda'

import instaPayPoolABI from '@/constants/instaPayPoolABI'

import Button from '@/components/Button'

import './InvestPage.sass'


const poolContractAddress = '0x74506c5651b4e496b369fa4ebdd9422629a0d838'

export const ETH_UNIT_MAP = {
  'wei':          '1',
  'kwei':         '1000',
  'ada':          '1000',
  'femtoether':   '1000',
  'mwei':         '1000000',
  'babbage':      '1000000',
  'picoether':    '1000000',
  'gwei':         '1000000000',
  'shannon':      '1000000000',
  'nanoether':    '1000000000',
  'nano':         '1000000000',
  'szabo':        '1000000000000',
  'microether':   '1000000000000',
  'micro':        '1000000000000',
  'finney':       '1000000000000000',
  'milliether':   '1000000000000000',
  'milli':        '1000000000000000',
  'ether':        '1000000000000000000',
  'kether':       '1000000000000000000000',
  'grand':        '1000000000000000000000',
  'einstein':     '1000000000000000000000',
  'mether':       '1000000000000000000000000',
  'gether':       '1000000000000000000000000000',
  'tether':       '1000000000000000000000000000000',
}


export const ETH2WEI = Number(ETH_UNIT_MAP.ether)

export const DEFAULT_GAS_PRICE = 2700000000

export const gasOptionsFromGasAndSpeed = (gas, speed = 'fast') => {
  const gasData = path(['data'], gas)
  if (!gasData) { log.error(`Using a default gasPrice: ${DEFAULT_GAS_PRICE}`) }
  return {
    gasPrice: window.web3.toHex(gasData ? gasData[speed] : DEFAULT_GAS_PRICE),
  }
}


export function web3IsInstalled() {
  return (typeof window !== 'undefined' && window.hasOwnProperty('web3'))
}

export function getWeb3Wallet() {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) return reject(error)
      return resolve(accounts)
    })
    
  })
}

const InstaPoolPayContract = window.web3.eth.contract(instaPayPoolABI).at(poolContractAddress)

const InvestPage = props => {
  const [amount, setAmount] = useState(0)
  const [lastTransaction, setLastTransaction] = useState({})
  const [lastStablizeTransaction, setLastStablizeTransaction] = useState({})

  return (
    <div>
      <h1>InvestPage</h1>

      <Mutation
        mutation={gql`
          mutation Fund($amount: Int) {
            fund(amount: $amount) {
              status
              transactionHash
            }
          }
        `}
      >
        {(fund, { error, data, loading }) => {
          if (error) console.error(error)
          if (loading) return '...loading...'
          return (
            <div>
              <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
              <Button onClick={async () => {
                const priceWei = window.web3.toWei(amount)
                const web3walletArray = await getWeb3Wallet()
                const web3wallet = web3walletArray[0]
                console.log('amount: ', amount)
                console.log('web3walletArray: ', web3walletArray)
                console.log('web3wallet: ', web3wallet)
                console.log('priceWei: ', priceWei)
                console.log('poolContractAddress: ', poolContractAddress)
                console.log('gas stuff: ', gasOptionsFromGasAndSpeed(null, 'fast'))
                InstaPoolPayContract.fund(
                  {
                    from: web3wallet,
                    to: poolContractAddress,
                    value: priceWei,
                    ...gasOptionsFromGasAndSpeed(null, 'fast'),
                  },
                  (err, tx) => {
                    if (err) {
                      log.info(err)
                    } else {
                      log.info('Success! tx: ', setLastTransaction(tx))
                    }
                  }
                )

                fund(amount)
              }}>Fund</Button>

              <br />
              <br />
              <a href={`https://ropsten.etherscan.io/tx/${lastTransaction}`} target="_blank">{JSON.stringify(lastTransaction)}</a>

              <br />
              <br />
              <br />

              <Button onClick={async () => {
                const priceWei = window.web3.toWei(amount)
                const web3walletArray = await getWeb3Wallet()
                const web3wallet = web3walletArray[0]
                InstaPoolPayContract.stablize(
                  (err, tx) => {
                    if (err) {
                      log.info(err)
                    } else {
                      log.info('Success! tx: ', setLastStablizeTransaction(tx))
                    }
                  }
                )

                fund(amount)
              }}>Stablize</Button>
              <br />
              <br />
              <a href={`https://ropsten.etherscan.io/tx/${lastStablizeTransaction}`} target="_blank">{JSON.stringify(lastStablizeTransaction)}</a>
              <br />
              <br />
            </div>
          )
        }}
      </Mutation>
    </div>
  )
}

export default InvestPage
