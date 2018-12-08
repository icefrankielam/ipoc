import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'

import axios from '@/constructors/axios'
import CompanyRegisterForm from '@/components/CompanyRegisterForm'


import './CompanyRegisterPage.sass'

class CompanyRegisterPage extends Component {
  render() {
    const { history } = this.props
    
    document.title = 'InstapayOnchain - CompanyRegisterPage'
    console.log('this.props', this.props)
    return (
      <Query query={gql`{ users { firstName } }`}>
        {({ error, loading, data }) => {
        // if (error) return 'error'
          if (loading) return 'loading...'
          return (
            <div className="CompanyRegisterPage">
              <h1 className="title">CompanyRegisterPage</h1>
              <CompanyRegisterForm />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(CompanyRegisterPage)