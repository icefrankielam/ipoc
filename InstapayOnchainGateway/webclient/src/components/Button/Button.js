import React, { Component } from 'react'
import cx from 'classnames'

import './Button.sass'

const Button = ({children, onClick = () => {}, className, ...rest}) => (
  <button onClick={onClick} className={cx({
    Button: true,
    [className]: Boolean(className),
  })} {...rest}>
    {children}
  </button>
)

export default Button
