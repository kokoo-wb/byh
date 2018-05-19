import React, {Component} from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, Button, InputItem, Toast } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { createForm } from 'rc-form'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'

 class ModifyNickname extends Component {
  render() {
    const { getFieldProps } = this.props.form
    let defname = this.props.location.query ? this.props.location.query.defname : ''
    return (
      <div className="modify-nickname">
        <CommonHeader
          title={<FormattedMessage id="modifynickname"/>}
          right={<FormattedMessage id="complete"/>}
          onRightClick = {
            () => {
              const { getFieldValue } = this.props.form
              let nickname = getFieldValue('nickname')
              let options = {
                method: 'POST',
                headers:{
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 body:{
                  token: localStorage.token,
                  uid: localStorage.uid,
                  nickname: nickname
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
             fetch('http://47.91.223.92/api/nickname/save', options)
              .then((rs) => {
               return rs.json()
              })
              .then((rs) => {
                console.log(rs)
                if (rs.status) {
                  Toast.hide()
                   Toast.success('设置成功！', 1.2, () => {
                    hashHistory.goBack()
                  })
                } else {
                  Toast.fail(rs.msg)
                }
                
              })
            }
          }
        />
        <div className="cm-scrollable-container -modify-nickname">
          <InputItem
            {...getFieldProps('nickname')}
            clear
            placeholder={defname}
            autoFocus
          >昵称</InputItem>
        </div>
      </div>
    )
  }
}
ModifyNickname.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(ModifyNickname))