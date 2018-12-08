import React, { Component } from 'react'
import cx from 'classnames'

import './SettingsRow.sass'


const SettingsRow = ({
  onClick = () => ({}),
  children,
}) => {
  return (
    <div className="SettingsRow" onClick={onClick}>
      {children}
    </div>
  )
}

export default SettingsRow
