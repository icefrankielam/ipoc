import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
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
  return web3IsInstalled() ? (window.web3.eth.accounts && window.web3.eth.accounts[0]) : null
}

const InstaPoolPayContract = window.web3.eth.contract(instaPayPoolABI).at(poolContractAddress)

const InvestPage = props => {
  const [amount, setAmount] = useState(0)
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
              <Button onClick={() => {
                const priceWei = window.web3.toWei(amount)
                InstaPoolPayContract.fund(
                  {
                    from: getWeb3Wallet(),
                    to: poolContractAddress,
                    value: priceWei,
                    ...gasOptionsFromGasAndSpeed(null, 'fast'),
                  },
                  (err, tx) => {
                    if (err) {
                      log.info(err)
                      return reject(err)
                    } else {
                      log.info('Success! tx: ', tx)
                      return resolve(tx)
                    }
                  }
                )

                fund(amount)
              }}>Fund</Button>
              <pre>{JSON.stringify(data)}</pre>
            </div>
          )
        }}
      </Mutation>
    </div>
  )
}

export default InvestPage
