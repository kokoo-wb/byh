import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'
import { DirectionType, LimitStopAll, LimitOrStop, messages } from './'
import { ChoseButton } from 'component/position'
import { helper, myFetch, config } from '../utils'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class OrderDirect extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 3,
      direction: 1,
      pric: 0
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

  onChangeDirection = (i) => {
    this.setState({
      direction: i,
      pric: 0
    })
  }
  onShowPrice = () => {
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
    let { direction, type } = this.state
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
  onOrderPrice = () => {
    let price = this.onShowPrice()
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
    let { direction, type } = this.state
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
  onChangeCondition = (e) => {
    //console.log(e, '000')
    this.setState({
      type: e,
      pric: 0
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
        PRIC: this.state.pric ? this.state.pric : this.onOrderPrice(),
        SKJK: this.state.type,
        OFLG: 1
      })
    }
    myFetch(`${config.rootApi}/mOrderdirect`, options, true)
     .then((rs) => {
        if (rs && rs.statusCode == '0') {
          Toast.hide()
          Toast.success(formatMessage(messages.ChangeBugPendingSuccess), 1.2, () => {
            hashHistory.push('/trade')
          })
        }
     })
  }
  render() {
    const { type, direction } = this.state
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
            <LimitStopAll
              onChange={this.onChangeCondition}
              showPrice={this.onShowPrice()}
              orderPrice={this.onOrderPrice()}
              onTimesChange={this.onTimesChange}
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

reactMixin(OrderDirect.prototype, TimerMixin)

export default injectIntl(OrderDirect)