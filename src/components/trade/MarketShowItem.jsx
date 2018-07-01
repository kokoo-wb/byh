import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

export default class MarketShowItem extends Component {
	render() {
		const { highPrice, lowPrice, diffPrice, diffRatePrice } = this.props
		return (
			<div className="rt-float">
	          <div>
	            <span className={`rt-lost ${diffRatePrice >= 0 ? '-active' : ''}`}>{diffPrice}</span>
	            <span className={`rt-losepersent ${diffRatePrice >= 0 ? '-active' : ''}`}>{diffRatePrice}%</span>
	          </div>
	          <div>
	              <span className="rt-low">
	                  <FormattedMessage
	                  id='low'
	                />：
	                <em>{lowPrice}</em>
	            </span>
	              <span className="rt-high">
	                <FormattedMessage
	                  id='high'
	                />：
	                <em>{highPrice}</em>
	              </span>
	          </div>
	        </div>
			)
	}
}
