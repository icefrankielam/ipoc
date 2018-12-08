import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Route,
} from 'react-router-dom'

import LoadingPage from '@/pages/LoadingPage'


const DualRoute = ({
  AuthComponent,
  AuthLayout,
  NoAuthComponent,
  NoAuthLayout,
  ...rest
}) => (
  <Route {...rest}
    render={props => {
      return (
        <Query query={gql`{ me { firstName } }`}>
          {({ error, loading, data }) => {
            if (loading) return <LoadingPage />
            if (error || !data.me) {
              return (
                <NoAuthLayout>
                  <NoAuthComponent {...props} {...rest} />
                </NoAuthLayout>
              )
            }
            return (
              <AuthLayout>
                <AuthComponent {...props} {...rest} />
              </AuthLayout>
            )
          }}
        </Query>
      )
    }}
  />
)

export default DualRoute
