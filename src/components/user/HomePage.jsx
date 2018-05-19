import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Button, Icon, Popover } from 'antd-mobile'
import { messageString } from './'
const Item = Popover.Item

  // const CS = this.props.intl.formatMessage(messageString.CS)
  // console.log(CS)

 class HomePage extends Component {

  state = {
    visible: false,
    simpleLang: '简中',
    lang: 'zh'
  }
  onSelect= (obj) => {
    //console.log(obj)
    let val = obj.props.value
    let lang = 'zh'
    let simpleLang = 'EN'
    if ( obj.key == 1 ) {
      lang = 'zh'
      simpleLang = '简中'
    } else if ( obj.key == 2 ) {
      lang = 'en'
      simpleLang = 'EN'
    }
    this.setState({
      lang,
      simpleLang,
      visible: !this.state.visible
    }, () => {
      this.props.chooseLocale(val)
    })
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible
    })
  }
  render() {
    const CS = this.props.intl.formatMessage(messageString.CS)
    return (
      <div className="rt-home-page">
        <header className="-header">
          <img src={require('static/images/logo-h.png')}/>
        </header>
        <div className="-center-body">
          <div className="-margin">
            <Button
              className={`cm-main-button -marTop`}
              onClick={
                () => {
                  hashHistory.push('/reallogin')
                }
              }
            >
              <FormattedMessage
                 id="realAccount"
              />
            </Button>
            <Button
              onClick={
                () => {
                  hashHistory.push('/simulation')
                }
              }
              className={`cm-main-button -white -marTop`}
            >
              <FormattedMessage
                 id="visitor"
              />
            </Button>
          </div>
          
          <p className="-tipsLogin">
            <FormattedMessage
               id="tipsLogin"
            />
          </p>
          {/*<div className="-consult">
            <span className="-icon">
              <Icon type={require('static/svg/m_5_4.svg')}/>
            </span>
            <span className="-right">
              <FormattedMessage
                id="consult"
              />
            </span>
          </div>*/}
        </div>
        <div className="-bottom">
          <div className="-bottom-wrap">
            <div className="-left-consult">
              <span>
                <Icon type={require('static/svg/m_5_4.svg')}/>
              </span>
              <span>
                <FormattedMessage
                   id="CS"
                />
              </span>
            </div>
            <div className="-left-consult">
              <Popover
                overlayClassName="rt-login-lang"
                visible={this.state.visible}
                placement='topRight'
                overlay={[
                  (<Item key="1" value="zh-CN"><FormattedMessage id="Chinese"/></Item>),
                  (<Item key="2" value="en">English</Item>),
                ]}
                onSelect={
                  this.onSelect
                }
                onVisibleChange={this.handleVisibleChange}
              >
                <span className="rt-swtich-lang">
                   <span>{this.state.simpleLang}</span>
                  <Icon
                    type={require('static/svg/icon_54.svg')}
                  />
                </span>
              </Popover>
              <span>
                <FormattedMessage
                  id={this.state.lang}
                />
              </span>
            </div>
          </div>
        {/*<span className="-colon">language :</span>
          */}
        </div>
      </div>
    )
  }
}


HomePage.propTypes = {
  intl: intlShape.isRequired
  
}

export default injectIntl(HomePage)






