import React, { Component } from 'react'
import * as log from 'loglevel'
import cx from 'classnames'
import { withRouter } from 'react-router'

import './DesktopFooter.sass'


const DesktopFooter = ({ history, match }) => {
  return (
    <footer className="DesktopFooter">
      <a href="https://ropsten.etherscan.io/address/0x74506c5651b4e496b369fa4ebdd9422629a0d838" target="_blank">View InstaPayPool</a>
    </footer>
  )
}

export default withRouter(DesktopFooter)
