import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage ,formatMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { InputItem, Button, Picker, List, Toast } from 'antd-mobile'

const messages = defineMessages({
    placeholderOne: {
      id: 'placeholder',
      defaultMessage: '请输入'
    },
    placeholderTwo: {
      id: 'extra',
      defaultMessage:'请选择银行卡'
    },
    placeholderThree: {
      id: 'yuan',
      defaultMessage:'元'
    }
});


class WithDraw extends Component {
  state = {
    banks: []
  }
  render() {
    const { getFieldProps } = this.props.form
    const str = this.props.intl.formatMessage(messages.placeholderOne, {name: '提现金额'})
    const choseBank = this.props.intl.formatMessage(messages.placeholderTwo)
    const yuan = this.props.intl.formatMessage(messages.placeholderThree)
    const passWord = this.props.intl.formatMessage(messages.placeholderOne, {name: '交易密码'})
    const { banks } = this.state
    return (
      <div className="rt-withdraw-container">
        <h3><FormattedMessage id="cashAvailable"/><span>3,686.90元</span></h3>
        <InputItem
          {...getFieldProps('money')}
          placeholder={str}
          extra={yuan}
        />
        <Picker
          {...getFieldProps('bank')}
          data={banks}
          cols={1}
          extra={choseBank}
        >
          <List.Item arrow="down" className="cm-picker-item -bgColor"/>
        </Picker>
        <InputItem
          {...getFieldProps('password')}
          className="-bgColor"
          type="password"
          placeholder={passWord}
          extra={yuan}
        />
        <Button
          className="cm-main-button"
          onClick={
            () => {
              hashHistory.push('/account/bankcard')
            }
          }
        >
          <FormattedMessage id="submit"/>
        </Button>
        <div className="-withdraw-describe">
          <p>
            <FormattedMessage id="describethree"/>
          </p>
        </div>
      </div>
    )
  }
}
WithDraw.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(WithDraw))