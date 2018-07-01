import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { helper } from '../utils'

function padRight(str,len=5 ){
  if (!str) {
    return ''
  }
  if (str.length >= len) {
    return str
  } else {
    return padRight(str+"0",len)
  }
}

export default class PriceNumberStyle extends Component {
  render() {
    let {number, length, className} = this.props
    return (
      <span>
        {helper.onHandleStr(padRight(helper.transform(number), length), number, length)}
      </span>
    )
  }
}

PriceNumberStyle.propTypes = {
  length : PropTypes.number
}