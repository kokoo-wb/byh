import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { Button, Icon, InputItem, Toast, Switch, Popover } from 'antd-mobile'
import { createForm } from 'rc-form'
import { messages } from 'component/trade'
import { messageString } from './'
import { NewTabChange, TimerButton } from './'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'

const Item = Popover.Item;

class NewUserRegister extends Component {
	state = {
		codeId: '',
    isMobile: false,
    visible: false,
    selected: '＋86',
    areaCode: '01'
	}
  onResult = (val) => {
    //console.log(val, 1)
    this.setState({
      codeId: val
    })
  }
  onOpenClick = () => {
    const { getFieldValue } = this.props.form
    let getVcode = this.props.intl.formatMessage(messageString.getVcode)
    let inputVcode = this.props.intl.formatMessage(messageString.inputVcode)
    let opendemoSuccess = this.props.intl.formatMessage(messageString.opendemoSuccess)
    let ChineseMainland = this.props.intl.formatMessage(messageString.ChineseMainland)
    let ChinaHongkong = this.props.intl.formatMessage(messageString.ChinaHongkong)
    let MacaoChina = this.props.intl.formatMessage(messageString.MacaoChina)
    let acceptPhone = this.props.intl.formatMessage(messageString.acceptPhone)
    let submitting = this.props.intl.formatMessage(messageString.submitting)
    let submitFaild = this.props.intl.formatMessage(messageString.submitFaild)




    let verify = getFieldValue('password')
    let mobile = getFieldValue('mobile')
    let surname = getFieldValue('surname')
    let givenname = getFieldValue('givenname')
    let chinese_name = surname + givenname
    if (!this.state.codeId) {
      Toast.fail(getVcode, 1.2)
      return
    }
    if (!verify) {
      Toast.fail(inputVcode, 1.2)
      return
    }
    //let mobileData = {}
    let name = Object.assign({}, {surname: surname, givenname: givenname, chinese_name: chinese_name})
    /*if (this.state.isMobile) {
      if (!mobile) {
        Toast.fail('请输入手机号', 1.2)
        return
      }
      mobile = mobile.replace(/\s/g, '')
      mobileData = Object.assign({}, {type: 1, area_code: this.state.areaCode, mobile: mobile})
    }*/
    Toast.loading(submitting, 20, () => {
      Toast.fail(submitFaild)
    })
    let options = {
      method: 'POST',
      headers:{
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body:{
        code_id: this.state.codeId,
        code_value: verify,
        ...name
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
   fetch('http://47.75.10.124/demo/create', options)
    .then((rs) => {
      //console.log(rs, 1)
     return rs.json()
    })
    .then((rs) => {
      console.log(rs)
      Toast.hide()
      if (rs.error == 0) {
         Toast.success(opendemoSuccess, 1.2, () => {
           hashHistory.push({
            pathname: '/simulation',
            query: {
              demoMobile: rs.ID,
              demoPass:rs.PASS,
              demo:true
            }
          })
         })
      } else {
        Toast.fail(rs.errorMsg)
      }
      
    })
  }
  onSelect = (opt) => {
    //console.log(opt.key, 1);
    this.setState({
      visible: false,
      selected: opt.props.value,
      areaCode: opt.key
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    })
  }
	render() {
		const { getFieldProps, getFieldValue } = this.props.form
		const inputmobile = this.props.intl.formatMessage(messages.inputmobile)
		const inputemail = this.props.intl.formatMessage(messages.inputemail)
    console.log(inputemail)
    const inputverify = this.props.intl.formatMessage(messages.inputVerify)
		return (
			<div className="rt-reallogin-page rt-newuser-register">
				<header className="-header">
           <div className="-logo"></div>
        </header>
				<div className="body">
          {/*<NewTabChange
            activeIndex={2}
            onClick={this.onClick}
          />
          
            this.state.active == 1 ?
            <InputItem
              type="phone"
              {...getFieldProps('mobile', {
                initialValue: '',
              })}
              placeholder={inputmobile}
              clear
            /> :
            
          */}
          <InputItem
            type="email"
            {...getFieldProps('email', {
              initialValue: '',
            })}
            placeholder={inputemail}
            clear
          />
          <div className="rt-optional-phone">
            {
              this.state.isMobile ? 
              <div className="-input-option">
                <Popover mask
                  overlayClassName="rt-fortest"
                  visible={this.state.visible}
                  overlay={[
                    (<Item key="01" value="+86">+86 <FormattedMessage id="ChineseMainland"/></Item>),
                    (<Item key="02" value="＋852">＋852 <FormattedMessage id="ChinaHongkong"/></Item>),
                    (<Item key="03" value="＋853">
                      ＋852 <FormattedMessage id="MacaoChina"/>
                    </Item>),
                  ]}
                   align={{
                    offset: [15, 30],
                  }}
                  placement='bottomLeft'
                  onVisibleChange={this.handleVisibleChange}
                  onSelect={this.onSelect}
                >
                  <div className="-popover-left">
                    <span className="-area-code">{this.state.selected}</span>
                    <span className="-triggle"></span>
                  </div> 
                </Popover>
                <InputItem
                  type="phone"
                  {...getFieldProps('mobile', {
                    initialValue: '',
                  })}
                  placeholder={inputmobile}
                  clear
                />
              </div> : <div className="-left"><FormattedMessage id="acceptPhone"/></div>
            }
            
            <Switch
              {...getFieldProps('Switch2', {
                initialValue: false,
                valuePropName: 'checked',
              })}
              onClick={(checked) => { 
                this.setState({
                  isMobile: checked
                })
              }}
            />
          </div>
          <div className="-row">
            <InputItem 
              type="text"
              {...getFieldProps('surname', {
                initialValue: '',
              })}
              clear
            >
              <FormattedMessage id="surname"/>
            </InputItem>
            <InputItem 
              type="text"
              {...getFieldProps('givenname', {
                initialValue: '',
              })}
              clear
            >
              <FormattedMessage id="givenname"/>
            </InputItem>
          </div>
          {/*<InputItem 
            type="text"
            {...getFieldProps('chinese_name', {
                initialValue: '',
              })}
              clear
          >
            <FormattedMessage id="chinese_name"/>
          </InputItem>*/}
          <div className="rt-clear-float -float">
            <InputItem
             className="-verify"
              type="password"
              {...getFieldProps('password', {
                initialValue: '',
              })}
              placeholder={inputverify}
              clear
            />
            <TimerButton
              className="rt-absolute-btn"
              formatMessage={this.props.intl.formatMessage}
              interval="60"
              genre={
                { email: getFieldValue('email'), val: 1, 
                  mobile: getFieldValue('mobile'), isMobile: this.state.isMobile, areaCode: this.state.areaCode
                }
              }
              result={this.onResult}
            />
          </div>
          {/*<p className="-tips">
            <FormattedMessage id="opentips"/>
          </p>*/}
          <div className="-open-btn">
            <Button
              className={`cm-main-button`}
              onClick={this.onOpenClick}
            >
              <FormattedMessage id="openAccount" />
            </Button>
          </div>
          <p className="rt-cancel">
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
           </p>
				</div>
				
			</div>
			)
	}
}

NewUserRegister.propType = {
  intl: intlShape.isRequired
}

export default injectIntl(createForm()(NewUserRegister))