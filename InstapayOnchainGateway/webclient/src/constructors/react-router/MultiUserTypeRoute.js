import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import LoadingPage from '@/pages/LoadingPage'


const MultiUserTypeRoute = ({
  AuthEmployerComponent,
  AuthUserComponent,
  NoAuthComponent,
  NoAuthLayout,
  ...rest
}) => (
  <Route {...rest}
    render={props => {
      return (
        <Query query={gql`{ me { firstName, userType } }`}>
          {({ error, loading, data }) => {
            if (loading) return <LoadingPage />
            if (error || !data.me) {
              return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            switch (data.me.userType) {
              case 'EMPLOYER':
                return (
                  <AuthEmployerComponent {...props} {...rest} />
                )
              case 'USER':
                return (
                  <AuthUserComponent {...props} {...rest} />
                )
              default:
                // no-op
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
          }}
        </Query>
      )
    }}
  />
)

export default MultiUserTypeRoute
