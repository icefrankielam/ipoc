import React, { Component } from 'react'
import * as log from 'loglevel'
import cx from 'classnames'
import { withRouter } from 'react-router'

import './DesktopFooter.sass'


const DesktopFooter = ({ history, match }) => {
  return (
    <footer className="DesktopFooter">
      <a href="https://ropsten.etherscan.io/address/0x730666Fd1409Da3F6d51752C475fDA0934E634E2" target="_blank">View InstaPayPool</a>
    </footer>
  )
}

export default withRouter(DesktopFooter)
