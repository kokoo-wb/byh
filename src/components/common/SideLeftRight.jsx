import React from 'react'
import PropTypes from 'prop-types'
import './side.less'

const SideLeftRight = (props) => {
  //console.log(props, 'props')
  return (
    <div className={`rt-side-leftRight ${props.className ? props.className : ''}`}>
      {props.left ? props.left : <span></span>}
      <span
        onClick={
          props.onClick
        }
      >
        {props.right}
      </span>
    </div>
  )
}

SideLeftRight.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default SideLeftRight
