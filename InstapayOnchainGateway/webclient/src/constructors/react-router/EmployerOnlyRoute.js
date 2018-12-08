import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import LoadingPage from '@/pages/LoadingPage'


const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route {...rest}
    render={props => {
      return (
        <Query query={gql`{ me { firstName userType } }`}>
          {({ error, loading, data }) => {
            if (loading) return <LoadingPage />
            if (error || !data.me) {
              return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            if (data.me.userType !== 'EMPLOYER') {
              return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
            return <Component {...props} {...rest} />
          }}
        </Query>
      )
    }}
  />
)

export default PrivateRoute
