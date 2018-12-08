import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

import apollo from '@/constructors/apollo'
import Button from '@/components/Button'

import './SandboxPage.sass'

const SandboxPage = props => {
  return (
    <div>
      <h1>SandboxPage</h1>

      <Mutation
        mutation={gql`
          mutation CreateInstapay {
            createInstapay {
              status
              transactionHash
            }
          }
        `}
      >
        {(createInstapay, { error, data, loading }) => {
          if (error) console.error(error)
          if (loading) return '...loading...'
          return (
            <div>
              <Button onClick={() => createInstapay()}>Create Instapay</Button>
              <pre>{JSON.stringify(data)}</pre>
            </div>
          )
        }}
      </Mutation>
    </div>
  )
}

export default SandboxPage
