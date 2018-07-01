import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Tabs } from 'antd-mobile'
import { createForm } from 'rc-form'
import { InputItem, Icon } from 'antd-mobile'
import moment from 'moment'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'

class LargeRoom extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { getFieldProps } = this.props.form
    const { messages } = this.props
    const uid = localStorage.uid
    // console.log(messages)
    moment.locale('zh-CN')
    let result = <ul className="rt-large-room">
          {
            messages.map((message, index) => {
              const user = message.user
              if (user.uid != uid) {
                return (
                  <li key={index} className="-items">

                    <div className="-left">
                      <span>
                        <img src={user.avatar + '?imageMogr2/thumbnail/!144x144r/interlace/1|imageMogr2/gravity/center/crop/144x144'}/>
                      </span>
                    </div>
                    <div className="-right">
                      <div className="-top">
                        <div className="-name">{user.nickname}</div>
                        <div className="-time">{moment(message.time).fromNow()}</div>
                      </div>
                      <div className="-bottom">
                        <span className="-dec">{message.msg}</span>
                      </div>
                    </div>
                  </li>
                )
              }
              return (
                <li key={index} className="-items">
                  <div className="-right">
                    <div className="-top">
                      <div className="-time" style={{float:'left'}}>{moment(message.time).fromNow()}</div>
                      <div className="-name" style={{float:'right'}}>{user.nickname}</div>
                    </div>
                    <div className="-bottom" style={{textAlign: 'right'}}>
                      <span className="-dec">{message.msg}</span>
                    </div>
                  </div>
                  <div className="-left">
                    <span style={{float: 'right'}}>
                      <img src={user.avatar + '?imageMogr2/thumbnail/!144x144r/interlace/1|imageMogr2/gravity/center/crop/144x144'}/>
                    </span>
                  </div>
                </li>
              )
            })
          }
        </ul>
    return (
      <div className="rt-chart-room" id = "large-room"  >
        {messages.length == 0 ? ''  : result }
      </div>
    )
  }
}

LargeRoom.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(LargeRoom))