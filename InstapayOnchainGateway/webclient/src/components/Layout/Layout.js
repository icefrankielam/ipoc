import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import './Layout.sass'


class Layout extends Component {
  render() {
    return <div className={this.props.className || 'Layout'}>{this.props.children}</div>
  }  
}

class Private extends Component {
  render() {
    return (
      <Layout className="Private">
        <Header.Private />
        <div className="Main">
          {this.props.children}
        </div>
      </Layout>
    )
  }
}

class Public extends Component {
  render() {
    return (
      <Layout className="Public">
        <Header.Public />
        <div className="Main">
          {this.props.children}
        </div>
        <Footer />
      </Layout>
    )
  }
}


export default {
  Private,
  Public,
}
