import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hashHistory } from 'react-router'
import { Icon } from 'antd-mobile'

export default class CommonHeader extends Component {
  render() {
    const { left, title, onLeftClick, right, onRightClick } = this.props
    
    return (
      <header className="cm-common-header">
        <span
          className="-one cm-circle"
          onClick={
            () => {
              onLeftClick()
            }
          }
        >
          <Icon type={require('static/svg/icon-34.svg')}/>
        </span>
        <span
          className="-two"
        >
          {title}
        </span>
        <span
          className="-three"
          onClick={
            () => {
              onRightClick()
            }
          }
        >
          {right}
        </span>
      </header>
    )
  }
}

CommonHeader.defaultProps = {
  onLeftClick: () => {
    hashHistory.goBack()
  },
  left: <Icon type="left"/>
}

CommonHeader.propTypes = {
  title: PropTypes.node,
  right: PropTypes.node
}
