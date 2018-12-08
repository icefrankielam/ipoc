import React from 'react'
import { withRouter } from 'react-router'

import './Logo.sass'


const Logo = ({ history }) => (
  <div className="Logo" onClick={() => history.push('/')}>
    <img src="/static/logo.png" />
  </div>
)

export default withRouter(Logo)
