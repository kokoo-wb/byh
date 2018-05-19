import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button, InputItem, Toast, Switch, Modal, Checkbox } from 'antd-mobile'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { config, helper, myFetch } from '../utils'
import 'whatwg-fetch'
import { messageString } from './'

const alert = Modal.alert;
const AgreeItem = Checkbox.AgreeItem;



class RealAccount extends Component {
  state = {
    visible: false
  }
  login = () => {
    const { getFieldValue } = this.props.form
    let remember = getFieldValue('Switch2')
    let inputmobile = this.props.intl.formatMessage(messageString.placeholderOne)
    let AccountLength = this.props.intl.formatMessage(messageString.AccountLength)
    let AccountPass = this.props.intl.formatMessage(messageString.AccountPass)
    let PassLength = this.props.intl.formatMessage(messageString.PassLength)
    let NotDemo = this.props.intl.formatMessage(messageString.NotDemo)
    let NotReal = this.props.intl.formatMessage(messageString.NotReal)
    let loading = this.props.intl.formatMessage(messageString.loading)
    let loginFailed = this.props.intl.formatMessage(messageString.loginFailed)
    let loginSuccess = this.props.intl.formatMessage(messageString.loginSuccess)
    let ConfirmTrade = this.props.intl.formatMessage(messageString.ConfirmTrade)
    let linkTrade = this.props.intl.formatMessage(messageString.linkTrade)
    let SureOrNot = this.props.intl.formatMessage(messageString.SureOrNot)
    let Confirm = this.props.intl.formatMessage(messageString.Confirm)
    let filled = this.props.intl.formatMessage(messageString.filled)
    let loginReset = this.props.intl.formatMessage(messageString.loginReset)

    
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
    //console.log(1)
    if (!reg.test(mobile)) {
      //console.log(2)
      Toast.fail(NotReal, 1.2, () => {
        hashHistory.push('/')
      })
      return
    }
    const options = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:{
        ID:mobile,
        PASS:password
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
    Toast.loading(loading, 10, () => {
      Toast.fail(loginFailed)
    })
    fetch('http://47.75.10.124/demo/mlogin', options)
    .then((rs) => {
      return rs.json()
    })
    .then((rs) => {
      if (rs && rs.error == 0 && rs.data) {
        // console.log(rs)
        Toast.hide()
         if (remember == true) {
          localStorage.setItem('remember', 2)
          localStorage.setItem('mobile', mobile)
          localStorage.setItem('password', password)
        }
        localStorage.setItem('live', true)
        localStorage.setItem('token', rs.data.sessionId)
        localStorage.setItem('uid', mobile)
        //this.onRatelist()
        if (rs.data.tmConfirmStatus == '0') {
          alert(ConfirmTrade, 
            <div className="tips-message">
              <a target="_blank" href="http://47.75.10.124/demo/agreement?lang=SC"><FormattedMessage id="linkTrade"/></a>
              <p className="check">
                <FormattedMessage id="lSureOrNot"/>
              </p>
            </div>, 
            [{ text: filled, onPress: () => hashHistory.push('/') },
            {
              text: Confirm,
              onPress: () =>{
                this.onInit()
                let options = {
                  method: 'POST',
                  body: JSON.stringify({
                    PKBN: 3
                  })
                }
                myFetch(`${config.rootApi}/mUpdAccount`, options, true)
                  .then((res) => {
                    if (res) {
                      if (rs.data.pwChangeFlag == '0') {
                        Toast.success(loginSuccess,1.2,() => {
                          hashHistory.push('/account')
                        })
                      } else if (rs.data.pwChangeFlag == '1') {
                        Toast.success(loginReset,1.2, () => {
                          hashHistory.push({
                              pathname: '/account/modifypassword',
                              query: {
                                name: 'first'
                              }
                            })
                        })
                      }
                    }
                  })
                
              },
            },
          ])
        } else if (rs.data.tmConfirmStatus == '1') {
          this.onInit()
          if (rs.data.pwChangeFlag == '0') {
              Toast.success(loginSuccess,1.2,() => {
                hashHistory.push('/account')
              })
          } else if (rs.data.pwChangeFlag == '1') {
            Toast.success(loginReset,1.2, () => {

              hashHistory.push({
                  pathname: '/account/modifypassword',
                  query: {
                    name: 'first'
                  }
                })
            })
          }
        }
      } else {
        let errorMsg = rs && rs.errorMsg
        //Toast.fail(errorMsg, 1.2)
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
  /*onRatelist = () => {
    const options = {
      method: 'POST'
    }
    myFetch(`${config.rootApi}/mRatelist`, options, true)
     .then((rs) => {
       if (rs && rs.dataInfoRate && rs.dataInfoRate.dataListRates) {
           let arr = rs.dataInfoRate.dataListRates
           let result = []
           arr.map((val, index) => {
             let obj = Object.assign({}, {id: index, ccyPair: val.ccyPair})
             result.push(obj)
           })
           //console.log('app1')
           if (!localStorage.all && !localStorage.ccy) {
             //console.log('app2')
             localStorage.setItem('all', JSON.stringify(result))
             localStorage.setItem('ccy', JSON.stringify(result))
           }
         }
     })
  }*/
  componentDidMount() {
    if (localStorage.remember == 2) {
      const reg = /^F8/
      if (!reg.test(localStorage.mobile)) {
         Toast.fail(NotReal,1.2, () => {
          hashHistory.push('/')
         })
         return
      }
      // console.log(1)
      const options = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
          ID: localStorage.mobile,
          PASS: localStorage.password
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
     fetch('http://47.75.10.124/demo/mlogin', options)
      .then((rs) => {
        return rs.json()
      })
      .then((rs) => {
      if (rs && rs.error == 0 && rs.data) {
        // console.log(rs)
        Toast.hide()
         if (remember == true) {
          localStorage.setItem('remember', 2)
          localStorage.setItem('mobile', mobile)
          localStorage.setItem('password', password)
        }
        localStorage.setItem('live', true)
        localStorage.setItem('token', rs.data.sessionId)
        localStorage.setItem('uid', mobile)
        //this.onRatelist()
        if (rs.data.tmConfirmStatus == '0') {
          alert(ConfirmTrade, 
            <div className="tips-message">
              <a target="_blank" href="http://47.75.10.124/demo/agreement?lang=SC">{linkTrade}</a>
              <p className="check">
                {SureOrNot}
              </p>
            </div>, 
            [{ text: filled, onPress: () => hashHistory.push('/') },
            {
              text: Confirm,
              onPress: () =>{
                this.onInit()
                let options = {
                  method: 'POST',
                  body: JSON.stringify({
                    PKBN: 3
                  })
                }
                myFetch(`${config.rootApi}/mUpdAccount`, options, true)
                  .then((res) => {
                    if (res) {
                      if (rs.data.pwChangeFlag == '0') {
                        Toast.success(loginSuccess,1.2,() => {
                          hashHistory.push('/account')
                        })
                      } else if (rs.data.pwChangeFlag == '1') {
                        Toast.success(loginReset,1.2, () => {
                          hashHistory.push({
                              pathname: '/account/modifypassword',
                              query: {
                                name: 'first'
                              }
                            })
                        })
                      }
                    }
                  })
                
              },
            },
          ])
        } else if (rs.data.tmConfirmStatus == '1') {
          this.onInit()
          if (rs.data.pwChangeFlag == '0') {
              Toast.success(loginSuccess,1.2,() => {
                hashHistory.push('/account')
              })
          } else if (rs.data.pwChangeFlag == '1') {
            Toast.success(loginReset,1.2, () => {

              hashHistory.push({
                  pathname: '/account/modifypassword',
                  query: {
                    name: 'first'
                  }
                })
            })
          }
        }
      } else {
        let errorMsg = rs && rs.errorMsg
        //Toast.fail(errorMsg, 1.2)
      }
    })
    }
  }
  render() {
    let initMobile = ''
    let initPassword = ''
    if (localStorage.remember == 2 && localStorage.mobile) {
      initMobile = localStorage.mobile
    }
    if (localStorage.remember == 2 && localStorage.password) {
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
                 id="realaccount"
                />
              </p>
              <InputItem
              type="text"
              {...getFieldProps('mobile', {
                initialValue: initMobile,
              })}
              placeholder={account}
              clear
            />
            <div className="password-box">
              <InputItem
             className="-password"
              type="password"
              {...getFieldProps('password', {
                initialValue: initPassword,
              })}
              placeholder={str}
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
            <Button onClick={(e)=>
              this.login()
              } 
              className="rt-login"
            >
              <FormattedMessage
                 id="login"
              />
            </Button>
            <span className="rt-forgot">
              <span>
                <FormattedMessage
                 id="forgotPassWord"
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
            {/*<p className="rt-cancel">
            </p>*/}
          </div>
        </div>
      )
  }
}
RealAccount.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(RealAccount))
