import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class MarketNameItem extends Component {
	render() {
		return (
			<div className="rt-market-name">
				{/*<div className="-left">
					<FormattedMessage id="sell"/>
					<span className="-padding">/</span>
					<span>Sell</span>
				</div>*/}
				<div className="-center">
					<FormattedMessage id="spread"/>
				</div>
				{/*<div className="-right">
					<FormattedMessage id="buy"/>
					<span className="-padding">/</span>
					<span>Buy</span>
				</div>*/}
			</div>
			)
	}
}