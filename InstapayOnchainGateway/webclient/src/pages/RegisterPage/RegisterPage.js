import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import RegisterForm from '@/components/RegisterForm'


class RegisterPage extends Component {
  render() {
    const { history } = this.props
    document.title = 'InstapayOnchain - Register'

    return (
      <div>
        <RegisterForm />
      </div>
    )
  }
}

export default withRouter(RegisterPage)
