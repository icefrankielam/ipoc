/*
 * Client (Web) - Entrypoint, Bootstrap
**/


import 'normalize.css'

import React from 'react'
import * as log from 'loglevel'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import '@/style.sass'

import createReduxStore from '@/constructors/redux/store'
import loglevel from '@/constructors/loglevel'
import sw from '@/constructors/sw'
import web3 from '@/constructors/web3'
import apollo from '@/constructors/apollo'
import ReactRouter from '@/constructors/react-router'


log.info(`Bootstrapping Client (Web) ... (${Date.now()})`)

loglevel()


const App = () => {
  return (
    <ApolloProvider client={apollo}>
      <Provider store={createReduxStore()}>
        <ReactRouter />
      </Provider>
    </ApolloProvider>
  )
}

export const run = () => render(<App />, document.getElementById('app'))
