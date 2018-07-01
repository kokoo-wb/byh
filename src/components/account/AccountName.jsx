import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon, Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'
import 'whatwg-fetch'

export default class AccountName extends Component {
  onGetUserInfor = () => {
    fetch(`https://chat.byfx.r0.vc/api/user?token=${localStorage.token}&uid=${localStorage.uid}`)
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
        Toast.fail(rs.msg)
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
    const { name } = this.props
    return (
      <div className="rt-account-name">
        <div className="-left">
          <span><img src={this.state.avatar}/></span>
        </div>
        <div className="-center">
          <span>{this.state.nickname}</span>
          <span className="-font">
            <FormattedMessage id="account1"/>
            <span> ID: {this.state.id}</span>
          </span>
        </div>
        <div
          className="-right"
          onClick={
            () => {
              hashHistory.push('/account/condition')
            }
          }
        >
          <span>
            <FormattedMessage id="account1"/> <FormattedMessage id="set"/>
          </span>
          <Icon type="right"/>
        </div>
      </div>
    )
  }
}
