import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Button } from 'antd-mobile'



export default class ChoseButton extends Component {
  render() {
    const { onResetClick, onConfirmClick, leftNode, rightNode } = this.props
    return (
      <div className="rt-chosebutton">
        <Button
          className="btn btn-one"
          type="primary"
          onClick={
            () => {
              onResetClick()
            }
          }
        >
        {
          leftNode ? leftNode : (
              <FormattedMessage
                id='cancel'
              />
            )
        }
          
        </Button>
        <span></span>
        <Button
          className="btn btn-two"
          type="primary"
          onClick={
            () => {
              onConfirmClick()
            }
          }
        >
          {
            rightNode ? rightNode : (
                <FormattedMessage
                  id='pendingconfirmation'
                />
              )
          }
        </Button>
      </div>

    )
  }
}

ChoseButton.propTypes = {
  onResetClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  leftNode: PropTypes.node,
  rightNode: PropTypes.node
}
