import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage ,formatMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, InputItem, Button, Toast } from 'antd-mobile'

const messages = defineMessages({
    placeholderOne: {
      id: 'placeholder',
      defaultMessage: '请输入'
    },
    placeholderTwo: {
      id: 'yuan',
      defaultMessage:'元'
    }
});
class Deposit extends Component {
  state = {
    active : 0
  }
  onClick = () => {
    hashHistory.push('/account/depositresult')
  }
  render() {
    
    const { getFieldProps } = this.props.form
    const str = this.props.intl.formatMessage(messages.placeholderOne, {name: '充值金额（大于0.02）'})
    const yuan = this.props.intl.formatMessage(messages.placeholderTwo)
    return (
      <div className="rt-deposit-container">
        <h3><FormattedMessage id="paymethod"/></h3>
        <section className="rt-deposit-payment">
          <ul>
            <li className={`${this.state.active == 0 ? 'active -items -margin-right' : '-items -margin-right'}`}
            onClick = {
                  () => {
                    if(this.state.active ==0) {
                      return
                    }
                    this.setState({
                      active: 0
                    })
                  }
                }
              >
                <img src={require('static/images/wechat.png')}/>
                <Icon type="check"/>
            </li>
            <li className={`${this.state.active == 1 ? '-items active' : '-items'}`}
                onClick = {
                  () => {
                    if(this.state.active == 1 ) {
                      return
                    }
                    this.setState({
                      active:1
                    })
                  }
                }
              >
                <img src={require('static/images/union.png')}/>
                <Icon type="check"/>
            </li>
          </ul>
        </section>
        <InputItem
          {...getFieldProps('money')}
          onChange={this.onChange}
          placeholder={str}
          extra={yuan}
          type="text"
        />
        <Button
          className={`cm-main-button`}
          onClick ={this.onClick}
          
        >
          <FormattedMessage id="next"/>
        </Button>
        <div className="-describe">
          <p>
            <FormattedMessage id="describeone"/>
          </p>
          <p>
            <FormattedMessage id="describetwo"/>
          </p>
        </div>
      </div>
    )
  }
}


Deposit.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(Deposit))