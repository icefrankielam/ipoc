import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import PaycheckInfo from '@/components/PaycheckInfo'
import RequestInstapayForm from '@/components/RequestInstapayForm'
import RequestLoanForm from '@/components/RequestLoanForm'


import './DashboardPage.sass'


const DashboardPage = ({ history }) => {
  document.title = 'InstapayOnchain - DashboardPage'
  return (
    <div className="DashboardPage">
      <h1>Dashboard</h1>
      <PaycheckInfo />
      <RequestInstapayForm />
      <RequestLoanForm />
    </div>
  )
}

export default withRouter(DashboardPage)