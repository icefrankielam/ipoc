import React from 'react'
import { withRouter } from 'react-router'

import './Logo.sass'


const Logo = ({ history }) => (
  <div className="Logo" onClick={() => history.push('/')}>
    InstapayOnchain
  </div>
)

export default withRouter(Logo)
