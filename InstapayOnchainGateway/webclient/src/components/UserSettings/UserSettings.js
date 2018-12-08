import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import apollo from '@/constructors/apollo'
import SettingsRow from '@/components/SettingsRow'

import './UserSettings.sass'


const UserSettings = ({ history }) => {
  return (
    <Mutation
      mutation={gql`
        mutation Logout {
          logout
        }
      `}
    >
      {(logout, { data, error }) => (
        <div className="UserSettings">
          <SettingsRow onClick={() => history.push('/settings/user/profile')}>My Profile</SettingsRow>
          <SettingsRow onClick={async () => {
            await logout()
            localStorage.removeItem('accessToken')
            await apollo.clearStore()
            history.replace('/login')
          }}>Log Out</SettingsRow> 
        </div>
      )}
    </Mutation>
  )
}


export default withRouter(UserSettings)
