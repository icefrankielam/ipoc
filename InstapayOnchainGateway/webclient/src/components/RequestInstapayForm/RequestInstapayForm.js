import React, { useState } from 'react'
import { compose, graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import moment from 'moment'

import {
  poolContractAddress,
  gasOptionsFromGasAndSpeed,
  getWeb3Wallet,
  InstaPoolPayContract,
} from '@/constructors/contracts'

import Button from '@/components/Button'

import './RequestInstapayForm.sass'


const FEE = 1

const getPayableDays = () => {
  let daysPayable = 0
  let limit
  const date = moment().date()

  if (date > 15) {
    limit = moment().daysInMonth()
  } else {
    limit = 15 
  }
  for (let i = date; i < limit; i++) {
    if (moment().add(i, 'd').day() < 6) daysPayable++
  }
  return daysPayable
}


const RequestInstapayForm = ({ history, data }) => {

  const [lastTransaction, setLastTransaction] = useState('')

  if (data.loading) return '...loading...'

  const {
    me,
  } = data

  const payableDays = getPayableDays()
  const availableWages = payableDays * me.wagesPerDay
  const loanAmountAvailable = availableWages - me.balance
  const loanAmount = loanAmountAvailable - FEE

  console.log(availableWages)
  console.log(FEE)
  console.log(loanAmount)

  return (
    <Mutation
      mutation={gql`
        mutation UpdateUser($balance: Float) {
          updateUser(balance: $balance) { balance }
        }
      `}
      refetchQueries={() => ([{
        query: gql`{
          me { balance }
        }`,
      }])}
      awaitRefetchQueries
    >
      {(updateUser, { data, error, loading }) => {
        if (loading) return '...loading...'

        return (
          <div className="RequestInstapayForm">
            Next Paycheck: {moment().add(payableDays, 'd').format('YYYY-MM-DD')}, {payableDays} work days from now
            <br /> 

            Available Wages: ${availableWages} DAI
            <br />

            Fee: ${FEE} DAI
            <br />

            I get: ${loanAmount} DAI
            <br />

            <Button
              disabled={Boolean(Math.floor(loanAmount <= 0))}
              onClick={async () => {
                const web3wallet = await getWeb3Wallet()

                InstaPoolPayContract.loan(
                  web3wallet,
                  web3.toWei(loanAmount),
                  {
                    ...gasOptionsFromGasAndSpeed(null, 'fast'),
                  },
                  async (err, tx) => {
                    if (err) {
                      log.info(err)
                    } else {
                      setLastTransaction(tx)
                      log.info('Success! tx: ', tx)
                      await updateUser({ variables: { balance: (me.balance + loanAmount) } })
                    }
                  }
                )
              }}
              children={'Pay Me Now'}
            />

            <br />
            {lastTransaction ? <a target="_blank" href={`https://ropsten.etherscan.io/tx/${lastTransaction}`}>{JSON.stringify(lastTransaction)}</a> : null}

          </div>
        )
      }}
    </Mutation>
  )
}


export default compose(
  graphql(
    gql`{
      me { wagesPerDay balance }
    }`
  )
)(RequestInstapayForm)
