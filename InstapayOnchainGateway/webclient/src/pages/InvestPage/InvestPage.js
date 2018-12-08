import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { path } from 'ramda'

import {
  poolContractAddress,
  gasOptionsFromGasAndSpeed,
  getWeb3Wallet,
  InstaPoolPayContract,
} from '@/constructors/contracts'

import Button from '@/components/Button'

import './InvestPage.sass'



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
                      setLastTransaction(tx)
                      log.info('Success! tx: ', tx)
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
                InstaPoolPayContract.stabilize(
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
