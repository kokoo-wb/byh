import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { helper } from '../utils'
import { messages } from 'component/trade'
import math from 'mathjs'


export default class GoodAndNum extends Component {
	render() {
		const { data } = this.props
		console.log(data)
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
		let one = messages[helper.splitString(data.ccypairCd)[0]]
    	let two = messages[helper.splitString(data.ccypairCd)[1]]
    	const num = math.chain(data.positionAmt)
								.divide(defaultAmount)
								.done()
		return (
			<div className="rt-good-num-alert">
				<div className="-left">
			        <span>{this.props.formatMessage(messages.goods)}</span>
					<span className="-goods">{this.props.formatMessage(one) + '/' + this.props.formatMessage(two)}</span>
				</div>
				<div className="-right">
					<span>{this.props.formatMessage(messages.num)}</span>
					<span className="-num">
						{num}
					</span>
					<span>
						x {hand}{this.props.formatMessage(one)}
					</span>
				</div>
			</div>
			)
	}
}