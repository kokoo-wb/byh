import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { FormattedMessage, intlShape, injectIntl,formatMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Button, InputItem, Toast } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { TimerButton } from 'component/user'
import { messages } from 'component/trade'
import 'whatwg-fetch'

class ModifyPassword extends Component {
  onOpenClick = () => {
    const { getFieldValue } = this.props.form
    const formatMessage = this.props.intl.formatMessage
    //let accountid = getFieldValue('accountId')
    let oldpass = getFieldValue('oldpassword')
    let pass = getFieldValue('password')
    let againpass = getFieldValue('againpassword')
    let len = pass.length
    const regUpper = /[A-Z]/;
    const regLower = /[a-z]/;
    const regStr = /[0-9]/;
    let complex = 0
    if (!oldpass || oldpass.trim() == '') {
      Toast.fail(formatMessage(messages.inputoldpass), 1.2)
      return
    }
    if (!pass || pass.trim() == '') {
      Toast.fail(formatMessage(messages.inputnewpass), 1.2)
      return
    }
    if (!againpass || againpass.trim() == '') {
      Toast.fail(formatMessage(messages.inputagainpass), 1.2)
      return
    }
    if (pass != againpass) {
      Toast.fail(formatMessage(messages.NotSameInputPassword), 1.2)
      return
    }
    if (regLower.test(pass)) {
        ++complex;
    }
    if (regUpper.test(pass)) {
        ++complex;
    }
    if (regStr.test(pass)) {
        ++complex;
    }
    if (len > 32 || len < 8) {
      Toast.fail(formatMessage(messages.PasswordLengthNeeds), 1.2)
      return
    }
    if (complex < 3 ) {
      Toast.fail(formatMessage(messages.PasswordNeedsNumberAnd), 1.2)
      return
    }
    Toast.loading(formatMessage(messages.submitting), 10, () => {
      Toast.fail(formatMessage(messages.submitFaild))
    })
    let options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: {
        session_id: localStorage.token,
        account_id: localStorage.uid,
        account_pass: oldpass,
        new_pass: pass
       }
    }
    if ( options && options.body) {
      const arr = Object.entries(options.body)
      let text = ''
      let result = ''
      arr.forEach((val) => {
        text += val.join("=")+'&'
      })
      result = text.slice(0,-1)
      options.body = encodeURI(result)
    }
   fetch('https://news.byfx.r0.vc/demo/password/save', options)
    .then((rs) => {
     return rs.json()
    }).then((rs) => {
      Toast.hide()
      //console.log(rs, 'rs')
      if (rs && rs.error == 0) {
        Toast.success(formatMessage(messages.ChangePasswordSuccessing), 1.2, () => {
          if (localStorage.remember == 2 && localStorage.password) {
            localStorage.setItem('password', pass)
          }
          hashHistory.push('/trade')
        })
      } else {
        Toast.fail(formatMessage(messages.ChangePasswordFailling), 1.2)
      }
    })
  }
  render() {
    const { getFieldProps, getFieldValue } = this.props.form
    let first = this.props.location.query ? this.props.location.query.name : ''
    const inputnewpass = this.props.intl.formatMessage(messages.inputnewpass)
    const inputagainpass = this.props.intl.formatMessage(messages.inputagainpass)
    const inputoldpass = this.props.intl.formatMessage(messages.inputoldpass)
    const inputaccount = this.props.intl.formatMessage(messages.inputaccount)
    return (
      <div className="rt-reallogin-page rt-newuser-register">
        <CommonHeader
          title={<FormattedMessage id="modifyPassword"/>}
        />
        <div className="body">
          <InputItem
            type="password"
            {...getFieldProps('oldpassword', {
              initialValue: '',
            })}
            placeholder={inputoldpass}
            clear
          />
          <InputItem
            type="password"
            {...getFieldProps('password', {
              initialValue: '',
            })}
            placeholder={inputnewpass}
            clear
          />
          <InputItem
            type="password"
            {...getFieldProps('againpassword', {
              initialValue: '',
            })}
            placeholder={inputagainpass}
            clear
          />
          
          <div className="-open-btn">
            <Button
              className={`cm-main-button`}
              onClick={this.onOpenClick}
            >
              <FormattedMessage id="confirm" />
            </Button>
          </div>
          <p className="rt-cancel">
            {
              first ? null : 
              <span
                onClick={
                  () => {
                    hashHistory.push('/account/condition')
                  }
                }
              >
                <FormattedMessage
                   id="cancel"
                />
              </span>
            }
              
           </p>
        </div>
      </div>
      )
  }
}

ModifyPassword.propType = {
  intl: intlShape.isRequired
}

export default injectIntl(createForm()(ModifyPassword))
