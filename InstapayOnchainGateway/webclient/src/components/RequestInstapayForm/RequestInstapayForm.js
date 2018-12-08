import React, { useState } from 'react'
import { compose, graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import moment from 'moment'

import Button from '@/components/Button'

import './RequestInstapayForm.sass'


const FEE = 5

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

  if (data.loading) return '...loading...'

  const {
    me,
  } = data

  const payableDays = getPayableDays()
  const availableWages = payableDays * me.wagesPerDay

  return (
    <Mutation
      mutation={gql`
        mutation CreateInstapay {
          createInstapay { status transactionHash }
        }
      `}
    >
      {(createInstapay, { data, error, loading }) => {
        if (loading) return '...loading...'

        return (
          <div className="RequestInstapayForm">
            Next Paycheck: {moment().add(payableDays, 'd').format('YYYY-MM-DD')}, {payableDays} work days from now
            <br /> 

            Available Wages: ${availableWages} USD
            <br />

            Fee: ${FEE} USD
            <br />

            I get: ${availableWages - FEE} USD
            <br />

            <Button
              onClick={async () => {
                await createInstapay()
              }}
              children={'Pay Me Now'}
            />

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
