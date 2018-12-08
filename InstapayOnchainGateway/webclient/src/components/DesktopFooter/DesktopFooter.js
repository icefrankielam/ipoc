import React, { Component } from 'react'
import * as log from 'loglevel'
import cx from 'classnames'
import { withRouter } from 'react-router'

import './DesktopFooter.sass'


const DesktopFooter = ({ history, match }) => {
  return (
    <footer className="DesktopFooter">
      DesktopFooter
    </footer>
  )
}

export default withRouter(DesktopFooter)
