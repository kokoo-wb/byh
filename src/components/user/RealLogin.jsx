import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button, InputItem, Toast, Switch } from 'antd-mobile'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { config, helper, myFetch } from '../utils'
import { messageString } from './'


class RealLogin extends Component {
  constructor(props) {
    super(props)
    // const defaultMobile = props.location.query.demoMobile
    // const defaultPass = props.location.query.demoPass
    // const choseDemo = props.location.query.demo
    // console.log(defaultMobile,defaultPass,choseDemo)
  }
  login = () => {
    const { getFieldValue } = this.props.form
    let remember = getFieldValue('Switch2')
    let inputmobile = this.props.intl.formatMessage(messageString.placeholderOne)
    let AccountLength = this.props.intl.formatMessage(messageString.AccountLength)
    let AccountPass = this.props.intl.formatMessage(messageString.AccountPass)
    let PassLength = this.props.intl.formatMessage(messageString.PassLength)
    let NotDemo = this.props.intl.formatMessage(messageString.NotDemo)
    let loading = this.props.intl.formatMessage(messageString.loading)
    let loginFailed = this.props.intl.formatMessage(messageString.loginFailed)
    let loginSuccess = this.props.intl.formatMessage(messageString.loginSuccess)

    let mobile = getFieldValue('mobile')
    let password = getFieldValue('password')
    mobile = mobile.replace(/(^\s*)|(\s*$)/g,'')
    password = password.replace(/(^\s*)|(\s*$)/g,'')

    if (!mobile) {
      Toast.fail(inputmobile, 1.2)
      return
    }
    if (mobile.length < 7 || mobile.length > 10) {
      Toast.fail(AccountLength, 1.2)
      return
    }
    if (!password) {
      Toast.fail(AccountPass, 1.2)
      return
    }
    if (password.length > 32) {
      Toast.fail(PassLength, 1.2)
      return
    }
    const reg = /^F8/
    if (reg.test(mobile)) {
      Toast.fail(NotDemo, 1.2, () => {
        hashHistory.push('/')
      })
      return
    }
    Toast.loading(loading, 10, () => {
      Toast.fail(loginFailed)
    })
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ID: mobile,
        PASS: password
      })
    }
    myFetch(`${config.rootApi}/mLogin`, options)
    .then((rs) => {
      if (rs) {
        //console.log(rs)
        if (remember == true) {
          localStorage.setItem('remember', 1)
          localStorage.setItem('mobile', mobile)
          localStorage.setItem('password', password)
        }
        localStorage.removeItem('live')
        localStorage.setItem('token', rs.sessionId)
        sessionStorage.setItem('notice', true)
        localStorage.setItem('uid', mobile)
        //this.onRatelist()
        this.onInit()
        Toast.hide()

        Toast.success(loginSuccess, 1.2, () => {
          hashHistory.push('/trade')
        })
      }
    })
  }
  onInit = () => {
    const options = {
      method: 'POST'
    }
    myFetch(`${config.rootApi}/mInit`, options, true)
    .then((rs) => {
      //console.log(rs, 'us')
      //return
      if (rs) {
        localStorage.setItem('ladderdate',rs.ladderLatestdate)
        localStorage.setItem('markupdate',rs.markupLatestdate)
      }
      if (rs && rs.dataInfoInitCcypair && rs.dataInfoInitCcypair.dataListInitCcypairs) {
        localStorage.setItem('init', JSON.stringify(rs.dataInfoInitCcypair.dataListInitCcypairs))
        let arr = rs.dataInfoInitCcypair.dataListInitCcypairs
        let result = []
        arr.map((val, index) => {
          let obj = Object.assign({}, {id: index, ccyPair: val.ccyPair})
          result.push(obj)
        })
        if (!localStorage.all && !localStorage.ccy) {
          //console.log('app2')
          localStorage.setItem('all', JSON.stringify(result))
          localStorage.setItem('ccy', JSON.stringify(result))
        }
      }
    })
  }
  componentDidMount() {
    let loading = this.props.intl.formatMessage(messageString.loading)
    let loginFailed = this.props.intl.formatMessage(messageString.loginFailed)
    let loginSuccess = this.props.intl.formatMessage(messageString.loginSuccess)
    if (localStorage.remember == 1) {
      //console.log(1)
      const reg = /^F8/
      if (reg.test(localStorage.mobile)) {
         Toast.fail(NotDemo, 1.2, () => {
          hashHistory.push('/')
         })
         return
      }
      Toast.loading(loading, 10, () => {
        Toast.fail(loginFailed)
      })
      const options = {
        method: 'POST',
        body: JSON.stringify({
          ID: localStorage.mobile,
          PASS: localStorage.password
        })
      }
      myFetch(`${config.rootApi}/mLogin`, options)
      .then((rs) => {
        if (rs) {
          //console.log(rs)
          localStorage.setItem('token', rs.sessionId)
          localStorage.setItem('uid', localStorage.mobile)
          sessionStorage.setItem('notice', true)
          localStorage.removeItem('live')
          //this.onRatelist()
          this.onInit()
          Toast.hide()
          Toast.success(loginSuccess, 1.2, () => {
            hashHistory.push('/trade')
          })
        }
      })
    }
  }
  render() {
    let initMobile = ''
    let initPassword = ''
    if(this.props.location && this.props.location.query &&　this.props.location.query.demo){
      initMobile = this.props.location.query.demoMobile
      initPassword = this.props.location.query.demoPass
    }
     if (localStorage.remember == 1 && localStorage.mobile) {
      initMobile = localStorage.mobile
    }
      if (localStorage.remember == 1 && localStorage.password) {
      initPassword = localStorage.password
    }
    
    //console.log(localStorage.mobile, localStorage.password,'init')
    const { getFieldProps } = this.props.form
    const str = this.props.intl.formatMessage(messageString.placeholderOne)
    const account = this.props.intl.formatMessage(messageString.AccountPass )
    
    return (
        <div className="rt-reallogin-page">
          <header className="-header">
            <div className="-logo"></div>
          </header>
          <div className="body">
              <p className="-real">
                <FormattedMessage
                 id="simulatedaccount"
                />
              </p>
              <InputItem
              type="text"
              {...getFieldProps('mobile', {
                initialValue: initMobile,
              })}
              placeholder={str}
              clear
            />
            <div className="password-box">
              <InputItem
             className="-password"
              type="password"
              {...getFieldProps('password', {
                initialValue: initPassword,
              })}
              placeholder={account}
              clear
             />
             <Switch
                {...getFieldProps('Switch2', {
                  initialValue: false,
                  valuePropName: 'checked',
                })}
                onClick={(checked) => { console.log(checked); }}
              />
              <p>
                <FormattedMessage
                 id="rememberpassword"
              />
              </p>
            </div>
            <Button onClick={(e)=>this.login()} className="rt-login">
              <FormattedMessage
                 id="login"
              />
            </Button>
            <span className="rt-forgot">
              <span
                onClick={
                  () => {
                    hashHistory.push('/openaccount')
                  }
                }
              >
                <FormattedMessage
                 id="openAccount"
                />
              </span>
              <span
                onClick={
                  () => {
                    hashHistory.push('/')
                  }
                }
              >
                <FormattedMessage
                   id="cancel"
                />
              </span>
            </span>
          </div>
        </div>
      )
  }
}
RealLogin.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(RealLogin))
