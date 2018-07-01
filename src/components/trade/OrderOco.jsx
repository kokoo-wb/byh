import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Button, Toast } from 'antd-mobile'
import { DirectionType, LimitOrStop, messages } from './'
import { ChoseButton } from 'component/position'
import { helper, config, myFetch } from '../utils'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import { hashHistory } from 'react-router'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class OrderOce extends Reflux.Component {
    constructor(props) {
    super(props)
    this.state = {
      direction: 1,
      pric: 0, 
      pric1: 0,
    }
    this.store = PriceStore
    this.storeKeys = ['sellPrice', 'buyPrice']
  }

  async priceCallback() {
    const options = {
      method: 'POST'
    }
    const result = myFetch(`${config.rootApi}/mRatelist`, options, true)
    return result
  }
  onTimerPrice = () => {
    let defaultAmount = 100000
    if (this.props.data.pair.includes('XAU')) {
      defaultAmount = 100
    }
    if (this.props.data.pair.includes('XAG')) {
      defaultAmount = 5000
    }
     PriceAction.changePrice(this.props.data.pair, helper.accMul(this.props.data.amn, defaultAmount), this.priceCallback())
      this.setTimeout(() => {
        this.onTimerPrice()
      }, config.timeTick.price)
  }
  componentDidMount() {
    this.onTimerPrice();
  }
  onShowPrice = (type) => {
    let ccy = this.props.data.pair
    let length = 10000
    let fixed = 5
    if (ccy.includes('JPY')) {
      length = 100
      fixed = 3
    }
    if (ccy.includes('XAU')) {
      length = 100
      fixed = 3
    }
    if (ccy.includes('XAG')) {
      length = 100
      fixed = 3
    }
    let { direction } = this.state
    let pips
    let result = parseFloat(helper.accDiv(3, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    let orderPrice 
    if (this.state.direction == 0) {
      orderPrice = parseFloat(helper.accAdd(this.state.sellPrice, pips)).toFixed(fixed)
      //console.log(this.state.sellPrice, pips, orderPrice, 'sellPrice')
    } else if (this.state.direction == 1 ) {
      orderPrice = parseFloat(helper.accAdd(this.state.buyPrice, pips)).toFixed(fixed)
      //console.log(this.state.buyPrice, pips, orderPrice, 'buyPrice')
    }
    return orderPrice
  }

  onOrderPrice = (type) => {
    let price = this.onShowPrice(type)
    let ccy = this.props.data.pair
    let length = 10000
    let fixed = 5, strSlice = 4
    if (ccy.includes('JPY')) {
      length = 100
      fixed = 3
      strSlice = 2
    }
    if (ccy.includes('XAU')) {
      length = 100
      fixed = 3
      strSlice = 2
    }
    if (ccy.includes('XAG')) {
      length = 100
      fixed = 3
      strSlice = 2
    }
    price = parseFloat(price).toFixed(fixed)
    price = price.slice(0, -1)
    //console.log(price, 'price')
    let { direction } = this.state
    let pips
    let result = parseFloat(helper.accDiv(1, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    let orderPrice
    orderPrice = parseFloat(helper.accAdd(price, pips)).toFixed(strSlice)
    return orderPrice
  }
  onTimesChange = (e) => {
    if (e === 'undefined') {
      return
    }
    this.setState({
      pric: e
    })
  }
  onTimesChange1 = (e) => {
    if (e === 'undefined') {
      return
    }
    this.setState({
      pric1: e
    })
  }
  onChangeDirection = (i) => {
    this.setState({
      direction: i,
      pric: 0,
      pric1: 0
    })
  }
  onResetClick = () => {
    hashHistory.push('/trade/order')
  }
  onConfirmClick = () => {
    const formatMessage = this.props.intl.formatMessage
    Toast.loading(formatMessage(messages.submitting), 10, () => {
      Toast.fail(formatMessage(messages.submitFaild))
    })
    let defaultAmount = 100000
    if (this.props.data.pair.includes('XAU')) {
      defaultAmount = 100
    }
    if (this.props.data.pair.includes('XAG')) {
      defaultAmount = 5000
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PAIR: this.props.data.pair,
        BSKB: this.state.direction,
        AMNT: helper.accMul(this.props.data.amn, defaultAmount),
        YKKB: helper.requestTime(this.props.data.ykk),
        PRI1: this.state.pric ? this.state.pric : this.onOrderPrice(3),
        PRI2: this.state.pric1 ? this.state.pric1 : this.onOrderPrice(4),
        SKJ2: 4,
        OFLG: 1
      })
    }
    myFetch(`${config.rootApi}/mOrderoco`, options, true)
     .then((rs) => {
      if (rs && rs.statusCode == '0') {
          Toast.fail()
          Toast.success(formatMessage(messages.ChangeBugPendingSuccess), 1.2, () => {
            hashHistory.push('/trade')
          })
        }
     })
  }
  render() {
    const { direction } = this.state
    return (
      <div className="rt-order-ifo">
        <div className="rt-padding-24">
          <div className="rt-order-title">
            <FormattedMessage id="trade1"/>
            <FormattedMessage id="direction"/>
          </div>
          <DirectionType
            onChange={this.onChangeDirection}
          />
        </div>
        <div className="rt-height22 -background"></div>
          <div className="rt-padding-24">
            <div className="rt-order-title">
              <FormattedMessage id="mainsetting"/>
            </div>
            <LimitOrStop
              defaultCon={3}
              showPrice={this.onShowPrice(3)}
              orderPrice={this.onOrderPrice(3)}
              onTimesChange={this.onTimesChange}
              direction={direction}
              ccy={this.props.data.pair}
            />
            <div className="rt-order-title">
              <FormattedMessage id="copysetting"/>
            </div>
            <LimitOrStop
              defaultCon={4}
              showPrice={this.onShowPrice(4)}
              orderPrice={this.onOrderPrice(4)}
              onTimesChange={this.onTimesChange1}
              direction={direction}
              ccy={this.props.data.pair}
            />
          <ChoseButton
            onResetClick={
              this.onResetClick
            }
            onConfirmClick={
              this.onConfirmClick
            }
          />
          </div>
      </div>
    )
  }
}

reactMixin(OrderOce.prototype, TimerMixin)

export default injectIntl(OrderOce)