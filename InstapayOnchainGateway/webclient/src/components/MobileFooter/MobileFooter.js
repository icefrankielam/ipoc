import React, { Component } from 'react'
import * as log from 'loglevel'
import cx from 'classnames'
import { withRouter } from 'react-router'
import { IoIosHome, IoIosPaper, IoIosMail, IoMdSettings } from 'react-icons/io'

import './MobileFooter.sass'


const FooterMenuButton = ({
  active = false,
  onClick = () => {},
  children = null,
}) => {
  return (
    <div
      className={cx({
        FooterMenuButton: true,
        active,
      })}
      onClick={onClick}
      children={children}
    />
  )
}

const MobileFooter = ({ history, match }) => {
  return (
    <footer className="MobileFooter">
      <FooterMenuButton
        active={history.location.pathname.startsWith('/home') || history.location.pathname === '/'}
        onClick={() => history.push('/')}
      >
        <IoIosHome />
      </FooterMenuButton>
      <FooterMenuButton active={history.location.pathname.startsWith('/policy')} onClick={() => history.push('/policy')}>
        <IoIosPaper />
      </FooterMenuButton>
      <FooterMenuButton active={history.location.pathname.startsWith('/messages')} onClick={() => history.push('/messages')}>
        <IoIosMail />
      </FooterMenuButton>
      <FooterMenuButton active={history.location.pathname.startsWith('/settings')} onClick={() => history.push('/settings')}>
        <IoMdSettings />
      </FooterMenuButton>
    </footer>
  )
}

export default withRouter(MobileFooter)
