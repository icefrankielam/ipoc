import React, { Component } from 'react'
import cx from 'classnames'

import './Row.sass'

const Row = ({
  onClick = () => ({}),
  children,
}) => {
  return (
    <div className="Row" onClick={onClick}>
      {children}
    </div>
  )
}

export default Row
