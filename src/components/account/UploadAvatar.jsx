import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { FormattedMessage, intlShape, injectIntl,formatMessage } from 'react-intl'
import Upload from 'rc-upload'
import 'whatwg-fetch'
import CosCloud from 'cos-js-sdk-v4'
import { CommonHeader } from 'component/header'
import { messages } from 'component/trade'

class UploadAvatar extends Component {
  onGetSign = (fileName) => {
    let options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        token: localStorage.token,
        uid: localStorage.uid,
        fileName
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
    return fetch('https://chat.byfx.r0.vc/api/avatar/upload', options)
  }

  onSaveAvatar = (avatar) => {
    let options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        token: localStorage.token,
        uid: localStorage.uid,
        avatar
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
    return fetch('https://chat.byfx.r0.vc/api/avatar/save', options)
  }

  state = {
    // upload : <Button className="cm-main-button needsclick" loading={true}>
    //         <FormattedMessage id="changeAvatar"/>
    //       </Button>,
    imgUrl: this.props.location.query ? this.props.location.query.img : ''
  }
  componentDidMount() {
    // this.onGetSign()
  }

  upload() {
    this.refs.avatar.value = ''
    this.refs.avatar.click()
  }

  uploadFile(e) {
    const formatMessage = this.props.intl.formatMessage
    Toast.loading(formatMessage(messages.ChangeUploading), 10, () => {
      Toast.fail(formatMessage(messages.ChangeUploadeFailure))
    })

    let file = e.target.files[0]
    let bucket = 'chat'
    let appid = '1251076433'
    let region = 'sh'
    let self = this
    let uid = localStorage.uid
    let fileName = file.name.split('.')
    fileName = Math.round(+new Date()/1000) + '.' + fileName[fileName.length - 1]
    let cos = new CosCloud({
                appid,// APPID 必填参数
                bucket,
                region,//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
                getAppSign: async function (callback) {//获取签名 必填参数
                  let result = await self.onGetSign(fileName)
                  result = await result.json()
                  callback(result.body.sign)
                }
              })
    let successCallBack = async (result) => {
      let avatar = 'http://' + bucket + '-' + appid + '.pic' + region + '.myqcloud.com/avatar/' + uid + '/'  + fileName
      let response = await self.onSaveAvatar(avatar)
      response = await response.json()
      this.setState({imgUrl: avatar})
      Toast.hide()
      Toast.success(formatMessage(messages.ChangeUploadeSuccess))
    }
    let errorCallBack = (result) => {
      Toast.hide()
      Toast.error(formatMessage(messages.ChangeUploadeFailure))
    }
    let progressCallBack = () => {

    }
    let lastTaskId
    let taskReady = (taskId) => {
      lastTaskId = taskId
    }
    
    let taskId = cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, '/avatar/' + uid + '/'  + fileName, file, 0, taskReady)
  }
  render() {
    return (
      <div className="rt-upload-avatar">
        <CommonHeader
          title={<FormattedMessage id="changeAvatar"/>}
        />
        <div className="cm-scrollable-container">
          <div className="-avatar">
            <img src={this.state.imgUrl}/>
          </div>
          <div className="-wrap-padding">
            <Button className="cm-main-button needsclick" onClick={() => this.upload()}>
              <FormattedMessage className="needsclick" id="changeAvatar"/>
            </Button>
            <input ref="avatar" className="needsclick" type="file" onChange={this.uploadFile.bind(this)} multiple accept='image/*' style={{display: 'none'}} />
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(UploadAvatar)