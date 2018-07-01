import React, { Component } from 'react'
import { FormattedMessage } from 'react-Intl'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import { helper, myFetch, config } from '../utils'
import { Icon } from 'antd-mobile'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class DataTitle extends Reflux.Component {
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
  	let diffPrice = helper.accSub(this.state.sellPrice, this.state.openPrice)
  	let changeDiv = helper.accDiv(this.state.changePriceBid, this.state.sellPrice)
    let diffRate = helper.accMul(helper.accSub(changeDiv, this.state.changePriceBid), 100).toFixed(2)
  	return (
  		<div>
  			<div className="rt-tody">
	          <div>
	            <FormattedMessage
	              id='today'
	            />
	          </div>
	          <div>
	            <span>
	              <div className={`${diffRate >= 0 ? '-active' : ''}`}>{diffRate}%</div>
	            </span>
	            <span className={`${diffRate >= 0 ? 'rt-rotate' : 'rt-triggle'}`}>
	              <Icon type={require('static/svg/icon_54.svg')}/>
	            </span>
	            <span className={`${diffRate >= 0 ? '-active' : ''}`}>{this.state.sellPrice}</span>
	          </div>
	        </div>    
	        <div className="daybox">
	            <div className="-hight-box">
	              <div>
	                <FormattedMessage
	                  id='minimum'
	                />
	              ：<span className="-number">{this.state.lowPrice}</span></div>
	              <div>
	                <FormattedMessage
	                  id='highest'
	                />
	              ：<span className="-number">{this.state.highPrice}</span></div>
	            </div>
	            <div className="-line">
	              <div className="float" style={{left:'60%'}}></div>
	              <div></div>
	            </div>
	        </div>
	        <div className="daybox">
	            <div className="-sell-box">
	              <div>
	                <FormattedMessage
	                  id='seller'
	                />
	              ：<span className="-number">26%</span></div>
	              <div>
	                <FormattedMessage
	                  id='buyers'
	                />
	              ：<span className="-number">74%</span></div>
	            </div>
	            <div className="-line-two">
	              <div className="-freen">
	                <div className="-red" style={{width:'40%'}}></div>
	              </div>
	              
	            </div>
	        </div>
  		</div>
  		)
  }
}

reactMixin(DataTitle.prototype, TimerMixin)

export default DataTitle