import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import apollo from '@/constructors/apollo'
import Button from '@/components/Button'
import SettingsRow from '@/components/SettingsRow'

import './EmployerSettings.sass'


const EmployerSettings = ({ history }) => {
  return (
    <div className="EmployerSettings">
      <SettingsRow onClick={() => history.push('/settings/employer/profile')}>Employer Profile</SettingsRow>
    </div>
  )
}


export default withRouter(EmployerSettings)
