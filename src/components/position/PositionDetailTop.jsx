import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { helper } from '../utils'

export default class PositionDetailTop extends Component {
	render() {
		const { data } = this.props
		let ccy = JSON.parse(localStorage.ccy)[0] ? JSON.parse(localStorage.ccy)[0]['ccyPair'] : ''
		let ccyPair = helper.splitString(data.ccypairCd)
		let hand = '100,000'
		let defaultAmount = 100000
		if (data.ccypairCd.includes('XAU')) {
			defaultAmount = 100
			hand = '100'
		}
		if (data.ccypairCd.includes('XAG')) {
			defaultAmount = 5000
			hand = '5,000'
		}
		//console.log(ccyPair)
		// console.log(ccyPair[0],ccyPair[1],'ccyPair[0]')
		return (
			<div className="rt-position-detail-top">
				  <div className="-left">
				  	<span className="-one">
				  	  <FormattedMessage id="ordernumber"/>
				  	  {data.orderNo} 
				  	</span>
				  	{
				  		ccyPair ? (
				  			<span className="-two">
						  		<FormattedMessage id={ccyPair[0]}/>
					            <span>/</span>
					            <FormattedMessage id={ccyPair[1]}/>
						  	</span>
				  			) : null
				  	}
				  	
				  </div>
				  <div className="-center">
				  	<div className="-one">
				  	  <div className={`-one-left ${data.bsCls == 0 ? '' : '-green'}`}>
				  	  	<FormattedMessage id={data.bsCls == 0 ? 'sell' : 'buy'}/>
				  	  </div>
				  	  <div className="-one-right">{helper.accDiv(helper.accSub(data.positionAmt, data.orderingAmt), defaultAmount)}</div>
				  	</div>
				  	<div className="-two">
				  	  x {hand}
				  	  {
				  	  	ccyPair ? 
				  	  	<FormattedMessage id={ccyPair[0]}/> : null
				  	  }
				  	</div>
				  </div>
				  <div className="-right">
				  	<FormattedMessage
				  	  id="profitpandploss"
				  	/>
				  	<div className="-two">{data.unSettledPl}</div>
				  </div>
				</div> 
		)
	}
}