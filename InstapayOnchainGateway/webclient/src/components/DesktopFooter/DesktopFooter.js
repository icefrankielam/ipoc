import React, { Component } from 'react'
import * as log from 'loglevel'
import cx from 'classnames'
import { withRouter } from 'react-router'

import './DesktopFooter.sass'


const DesktopFooter = ({ history, match }) => {
  return (
    <footer className="DesktopFooter">
      <a href="https://ropsten.etherscan.io/address/0x730666fd1409da3f6d51752c475fda0934e634e2" target="_blank">View InstaPayPool</a>
    </footer>
  )
}

export default withRouter(DesktopFooter)
