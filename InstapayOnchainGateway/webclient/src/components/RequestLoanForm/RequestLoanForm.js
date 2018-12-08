import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import apollo from '@/constructors/apollo'
import SettingsRow from '@/components/SettingsRow'

import './RequestLoanForm.sass'


const RequestLoanForm = ({ history }) => {
  return (
    <Mutation
      mutation={gql`
        mutation Logout {
          logout
        }
      `}
    >
      {(logout, { data, error }) => (
        <div className="RequestLoanForm">
          RequestLoanForm
        </div>
      )}
    </Mutation>
  )
}


export default RequestLoanForm
