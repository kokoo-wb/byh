import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon } from 'antd-mobile'
import Reflux from 'reflux'
import { AccountAction } from '../../actions'
import { AccountStore } from '../../stores'
import math from 'mathjs'
import { myFetch, config, helper } from 'component/utils'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')


class AccountBond extends Reflux.Component {
	constructor(props) {
	   super(props)
	   this.store = AccountStore
	}
	onAccountInfor = () => {
	     AccountAction.accountInfo()
	      this.setTimeout(() => {
	        this.onAccountInfor()
	      }, config.timeTick.account)
  	}
	componentDidMount() {
	   this.onAccountInfor();
	}

	isRate = (part, all) => {
		let result = 0
		//console.log(part, all)
		result = parseInt(math.chain(part)
						      .divide(Number(all))
						      .multiply(100)
						      .done())
		return result
	}
	render() {
		const data = this.state.accountData
		let rate = data ? this.isRate(data.marginAvailable,
	            	data.netEquity) : '0'
		let val = data ? math.chain(data.marginAvailable)
        	           .divide(Number(data.netEquity))
        	           .multiply(100)
        	           .done().toFixed(2) : 0
    val = isNaN(val) ? 0 : val
		//console.log(val, 'new')
		return (
			<div className="rt-bond">
	            <div className="-green">
	              <div className="-inner" style={{width: `${rate}%`}}>
	              {
	              	rate > 30 ? <span>
		                <FormattedMessage
		                  id='availableFunds'
		                />
		              {
		              	val
		              }%
		              </span> : null
	              }
	              	
		             </div>
		             {
	              	rate > 30 ? null : <span>
		                <FormattedMessage
		                  id='availableFunds'
		                />
		              {
		              	val
		              }%
		              </span>
	              }
	            </div>
	            <div
	            	className="-new"
	            	onClick={
              		() => {
              			hashHistory.push('/trade')
              		}
              	}
	            >
	              <Icon type={require('static/svg/m_new.svg')}/>
	              <span>
	                <FormattedMessage
	                  id='jiancang'
	                />
	              </span>
	            </div>
	         </div>
			)
	}
}

reactMixin(AccountBond.prototype, TimerMixin)

export default AccountBond