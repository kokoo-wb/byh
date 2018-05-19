import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { hashHistory } from 'react-router'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage ,formatMessage } from 'react-intl'
import { InputItem, List, Button, Picker, Toast } from 'antd-mobile'

const banks =[
    {
      label: '中国银行',
      value: '中国银行',
    },
    {
      label: '中国建设银行',
      value: '中国建设银行',
    },
    {
      label: '中国农业银行',
      value: '中国农业银行',
    },
  ]
const messages = defineMessages({
    placeholderOne: {
      id: 'placeholderTwo',
      defaultMessage: '请输入'
    },
    placeholderTwo: {
      id: 'ex',
      defaultMessage:'选择银行'
    }
});
class BankCardList extends Component {
  state = {
    visible: false,
  }
 
  render() {
    const { form: {getFieldProps} } = this.props
    const str1 = this.props.intl.formatMessage(messages.placeholderOne, {name: '借记卡卡号'})
    const str2 = this.props.intl.formatMessage(messages.placeholderOne, {name: '持卡人姓名'})
    const str3 = this.props.intl.formatMessage(messages.placeholderOne, {name: '手机号码'})
    const str4 = this.props.intl.formatMessage(messages.placeholderOne, {name: '收到的验证码'})
    const choseBank = this.props.intl.formatMessage(messages.placeholderTwo)
    const { visible } = this.state
    return (
      <div className="rt-bankcard-list">
        <Picker
          data={banks}
          extra={choseBank}
          cols={1}
          {...getFieldProps('bank')}
        >
          <List.Item arrow="down" className="cm-picker-item"/>
        </Picker>
        <InputItem
          {...getFieldProps('cardNumber', {
            initialValue: '',
          })}
          type="bankCard"
          placeholder={str1}
          clear
        />
        <InputItem
          {...getFieldProps('accountName', {
            initialValue: '',
          })}
          placeholder={str2}
          clear
        />
        <InputItem
            {...getFieldProps('mobile', {
              initialValue: '',
            })}
            type="phone"
            placeholder={str3}
            clear
          />
          <div className="click-get">
            <InputItem
              className="cm-verify-input-width"
              placeholder={str4}
              {...getFieldProps('verify', {
                initialValue: '',
              })}
              clear
              type="number"
              maxLength={6}
            />
            <Button className={`cm-main-button -get`} onClick={(e)=>this.doBind()}>
              <FormattedMessage id="getValidationCode"/>
            </Button>
          </div>
        
       <div className="add-button">
         <Button className={`cm-main-button`} onClick={(e)=>this.doBind()}>
           <FormattedMessage id="add"/>
         </Button>
       </div>
        
      </div>
    )
  }
}

BankCardList.propTypes = {
  onChange: PropTypes.func
}
BankCardList.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(BankCardList))