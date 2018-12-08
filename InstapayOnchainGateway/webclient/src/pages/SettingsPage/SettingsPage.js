import React, { useState } from 'react'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import UserSettings from '@/components/UserSettings'

import './SettingsPage.sass'


const SettingsPage = ({}) => {
  return (
    <div className="SettingsPage">
      <h1>Settings</h1>
      <UserSettings />
    </div>
  )
}

export default SettingsPage
