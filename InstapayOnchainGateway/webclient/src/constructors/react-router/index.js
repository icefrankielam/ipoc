import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import history from '@/constructors/history'

import HomePage from '@/pages/HomePage'
import DashboardPage from '@/pages/DashboardPage'
import RegisterPage from '@/pages/RegisterPage'
import LoginPage from '@/pages/LoginPage'
// import MessagesPage from '@/pages/MessagesPage'
import SandboxPage from '@/pages/SandboxPage'
import UserSettingsPage from '@/pages/UserSettingsPage'
import InvestPage from '@/pages/InvestPage'
import UserProfilePage from '@/pages/UserProfilePage'
import EmployerSettingsPage from '@/pages/EmployerSettingsPage'
import EmployerProfilePage from '@/pages/EmployerProfilePage'
// import EmployerManageEmployeeAccountsPage from '@/pages/EmployerManageEmployeeAccountsPage'
import EmployerManageEmployeeAccountRequestsPage from '@/pages/EmployerManageEmployeeAccountRequestsPage'
import EmployerBalancesPage from '@/pages/EmployerBalancesPage'

import Layout from '@/components/Layout'
import ResizeListener from '@/components/ResizeListener'

import DualRoute from './DualRoute'
import PublicRoute from './PublicRoute'
import PublicOnlyRoute from './PublicOnlyRoute'
import PrivateRoute from './PrivateRoute'
import MultiUserTypeRoute from './MultiUserTypeRoute'
import EmployerOnlyRoute from './EmployerOnlyRoute'


const ReactRouter = ({ layout }) => {
  history.listen((location, action) => {
    return true
  })

  return (
    <>
      <Router history={history}>
        <Switch>
          <PublicOnlyRoute key={1} exact path="/login" layoutComponent={Layout.Desktop.Public} component={LoginPage} />
          <PublicOnlyRoute key={2} exact path="/register" layoutComponent={Layout.Desktop.Public} component={RegisterPage} />
          <PublicRoute key={3} exact path="/sandbox" layoutComponent={Layout.Desktop.Public} component={SandboxPage} />
          <PublicRoute key={3} exact path="/invest" layoutComponent={Layout.Desktop.Public} component={InvestPage} />
          <DualRoute
            key={4}
            exact
            path="/"
            AuthComponent={DashboardPage}
            NoAuthComponent={HomePage}
            AuthLayout={Layout.Desktop.Private}
            NoAuthLayout={Layout.Desktop.Public}
          />
          <Layout.Desktop.Private key={5}>
            {/*<PrivateRoute exact path="/messages" component={MessagesPage} />*/}
            <PrivateRoute exact path="/settings/user/profile" component={UserProfilePage} />
            <MultiUserTypeRoute exact path="/settings" AuthEmployerComponent={EmployerSettingsPage} AuthUserComponent={UserSettingsPage} />
            <EmployerOnlyRoute exact path="/settings/employer/profile" component={EmployerProfilePage} />
            {/*<EmployerOnlyRoute exact path="/employees/update" component={EmployerManageEmployeeAccountsPage} />*/}
            <EmployerOnlyRoute exact path="/employees/requests" component={EmployerManageEmployeeAccountRequestsPage} />
            <EmployerOnlyRoute exact path="/balances" component={EmployerBalancesPage} />
          </Layout.Desktop.Private>
        </Switch>
      </Router>
      <ResizeListener />
    </>
  )
}


export default connect(state => ({
  layout: state.layout,
}))(ReactRouter)
