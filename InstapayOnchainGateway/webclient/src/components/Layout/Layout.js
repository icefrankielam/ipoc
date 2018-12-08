import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MobileHeader from '@/components/MobileHeader'
import MobileFooter from '@/components/MobileFooter'
import DesktopHeader from '@/components/DesktopHeader'
import DesktopFooter from '@/components/DesktopFooter'

import './Layout.sass'


class Layout extends Component {
  render() {
    return <div className={this.props.className || 'Layout'}>{this.props.children}</div>
  }  
}

class MobilePrivate extends Component {
  render() {
    return (
      <Layout className="MobilePrivate">
        <MobileHeader.Private />
        <div className="Main">
          {this.props.children}
        </div>
        <MobileFooter />
      </Layout>
    )
  }
}

class MobilePublic extends Component {
  render() {
    return (
      <Layout className="MobilePublic">
        <MobileHeader.Public />
        <div className="Main">
          {this.props.children}
        </div>
      </Layout>
    )
  }
}

class DesktopPrivate extends Component {
  render() {
    return (
      <Layout className="DesktopPrivate">
        <DesktopHeader.Private />
        <div className="Main">
          {this.props.children}
        </div>
      </Layout>
    )
  }
}

class DesktopPublic extends Component {
  render() {
    return (
      <Layout className="DesktopPublic">
        <DesktopHeader.Public />
        <div className="Main">
          {this.props.children}
        </div>
        <DesktopFooter />
      </Layout>
    )
  }
}


export default {
  Mobile: {
    Private: MobilePrivate,
    Public: MobilePublic,
  },
  Desktop: {
    Private: DesktopPrivate,
    Public: DesktopPublic,
  },
}
