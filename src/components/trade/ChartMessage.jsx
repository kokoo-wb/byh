import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Icon ,Popup, Button, TextareaItem } from 'antd-mobile'
import moment from 'moment'

export default class ChartMessage extends Component {
  onInforList = (data) => {
     let id = data ? data.user.uid : '';
     let user = data ? data.user : {}
     const uid = localStorage.uid
     let result
     if (id != uid) {
      result = (
        <li className="-one" >
          <div className="-picture">
            <img src={user.avatar + '?imageMogr2/thumbnail/!144x144r/interlace/1|imageMogr2/gravity/center/crop/144x144'}/>
          </div>
          <div className="chat-right">
            <span>
              <span>{user.nickname}</span>
              <span>{moment(data.time).fromNow()}</span>
            </span>
            <span>{data.msg}</span>
          </div>
        </li>
        )
     } else {
        result = (
          <li className="-two">
            <div className="chat-right">
              <span>
                <span>{moment(data.time).fromNow()}</span>
                <span>{data.user.nickname}</span>
              </span>
              <span>{data.msg}</span>
            </div>
            <div className="-picture">
              <img src={data.user.avatar + '?imageMogr2/thumbnail/!144x144r/interlace/1|imageMogr2/gravity/center/crop/144x144'}/>
            </div>
           
          </li>)
     }
     return result
  }
	render() {
    const { messages } = this.props
    const uid = localStorage.uid
    // console.log(messages)
    moment.locale('zh-CN')
    const user = messages.user
    let len = messages.length-1;
    let obj = messages[len];
		return(
			<div className="chartmessage">
				<ul className= { obj  ? '-padding-bottom' : '-ul'}>
          {obj ? this.onInforList(obj) : null}
        </ul>
			</div>
		)
	}
}