import React, { Component } from 'react'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import { MarketShowItem } from './'
import { helper, myFetch, config } from '../utils'


let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class ChartsShowItem extends Reflux.Component {
  constructor(props) {
    super(props)
    this.store = PriceStore
    this.storeKeys = ['sellPrice', 'buyPrice', 'highPrice', 'lowPrice', 'openPrice', 'changePriceBid']
  }
  async priceCallback() {
    const options = {
      method: 'POST'
    }
    const result = myFetch(`${config.rootApi}/mRatelist`, options, true)
    return result
  }
  onTimerPrice = () => {
     PriceAction.changePrice(this.props.pair, 0, this.priceCallback())
      this.setTimeout(() => {
        this.onTimerPrice()
      }, config.timeTick.price)
  }
  componentDidMount() {
    this.onTimerPrice();
  }
  render() {
  	let changeDiv = helper.accDiv(this.state.changePriceBid, this.state.sellPrice)
    let diffRate = helper.accMul(helper.accSub(changeDiv, this.state.changePriceBid), 100).toFixed(2)
  	return (
  		<div className="rt-charts-show">
  			<MarketShowItem
	          highPrice={this.state.highPrice}
	          lowPrice={this.state.lowPrice}
	          diffPrice={helper.accSub(this.state.sellPrice, this.state.openPrice)}
	          diffRatePrice={diffRate}
	        />
  		</div>
  		)
  }
}

reactMixin(ChartsShowItem.prototype, TimerMixin)

export default ChartsShowItem