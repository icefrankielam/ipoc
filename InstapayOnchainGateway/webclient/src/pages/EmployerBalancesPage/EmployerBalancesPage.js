import React, { useState } from 'react'
import { Mutation, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'


import Button from '@/components/Button'

import './EmployerBalancesPage.sass'


const EmployerBalancesPage = ({ data }) => {
  if (data.loading) return '...loading...'
  if (data.error) console.error(data.error)

  const {
    myBalances,
  } = data
  console.log(myBalances)

  return (
    <div className="EmployerBalancesPage">
      <h1>EmployerBalancesPage</h1>
      {!(myBalances && myBalances.length) ? 'No balances' : (
        <div>
          {myBalances.map(({ id, firstName, lastName, balance }, i) => (
            <Mutation
              key={i}
              mutation={gql`
                mutation Repay($userId: Int) {
                  repay(userId: $userId) { status }
                }
              `}
              refetchQueries={() => ([{
                query: gql`{
                  myBalances { id firstName lastName balance }
                }`,
              }])}
              awaitRefetchQueries
            >
              {(repay, { loading, data, error }) => {
                return (
                  <div>
                    {firstName} {lastName} ...... ${balance || '0'} <Button onClick={() => repay({ variables: { userId: parseInt(id, 10) } })} children={'Repay Now'} />
                  </div>
                )
              }}
            </Mutation>
          ))}
        </div>
      )}
    </div>
  )
}

export default compose(
  graphql(gql`{
    myBalances { id firstName lastName balance }
  }`)
)(EmployerBalancesPage)
