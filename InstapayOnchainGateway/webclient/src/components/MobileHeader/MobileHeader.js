import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as log from 'loglevel'
import { Link } from 'react-router-dom'

import Logo from '@/components/Logo'

import './MobileHeader.sass'


class PublicMobileHeader extends Component {
  render() {
    return (
      <header className="MobileHeader">
        <Logo />
      </header>
    )
  }
}


class PrivateMobileHeader extends Component {
  render() {
    return (
      <header className="MobileHeader">
        <Logo />
      </header>
    )
  }
}

export default {
  Public: PublicMobileHeader,
  Private: PrivateMobileHeader,
}
