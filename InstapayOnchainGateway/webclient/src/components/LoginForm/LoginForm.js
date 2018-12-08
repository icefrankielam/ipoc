import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import axios from '@/constructors/axios'
import localStorage from '@/constructors/localStorage'

import Button from '@/components/Button'

import './LoginForm.sass'


const LoginForm = props => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const { history } = props
  return (
    <Mutation
      mutation={gql`
        mutation Login(
          $identifier: String!
          $password: String!
        ) {
          login(
            identifier: $identifier,
            password: $password
          ) {
            user { firstName }
            tokenData { accessToken }
          }
        }
      `}
      refetchQueries={({ data }) => {
        const { accessToken, tokenType } = data.login.tokenData
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['authorization'] = `${tokenType} ${accessToken}`
        return [{
          query: gql`{
            me { firstName userType }
          }`,
          variables: {
            token: data.login.tokenData.accessToken,
          },
        }]
      }}
      awaitRefetchQueries
    >
      {(login, { data, error }) => (
        <div>
          <input
            type="text"
            onChange={e => setIdentifier(e.target.value)}
            value={identifier}
            placeholder={'Email or Phone'}
          />
          <br />
          <input
            type={'password'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder={'Password'}
          />
          <br />
          <Button
            children={'Log In'}
            onClick={async () => {
              const { data } = await login({
                variables: {
                  identifier,
                  password,
                },
              })
              history.replace('/')
            }}
          />
          <br />
          <Link to="/register">Need to Register?</Link>
        </div>
      )}
    </Mutation>
  )
}

export default withRouter(LoginForm)
