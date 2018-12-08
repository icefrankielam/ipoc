import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import LoadingPage from '@/pages/LoadingPage'


const PublicOnlyRoute = ({ component: Component, layoutComponent: LayoutComponent, ...rest }) => (
  <Route {...rest}
    render={props => {
      return (
        <LayoutComponent>
          <Query query={gql`{ me { firstName } }`}>
            {({ error, loading, data }) => {
              if (loading) return <LoadingPage />
              if (error || !data.me) return <Component {...props} {...rest} />
              return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }}
          </Query>
        </LayoutComponent>
      )
    }}
  />
)

export default PublicOnlyRoute
