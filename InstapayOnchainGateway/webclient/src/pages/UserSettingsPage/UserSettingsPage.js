import React, { useState } from 'react'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import UserSettings from '@/components/UserSettings'

import './UserSettingsPage.sass'


const UserSettingsPage = ({}) => {
  document.title = 'InstapayOnchain - Settings'
  return (
    <div className="UserSettingsPage">
      <h1>Settings</h1>
      <UserSettings />
    </div>
  )
}

export default UserSettingsPage
