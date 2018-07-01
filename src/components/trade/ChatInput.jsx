import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'

class ChatInput extends Component {
  state = {
    focused: true
  }

  render() {
    const { getFieldValue, getFieldProps } = this.props.form
    return (
      <div className="-say-box">
        <div className="-say-top">
          <div className="-left"
            onClick = {
              (e) => {
                e.preventDefault()
                this.props.onClose()
              }
            }
          >取消</div>
          <div className="-center">聊天内容</div>
          <div className="-right"
            onClick = {
              (e) => {
                e.preventDefault()
                this.props.onSendMessge(getFieldValue('message'))
              }
            }
          >发送</div>
        </div>
        <div className="-say-content">
          <TextareaItem
            autoFocus
            autoHeight
            focused={this.state.focused}
            onBlur={
              () => {
                this.setState({
                  focused: false,
                })
              }
            }
            {...getFieldProps('message')}
          />
        </div>
      </div>
    )
  }
}

export default createForm()(ChatInput)