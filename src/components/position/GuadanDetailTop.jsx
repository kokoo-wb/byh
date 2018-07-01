import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { helper } from '../utils'
import { messages } from './'

class GuadanDetailTop extends Component {
	static defaultProps = {
		data: {}
	}
	render() {
		const formatMessage = this.props.intl.formatMessage
		let ccy = JSON.parse(localStorage.ccy)[0] ? JSON.parse(localStorage.ccy)[0]['ccyPair'] : ''
		const { data } = this.props
		//console.log(data, 'data123456')
		// console.log(helper.splitString(ccy)[0],'1234556')
		let hand = '100,000'
		let defaultAmount = 100000
		if (data && data.ccyPair && data.ccyPair.includes('XAU')) {
			defaultAmount = 100
			hand = '100'
		}
		if (data && data.ccyPair && data.ccyPair.includes('XAG')) {
			defaultAmount = 5000
			hand = '5,000'
		}
		let ccyPairOne = '', ccyPairTwo= ''
		if (!helper.splitString(data != '{}' ? data.ccyPair : ccy)[0] || helper.splitString(data != '{}' ? data.ccyPair : ccy)[0] == 'undefined') {
			ccyPairOne = helper.splitString(ccy)[0]
			ccyPairTwo = helper.splitString(ccy)[1]
		} else {
			ccyPairOne = helper.splitString(data != '{}' ? data.ccyPair : ccy)[0]
			ccyPairTwo = helper.splitString(data != '{}' ? data.ccyPair : ccy)[1]
		}
    //console.log(data, typeof data,  ccy, 789)
		return (
			<div className="rt-position-detail-top">
			  <div className="-left">
			  	<span className="-one">
			  	  <FormattedMessage id="ordernumber"/>
			  	  {data ? data.orderNo : ''} 
			  	</span>
			  	<span className="-two">
					{
						data && data.ccyPair || ccy ? formatMessage(messages[ccyPairOne]) : ''
					}
						
						{/* <FormattedMessage id='undefined'/> */}
		            <span>/</span>
					{
						data && data.ccyPair || ccy ? formatMessage(messages[ccyPairTwo]) : ''
					}
		            
			  	</span>
			  </div>
			  <div className="-center -no-border-right">
			  	<div className="-one">
			  	  <div className={`-one-left ${data ? (data.bsCls == 0 ? '' : '-green') : ''}`}>
			  	  	<FormattedMessage id={data ? (data.bsCls == 0 ? 'sell' : 'buy') : 'sell'}/>
			  	  </div>
			  	  <div className="-one-right">{helper.accDiv(data ? data.orderAmt : defaultAmount, defaultAmount)}</div>
			  	</div>
			  	<div className="-two">
			  	  x {hand}<FormattedMessage id={helper.splitString(data ? data.ccyPair : ccy)[0]}/>
			  	</div>
			  </div>
			</div>
			)
	}
}

export default injectIntl(GuadanDetailTop)