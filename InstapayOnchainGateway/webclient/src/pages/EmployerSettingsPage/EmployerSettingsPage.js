import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import apollo from '@/constructors/apollo'

import Button from '@/components/Button'
import EmployerSettings from '@/components/EmployerSettings'
import UserSettings from '@/components/UserSettings'

import './EmployerSettingsPage.sass'


const EmployerSettingsPage = ({ history }) => {
  return (
    <div className="EmployerSettingsPage">
      <h1>EmployerSettingsPage</h1>
      <h2>User Settings</h2>
      <UserSettings />
      <h2>Employer Settings</h2>
      <EmployerSettings />
    </div>
  )
}

export default EmployerSettingsPage
