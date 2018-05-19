import React from 'react'
import PropTypes from 'prop-types'
import './style.less'

const CenterRightHeader = function(props) {
  return (
    <header className="cm-centerRight-header">
      <span></span>
      <span
        className="-center"
      >
        {props.title}
      </span>
      <span
        className="-right"
        onClick={
          () => {
            props.onRightClick()
          }
        }
      >
        {
          props.right
        }
      </span>
    </header>
  )
}

CenterRightHeader.propTypes = {
  title: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  onRightClick: PropTypes.func
}

export default CenterRightHeader
