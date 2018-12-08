import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Logo from '@/components/Logo'

import './DesktopHeader.sass'


class PublicDesktopHeader extends Component {
  render() {
    return (
      <header className="DesktopHeader">
        <Logo />
        <ul className="DesktopHeaderRoutes">
          <li className="DesktopHeaderRoute"><Link to={'/login'}>Login</Link></li>
          <li className="DesktopHeaderRoute"><Link to={'/register'}>Register</Link></li>
        </ul>
      </header>
    )
  }
}

@graphql(gql`{ me { userType } }`)
class PrivateDesktopHeader extends Component {
  render() {
    const { loading, error, data } = this.props
    if (loading) {
      return '... loading'
    }

    if (error) {
      console.error(error)
      return null
    }

    if (!data.me) return null

    const { userType } = data.me

    const userRoutes = () => (
      <ul className="DesktopHeaderRoutes">
        <li className="DesktopHeaderRoute"><Link to={'/'}>Dashboard</Link></li>
        <li className="DesktopHeaderRoute"><Link to={'/settings'}>Settings</Link></li>
      </ul>
    )
    const employerRoutes = () => (
      <ul className="DesktopHeaderRoutes">
        <li className="DesktopHeaderRoute"><Link to={'/'}>Dashboard</Link></li>
        <li className="DesktopHeaderRoute"><Link to={'/employees/requests'}>Manage Employee Requests</Link></li>
        <li className="DesktopHeaderRoute"><Link to={'/balances'}>Balances</Link></li>
        <li className="DesktopHeaderRoute"><Link to={'/settings'}>Settings</Link></li>
      </ul>
    )

    return (
      <header className="DesktopHeader">
        <Logo />
        {userType === 'USER' ? userRoutes() : employerRoutes()}
      </header>
    )
  }
}

export default {
  Public: PublicDesktopHeader,
  Private: PrivateDesktopHeader,
}
