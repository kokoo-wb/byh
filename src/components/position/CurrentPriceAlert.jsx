import React, { Component } from 'react'
import { messages } from 'component/trade'
import { config, myFetch, helper } from '../utils'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

 class CurrentPriceAlert extends Reflux.Component {
	constructor(props) {
	    super(props)
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
	onTimerPrice = (name,num) => {
	     PriceAction.changePrice(name, num, this.priceCallback())
	      this.time1 = this.setTimeout(() => {
	        this.onTimerPrice(name, num)
	      }, config.timeTick.price)
	}
	componentWillReceiveProps(nextProps) {
		//console.log(456)
	  if (nexProps.data.ccypairCd != this.props.data.ccypairCd) {
	  	if (this.time1) {
	  		//console.log('time')
				clearTimeout(this.time1)
			}
	  }     
	}
	componentDidMount() {
		this.setState({
			sellPrice: 0,
			buyPrice: 0
		})
		this.onTimerPrice(this.props.data.ccypairCd, this.props.data.positionAmt)
		
	}
	render() {
		//console.log(this.state.sellPrice, this.state.buyPrice, 'new')
		const { data } = this.props
		let buy = this.props.formatMessage(messages.buy)
        let sell = this.props.formatMessage(messages.sell)
        let sellPrice = this.state ? this.state.sellPrice : 0
        let buyPrice = this.state ? this.state.buyPrice : 0
     console.log(sellPrice, buyPrice, 123)
		return (
			<div className="rt-now-price">
	        <span className={`${data.bsCls == 0 ? '-left' : '-left -green'}`}>{
	          data.bsCls == 0 ? sell : buy
	        }</span>
	        <span>
	          {this.props.formatMessage(messages.currentPrice)}:
	          <strong>{data.bsCls == 0 ? sellPrice: buyPrice}</strong>
	        </span>
	      </div>
			)
	}
}

reactMixin(CurrentPriceAlert.prototype, TimerMixin)

export default CurrentPriceAlert