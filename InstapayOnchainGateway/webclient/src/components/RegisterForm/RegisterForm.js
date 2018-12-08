import React, { useState } from 'react'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import axios from '@/constructors/axios'

import Button from '@/components/Button'

import './RegisterForm.sass'


const RegisterForm = ({ history }) => {
  const [userType, setUserType] = useState('USER')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [wallet, setWallet] = useState('')
  const [employerId, setEmployerId] = useState('')
  const [employerName, setEmployerName] = useState('')

  return (
    <Mutation
      mutation={gql`
        mutation Register(
          $email: String
          $firstName: String,
          $lastName: String,
          $phone: String,
          $wallet: String,
          $password: String,
          $userType: String,
          $employerId: Int,
          $employerName: String,
        ) {
          register(
            email: $email,
            firstName: $firstName,
            lastName: $lastName,
            password: $password,
            phone: $phone,
            wallet: $wallet,
            userType: $userType,
            employerId: $employerId,
            employerName: $employerName,
          ) {
            user { firstName }
            tokenData { accessToken }
          }
        }
      `}
      refetchQueries={({ data }) => {
        const { accessToken, tokenType } = data.register.tokenData
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['authorization'] = `${tokenType} ${accessToken}`
        return [{
          query: gql`{
            me { firstName, userType }
          }`,
          variables: {
            token: data.register.tokenData.accessToken,
          },
        }]
      }}
      awaitRefetchQueries
    >
      {(register, { data, error, loading }) => {
        return (
          <div>
            Register as an employer:
            <input
              type="checkbox"
              checked={userType === 'EMPLOYER'}
              onChange={e => setUserType(userType === 'USER' ? 'EMPLOYER' : 'USER' )}
            /> <br />

            <input
              type="text"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              placeholder={'First Name'}
            />
            <br />

            <input
              type="text"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              placeholder={'Last Name'}
            />
            <br />

            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder={'Email'}
            />
            <br />

            <input
              type="phone"
              onChange={e => setPhone(e.target.value)}
              value={phone}
              placeholder={'Phone'}
            />
            <br />

            <input
              type="text"
              onChange={e => setWallet(e.target.value)}
              value={wallet}
              placeholder={'Wallet Address'}
            />
            <br />

            <input
              type={'password'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder={'Password'}
            />
            <br />

            {userType === 'USER' ? (
              <>
                Employer ID:
                <input
                  type="text"
                  value={employerId}
                  onChange={e => setEmployerId(e.target.value)}
                />
                <br />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={employerName}
                  onChange={e => setEmployerName(e.target.value)}
                  placeholder="InstapayOnchain, Inc."
                />
                <br />
              </>
            )}

            By creating an account, you accept InstapayOnchain's Terms of Service and Privacy Policy.
            <br />
            <Button
              children={'Register Now'}
              onClick={async () => {
                const { data } = await register({
                  variables: {
                    email,
                    firstName,
                    lastName,
                    phone,
                    wallet,
                    password,
                    userType,
                    employerId: parseInt(employerId, 10),
                    employerName,
                  },
                })
                history.replace('/')
              }}
            />
            <br />

            <Link to="/login">Need to Login?</Link>
          </div>
        )
      }}
    </Mutation>
  )
}

export default withRouter(RegisterForm)
