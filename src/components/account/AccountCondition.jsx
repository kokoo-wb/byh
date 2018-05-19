import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, Button, Toast } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { SideLeftRight, ThreeItem } from 'component/common'
import { TopAccount } from 'component/trade'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'

export default class AccountCondition extends Component {
  constructor(props){
    super(props)
    this.getUserMessage = this.getUserMessage.bind(this)
 }
  loginOut = () => {
    Toast.loading('正在注销...', 10, () => {
      Toast.fail('注销失败！')
    })
    const options = {
      method: 'POST'
    }
    myFetch(`${config.rootApi}/mLogout`, options, true)
      .then((rs) => {
        if (rs) {
          Toast.hide()
          Toast.success('注销成功！', 1.2, () => {
            localStorage.clear()
            sessionStorage.removeItem('notice')
            hashHistory.push('/')
          })
        }
      })
  }
  getUserMessage = () => {
    console.log(1)
  }
  componentDidMount() {
    this.getUserMessage()
  }
  onGetUserInfor = () => {
    fetch(`http://47.91.223.92/api/user?token=${localStorage.token}&uid=${localStorage.uid}`)
    .then((rs) => rs.json())
    .then((rs) => {
      //console.log(rs)
      if (rs.status) {
        if (rs && rs.body) {
          let body = rs.body
          this.setState({
            avatar: rs.body.avatar,
            nickname: rs.body.nickname,
            id: rs.body.uid
          })
        }
      } else {
        Toast.fail(rs.msg, 1.2, () => {
          hashHistory.push('/')
        })
      }
      
    })
  }
  state={
    avatar : '',
    nickname: '',
    id: ''
  }
  componentDidMount() {
    this.onGetUserInfor()
  }
  render() {
    return (
      <div className="-background">
        <CommonHeader
          title={<FormattedMessage id="accountStatus"/>}
        />
        <div className="cm-scrollable-container rt-bg-grey">
          <TopAccount />
          <SideLeftRight
            left={
              <span>
                <FormattedMessage id="deposit"/>
                <span>／</span>
                <FormattedMessage id="withdraw"/>
              </span>
            }
            right={<Icon type="right"/>}
            className="rt-side-height -bottomTop"
          />
          {/*<SideLeftRight
            left={<FormattedMessage id="incomeDetail"/>}
            right={<Icon type="right"/>}
            className="rt-side-height"
            onClick={
              () => {
                hashHistory.push('/account/inout')
              }
            }
          />*/}
          <div className="rt-height22"></div>
          <ThreeItem
            left={
              <FormattedMessage id="portrait"/>
            }
            right={
              <span className="rt-portrait-img">
                <img src={this.state.avatar}/>
              </span>
            }
            onClick={
              () => {
                hashHistory.push({
                  pathname: '/account/uploadavatar',
                  query: {
                    img: this.state.avatar + 'imageMogr2/thumbnail/!750x750r/interlace/1|imageMogr2/gravity/center/crop/750x750'
                  }
                })
              }
            }
            className="rt-portrait"
          />
          <SideLeftRight
            left={
              <span>
                <FormattedMessage id="account1"/>
                <span>ID</span>
              </span>
            }
            right={<span className="rt-phone">{this.state.id}</span>}
            className="rt-side-height"
          />
          <ThreeItem
            left={
              <FormattedMessage id="nickname"/>
            }
            right={
              <span>{this.state.nickname}</span>
            }
            onClick={
              () => {
                hashHistory.push({
                  pathname: '/account/modifynickname',
                  query: {
                    defname: this.state.nickname
                  }
                })
              }
            }
          />
          {
            localStorage.live ? <SideLeftRight
              left={<FormattedMessage id="modifyPassword"/>}
              right={<Icon type="right"/>}
              className="rt-side-height"
              onClick={
                () => {
                  hashHistory.push('/account/modifypassword')
                }
              }
            /> : null
          }
          <div className="rt-height22"></div>
          {/*
          <ThreeItem
            className="rt-blue"
            left={
              <FormattedMessage id="logaccsetting"/>
            }
            right={
              <FormattedMessage id="notset"/>
            }
            onClick={
              () => {
                hashHistory.push('/account/loginsetting')
              }
            }
          />
          <SideLeftRight
            left={<FormattedMessage id="gesturePassword"/>}
            right={<Icon type="right"/>}
            className="rt-side-height"
          />*/}
          <Button
            className="cm-main-button -white -no-border-radius rt-margin-top22"
            onClick={
              () => {
                this.loginOut()
              }
            }
          >
            <FormattedMessage id="signOut"/>
          </Button>
        </div>
        
      </div>
    )
  }
}
