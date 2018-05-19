import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Icon, Toast } from 'antd-mobile'
import config from './config'

const helper = {
  accSub(arg1,arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch(e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch(e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    // last modify by deeka
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    if (n > 20) {
      n = 20
    }
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  accMul(arg1,arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch(e) {}
    try {
      m += s2.split(".")[1].length
    } catch(e) {}

    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  //js 除法函数
  //调用：accDiv(arg1,arg2)
  //返回值：arg1除以arg2的精确结果
  accDiv(arg1, arg2){
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    var t1 = 0,
        t2 = 0,
        r1,
        r2
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch(e) {}
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch(e) {}

    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return this.accMul((r1 / r2), Math.pow(10, t2 - t1))
  },
  //加法函数，用来得到精确的加法结果
  //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  //调用：accAdd(arg1,arg2)
  //返回值：arg1加上arg2的精确结果
  accAdd(arg1, arg2) {
    arg1 = arg1 || 0
    arg2 = arg2 || 0
    var r1,r2,m;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch(e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch(e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  splitString(str) {
    if (typeof str != 'string') {
      str = String(str)
    }
    let arr = []
    arr = str.split('/')
    return arr
  },
  requestTime(str) {
    let num = 0
    if (str == 'dayvalid') {
      num = 1
    } else if (str == 'weekvalid') {
      num = 2
    } else if (str == 'validcancel') {
      num = 0 
    }
    return num
  },
  conrequestTime(num) {
    let str = 'validcancel'
    if (num == 1) {
      str = 'dayvalid'
    } else if (num == 2) {
      str = 'weekvalid'
    } else if (num == 0) {
      str = 'validcancel'
    }
    return str
  },
  onHandleStr(str, oldStr, length = 5) {
    //console.log(typeof str, str)
    //str = String(Number(str).toFixed(length))
    //console.log(old)
    str = str.slice(0, length)
    //console.log(str, 'str')
    if (typeof oldStr == 'number') {
      oldStr = String(oldStr)
    }
    oldStr = oldStr.split('.')[0]
    //console.log(str,1)
    let end = str.slice(-1)
    let endTwo = str.slice(-3,-1)
    let front = str.slice(0,-3)
    //console.log(endTwo)
    //console.log(front)
    return (
      <span>
        {oldStr+'.'+front}
        <strong>{endTwo}</strong>
        <sup>{end}</sup>
      </span>
    )
  },
  transform(str) {
    if (typeof str == 'number') {
      str = String(str)
    }
    let arr
    arr = str.split('.')[1]
    return arr
  },
  // 通用接口`promise`错误处理
  onPromiseError(err) {
    Toast.hide()
    console.error(`Got error ${err}`)

    ReactDOM.render(
      <div onClick={(e)=>location.href=config.root}>
        <Icon type="info-circle" /> &nbsp;
        似乎出现了问题，点击重新加载
      </div>,
      document.getElementById("errorNotice")
    )
  }
}

export default helper