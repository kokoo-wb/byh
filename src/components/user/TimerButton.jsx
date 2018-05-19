import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { config, myFetch, helper } from '../utils'
import { createForm } from 'rc-form'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { messages } from 'component/trade'
import 'whatwg-fetch'
import { messageString } from './'


class TimerButton extends Component {
  state = {
    disabled: false,
    //active : this.props.genre.active,
    text: <FormattedMessage id="sendout" />
  }
  /*componentWillReceiveProps(nextProps) {
    if (nextProps.genre != this.props.genre) {
      this.setState({
        active: nextProps.genre.active
      })
    }
  }*/
  getVerifyCode = () => {
    const { genre } = this.props
    //let mobilenull = this.props.formatMessage(messages.mobilenull)
    //let mobilevalid = this.props.formatMessage(messages.mobilevalid)
    let inputMobile = this.props.intl.formatMessage(messageString.inputMobile)
    

    let emailnull = this.props.formatMessage(messages.emailnull)
    let emailvalid = this.props.formatMessage(messages.emailvalid)
    if (genre.email) genre.email = genre.email.replace(/\s/g, '')
    //console.log(this.state.active, '1')
    if (genre.email !== null) {
      if (!genre.email) {
          Toast.fail(emailnull, 1.2)
          return
        }
      if (!(config.pattern.email.test(genre.email))) {
          Toast.fail(emailvalid, 1.2)
          return
      }
      /*if (this.state.active == 1) {
        if (!genre.mobile) {
          Toast.fail(mobilenull, 1.2)
          return
        }
        if (!(config.pattern.mobile.test(genre.mobile))) {
          Toast.fail(mobilevalid, 1.2)
          return
        }
      } else if (this.state.active == 2) {
        
        
      }*/
    }
    let mobileData = {}
    if (genre.isMobile) {
      if (!genre.mobile) {
        Toast.fail(inputMobile, 1.2)
        return
      }
      let mobile = genre.mobile.replace(/\s/g, '')
      mobileData = Object.assign({}, {type: 1, area_code: genre.areaCode, mobile: mobile})
    }
    this.onSendvcode(genre, mobileData)
    this.setState({
      disableVal: true
    })
    const interval = this.props.interval
    let second = interval - 1
    this.it = setInterval(() => {
      this.setState({
        text: <span>{second}<FormattedMessage id={`secondSendou`}/></span>
      })
      second--
    }, 1000)
    this.to = setTimeout(() => {
      this.setState({
        text: <FormattedMessage id="sendout" />,
        disableVal: false, // 恢复按钮点击
      })
      // 清除定时器
      clearInterval(this.it)
    }, interval * 1000)
  }
  onSendvcode = (obj, mobileData) => {
    let sending = this.props.intl.formatMessage(messageString.sending)
    let sendFaild = this.props.intl.formatMessage(messageString.sendFaild)
    let sendSuccess = this.props.intl.formatMessage(messageString.sendSuccess)
    // console.log(sendSuccess)
    if (obj.val == 1) {
      Toast.loading(sending, 20, () => {
        Toast.fail(sendFaild)
      })
      let options = {
        method: 'POST',
        headers:{
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         body:{
          email: obj.email,
          ...mobileData
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
     fetch('http://47.75.10.124/demo/vcode', options)
      .then((rs) => {
        //console.log(rs, 1)
       return rs.json()
      })
      .then((rs) => {
        console.log(rs)
        if (rs.error == 0) {
          Toast.hide()
           Toast.success(sendSuccess, 1.2, () => {
            //console.log(rs['code_id'], 'rs')
            this.props.result(rs['code_id'])
          })
        }
        
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.it)
    clearTimeout(this.to)
  }
	render() {
    const { className } = this.props
		return (
		  <Button
        className={`cm-main-button ${className}`}
        disabled={this.state.disableVal}
        onClick={
          this.getVerifyCode
        }
      >
        {this.state.text}
      </Button>
			)
	}
}

TimerButton.propType = {
  intl: intlShape.isRequired
}

export default injectIntl(createForm()(TimerButton))



