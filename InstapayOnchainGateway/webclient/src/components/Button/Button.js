import React, { Component } from 'react'
import cx from 'classnames'

import './Button.sass'

const Button = ({children, onClick = () => {}, className}) => (
  <button onClick={onClick} className={cx({
    Button: true,
    [className]: Boolean(className),
  })}>
    {children}
  </button>
)

export default Button
