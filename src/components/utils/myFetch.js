
import { hashHistory } from 'react-router'
import 'whatwg-fetch'
import fetchJsonp from 'fetch-jsonp'
import { Toast } from 'antd-mobile'
import helper from './helper'
import errorListJson from './errorListJson'
 
/**
 * 包装`fetch`包括获取`jsonp`
 * 参见 npm package whatwg-fetch fetch-jsonp
 * @param  {[string]}  url     [description]
 * @param  {[object]}  options [description]
 * @param  {Boolean}   jsonp   [description]
 * @return {Promise}
 */
function myFetch(url, options = {}, login = false, isErrToast = true, jsonp = false) {
  if (options && options.headers) {
    options['headers']['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    options = Object.assign(options, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
  }
  if (login) {
   let authToken = localStorage.token
   if (!authToken) {
     Toast.hide()
       // 请先登录
       Toast.fail('请先登录', 2, () => {
         hashHistory.push('/')
       })
   }
   if (options) {
     let obj
     if (options.body) {
      obj = Object.assign({ SESN: authToken}, JSON.parse(options.body))
     } else {
       obj = Object.assign({}, { SESN: authToken})
     }
     options.body = JSON.stringify(obj)
   }
 }
  if ( options && options.body) {
    const obj = JSON.parse(options.body)
    const arr = Object.entries(obj)
    let text = ''
    let result = ''
    arr.forEach((val) => {
      text += val.join("=")+'&'
    })
    result = text.slice(0,-1)
    //console.log(encodeURI(result))
    options.body = encodeURI(result)
    //console.log(options.body)
  }

  const promise = (options !== null) ? fetch(url, options)
    : ((jsonp === true) ? fetchJsonp(url) : fetch(url))
  let res = promise
    .then((response) => {
      return response
    })
  if (isErrToast) {
    return res.then((res) => {
            return res.json()
          })
          .then((json) => {

            if (json === undefined) {
              return {}
            }
            if ( json.statusCode == '0') {
              // console.log(1)
              return json
            } else {
              // console.log(2)
              let error = json.errorInfo
              if ( error && error.errorList) {
                if ( error.errorList[0].errorCode == 'st-ml1era2103' ) {
                  Toast.fail(error.errorList[0].errorMessageList[0], 2, () => {
                    hashHistory.push('/')
                  })
                  return
                }
                if ( error.errorList[0].errorCode == 'st-mv0era7015' ) {
                  return json
                } 
                let lang = localStorage.getItem("language")
                // console.log(error,'errorerror')
                error.errorList.map((value) =>{
                    let str1 = errorListJson[value.errorCode] && errorListJson[value.errorCode][lang]
                    if(value.errorParamList) {
                      let replacestr1 = value.errorParamList[0]
                      let replacestr2 = value.errorParamList[1]
                      let Str1 = str1.replace(/\{0\}/g,replacestr1)
                      let newStr2 = Str1.replace(/\{1\}/g,replacestr2)
                      Toast.fail(newStr2)
                    } else {
                      Toast.fail(str1)
                    }
                })
              }
            }
          })
  }
  return res.then((res) => {
    return res.json()
  }).then((json) => {
    if ( json.statusCode == '0') {
      return json
    } else {
      return json
    }
  })
}

export default myFetch