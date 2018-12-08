import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'


import './HomePage.sass'


const HomePage = ({ history }) => {
  document.title = 'InstapayOnchain - HomePage'
  return (
    <div className="HomePage">
      <h1>Home (Public)</h1>
    </div>
  )
}

export default withRouter(HomePage)