import React, { useState } from 'react'
import * as log from 'loglevel'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, withRouter } from 'react-router-dom'

import './UserProfilePage.sass'

import Row from '@/components/Row'


const UserProfilePage = ({ data }) => {
  document.title = 'InstapayOnchain - My Profile'

  if (data.loading) return '...loading'
  if (data.error) return 'error'

  const {
    me,
    myEmployer,
  } = data

  return (
    <div className="UserProfilePage">
      <h1>UserProfilePage</h1>
      <Row>{me.firstName} {me.lastName}</Row>
      <Row>{me.email}</Row>
      {myEmployer ? <Row>
        <h3>My Employer</h3>
        <Row>{myEmployer.name}</Row>
        <Row>{myEmployer.employerCode}</Row>
      </Row> : null}
    </div>
  )
}

export default compose(
  graphql(gql`{
    me { firstName lastName email }
    myEmployer { name employerCode }
  }`)
)(UserProfilePage)
