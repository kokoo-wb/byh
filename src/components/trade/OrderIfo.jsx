import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Button, Toast } from 'antd-mobile'
import { DirectionType, LimitOrStop, LimitStopAll, messages } from './'
import { ChoseButton } from 'component/position'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import { helper, config, myFetch } from '../utils'
import { hashHistory } from 'react-router'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class OrderIfo extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: 1,
      pric: 0,
      pric1: 0,
      pric2: 0,
      type: 3
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
  onShowPrice1 = (type) => {
    //console.log(this.state.pric, 'pric')
    let price = this.state.pric ? this.state.pric : this.onOrderPrice()
    let newprice, newDirection
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
    if (direction == 0) {
      newDirection = 1
    } else if (direction == 1) {
      newDirection = 0
    }
    let pips
    let result = parseFloat(helper.accDiv(3, length))
     if (newDirection == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (newDirection == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    if (this.state.direction == 0) {
      newprice = parseFloat(helper.accAdd(price, pips)).toFixed(fixed)
      //console.log(price, pips, newprice, 'sellPrice')
    } else if (this.state.direction == 1 ) {
      newprice = parseFloat(helper.accAdd(price, pips)).toFixed(fixed)
      //console.log(price, pips, newprice, 'buyPrice')
    }
    return newprice
  }
  onOrderPrice1 = (type) => {
    let price = this.onShowPrice1(type)
    let ccy = this.props.data.pair
    let length = 10000, newDirection
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
    if (direction == 0) {
      newDirection = 1
    } else if (direction == 1) {
      newDirection = 0
    }
    let pips
    let result = parseFloat(helper.accDiv(1, length))
     if (newDirection == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (newDirection == 1) {
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
  onTimesChange2 = (e) => {
    if (e === 'undefined') {
      return
    }
    this.setState({
      pric2: e
    })
  }
  onChangeDirection = (i) => {
  	if (i == this.state.direction) {
      return
    }
    this.setState({
      direction: i,
      pric: 0,
      pric1: 0,
      pric2: 0
    })
  }
  onChangeCondition = (i) => {
    this.setState({
      type: i,
      pric: 0,
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
        AMN1: helper.accMul(this.props.data.amn, defaultAmount),
        SKJ1: this.state.type,
        PRI1: this.state.pric ? this.state.pric : this.onOrderPrice(),
        YKK1: helper.requestTime(this.props.data.ykk),
        AMN2: helper.accMul(this.props.data.amn, defaultAmount),
        YKK2: helper.requestTime(this.props.data.ykk),
        PRI2: this.state.pric1 ? this.state.pric1 : this.onOrderPrice1(3),
        SKJ3: 4,
        PRI3: this.state.pric2 ? this.state.pric2 : this.onOrderPrice1(4),
        OFLG: 1
      })
    }
    myFetch(`${config.rootApi}/mOrderifo`, options, true)
     .then((rs) => {
        if (rs && rs.statusCode == '0') {
          Toast.hide()
          Toast.success(formatMessage(messages.ChangeBugPendingSuccess),1.2, () => {
            hashHistory.push('/trade')
          })
        }
     })
  }
  onChangeType = (i) => {
    this.setState({
      type: i
    })
  }
  onSwitchType = () => {
    let type = 3
    if (this.state.type == 3) {
      type = 4
    } else if (this.state.type == 4) {
      type = 3
    }
    return type
  }
  render() {
  	const { type, direction } = this.state
    //console.log(this.state.type, 'type')
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
            <div className="rt-order-title">
              <FormattedMessage id="copysetting"/>
              <FormattedMessage id="one"/>
            </div>
            <LimitOrStop
              defaultCon={3}
              showPrice={this.onShowPrice1(3)}
              orderPrice={this.onOrderPrice1(3)}
              onTimesChange={this.onTimesChange1}
              direction={direction == 1 ? 0 : 1}
              ccy={this.props.data.pair}
            />
            <div className="rt-order-title">
              <FormattedMessage id="copysetting"/>
              <FormattedMessage id="two"/>
            </div>
            <LimitOrStop
              defaultCon={4}
              showPrice={this.onShowPrice1(4)}
              orderPrice={this.onOrderPrice1(4)}
              onTimesChange={this.onTimesChange2}
              direction={direction == 1 ? 0 : 1}
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

reactMixin(OrderIfo.prototype, TimerMixin)

export default injectIntl(OrderIfo)