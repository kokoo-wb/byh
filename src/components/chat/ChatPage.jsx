import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import PropTypes from 'prop-types'
import moment from 'moment'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { InputItem, NoticeBar, Icon, Popup, Button, Toast, TextareaItem } from 'antd-mobile'
import { messageString } from 'component/user'
import io from 'socket.io-client'

import { CenterRightHeader } from 'component/header'
import { FooterBar } from 'component/footer'

import { Classification, LargeRoom, ChatInput } from './'


class ChatPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      roomId: null,
      connected: false,
      messages: [],
      user: null
    }
   
  }

  connect(namespace) {
    const socket = io('http://47.91.223.92:3000' + namespace, { transports: ['websocket'] })
    return new Promise(resolve => {
      socket.on('connect', () => {
        resolve(socket)
      })
    })
  }

  socketIo

  async componentDidMount() {

    this.onGetUserInfor()
    
    this.socketIo = await this.connect('/chat')
    // 登录
    this.socketIo.emit('login', {token: localStorage.token, uid: localStorage.uid})
    
    // 登录成功
    this.socketIo.on('loginSuccess', () => {
    this.socketIo.emit('getRoomList', {})
    })

    // 更新房间列表
    this.socketIo.on('updateRoomList', (rooms) => {
      this.setState({
        rooms
      }, () => {
        this.socketIo.emit('join', this.state.rooms[0]._id)
      })
    })

    // 设置当前房间
    this.socketIo.on('setCurrentRoom', (roomId, messages) => {
      // 设置当前房间ID，并且允许发送消息
      this.setState({
        roomId,
        connected: true,
        messages: messages
      })
    })

    // 监听消息
    this.socketIo.on('addMessage', (msg) => {
      let messages = this.state.messages.concat([msg])
      this.setState({
        messages
      })
      console.log(msg)
    })
    

    // 监听错误信息
    this.socketIo.on('sendError', (msg) => {
      console.log(msg)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    document.getElementById('large-room').scrollTop = document.getElementById('large-room').scrollHeight
  }

  // 获取房间列表
  getRoomList() {
    this.socketIo.emit('getRoomList', {})
  }

  // 进入房间
  enterRoom(roomId) {
    let Enteringtheroom = this.props.intl.formatMessage(messageString.Enteringtheroom)
    let Entryfailure = this.props.intl.formatMessage(messageString.Entryfailure)

    Toast.hide()
    Toast.loading(Enteringtheroom, 10, () => {
      Toast.fail(Entryfailure)
    })
    this.socketIo.emit('leave', this.state.roomId)
    Toast.hide()
    this.socketIo.emit('join', roomId)
    this.setState({
      roomId
    })
  }


  onSayClick = (e) => {
    let Chatcontent = this.props.intl.formatMessage(messageString.Chatcontent)
    let chatSend = this.props.intl.formatMessage(messageString.chatSend)
    let filled = this.props.intl.formatMessage(messageString.filled)
    e.preventDefault()
    Popup.show(
      <ChatInput onSendMessge={this.onSendMessge} onClose={this.onClose} Chatcontent={Chatcontent} chatSend={chatSend} filled={filled}/>
      ,{ animationType: 'slide-up', maskClosable: false  }
    )
  }

  onClose = () => {
    Popup.hide()
  }

  // 发送消息
  onSendMessge = (msg) => {
    let Changenickname = this.props.intl.formatMessage(messageString.Changenickname)
    console.log(this.state.user.nickname, 12)
    Popup.hide()
    if (this.state.user.nickname != '佰益滙用户') {
      
      this.socketIo.emit('send', this.state.roomId, msg)
      let msgObject = {
        msg,
        time: moment().toDate(),
        type: 1,
        user: this.state.user
      }
      let messages = this.state.messages.concat([msgObject])
      this.setState({
        messages
      })
    } else {
      Toast.fail(Changenickname, 1.2, () => {
        hashHistory.push({
          pathname: '/account/modifynickname',
          query: {
            defname: this.state.user.nickname
          }
        })
      })
    }
    
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
            user: {
              avatar: rs.body.avatar,
              nickname: rs.body.nickname,
              uid: rs.body.uid
            }
          })
        }
      } else {
        Toast.fail(rs.msg)
      }
    })
  }


  componentWillUnmount() {
    // 关闭连接
    this.socketIo.emit('disconnect')
    this.socketIo.close()
  }

  render() {
    const { rooms, roomId } = this.state

    return (
      <div className="rt-chart-page">
        <CenterRightHeader
          title={
            <span><FormattedMessage id="ChatRoom"/></span>
          }
          right={
            <span></span>
          } />
          <div className="rt-suspension" ref="category"> 
            <Classification
              handleTabClick={
                this.enterRoom.bind(this)
              }
              rooms={rooms}
              activeIndex={roomId}
            />
          </div>
        
        <div className="cm-scrollable-container" id="scroll" ref="categoryOne">
          <LargeRoom messages={this.state.messages} />
        </div>

        <div className="click-say">
          <div className="-say">
            <Icon type={require('static/svg/m_chat.svg') } />
            <div className="i-can-say"
              onClick={
                (e) => {
                  e.preventDefault()
                  this.onSayClick(e)
                }
              }
            >
              <FormattedMessage id="IWantSay"/>
            </div>
          </div>
        </div>


        <FooterBar activeIndex={2} />
      </div>
    )
  }
}

ChatPage.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(ChatPage)

