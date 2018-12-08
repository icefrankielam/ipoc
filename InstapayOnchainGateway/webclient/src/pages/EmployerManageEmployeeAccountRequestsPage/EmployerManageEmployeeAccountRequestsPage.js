import React, { useState } from 'react'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import EmployerLinkAccountRequests from '@/components/EmployerLinkAccountRequests'

import './EmployerManageEmployeeAccountRequestsPage.sass'


const EmployerManageEmployeeAccountRequestsPage = ({}) => {
  return (
    <div className="EmployerManageEmployeeAccountRequestsPage">
      <h1>EmployerLinkAccountRequests</h1>
      <EmployerLinkAccountRequests />
    </div>
  )
}

export default EmployerManageEmployeeAccountRequestsPage
