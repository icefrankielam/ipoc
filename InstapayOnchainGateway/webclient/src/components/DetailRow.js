import React from 'react'
import cx from 'classnames'

const DetailRow = ({ value, label, children, className }) => (
  <div className={cx({ DetailRow: true, [className]: Boolean(className)})}>
    <div className="DetailRowLabel">
      {label}
    </div>
    {value ? <div className="DetailRowValue">{value}</div> : null}
    {children}
  </div>
)

export default DetailRow
