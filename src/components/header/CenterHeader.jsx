import React from 'react'
import PropTypes from 'prop-types'
import './style.less'

const CenterHeader = function(props) {
  return (
    <header className="cm-center-header">
      <span>{props.title}</span>
    </header>
  )
}

CenterHeader.propTypes = {
  title: PropTypes.node.isRequired
}

export default CenterHeader
