import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { messageString } from 'component/user'

class ChatInput extends Component {
  state = {
    focused: true
  }

  render() {
    // console.log(this.props)
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
          >{this.props.filled}</div>
          <div className="-center">{this.props.Chatcontent}</div>
          <div className="-right"
            onClick = {
              (e) => {
                e.preventDefault()
                this.props.onSendMessge(getFieldValue('message'))
              }
            }
          >{this.props.chatSend}</div>
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


