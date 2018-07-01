import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Stepper } from 'antd-mobile'

export default class OffsetItem extends Component {
	onChange = (e) => {
		this.props.onChange(e)
	}
	componentWillReceiveProps(nextProps) {
	 	if (nextProps.present != this.props.present) {
	 		this.setState({
	 			present: nextProps.present
	 		})
	 	}     
	}
	render() {
		const { num, present } = this.props
		//console.log(present, 2)
	   return (
	   		<ul className="rt-order-common">
	   		  <li className={`-item`}>
		        <span className="-wrap-left">
		          <FormattedMessage id="turnoveroffset"/>
		        </span>
		        <div className="-wrap-price-right">
		          <Stepper
		            className="rt-order-stepper"
		            max={ present ? present.includes('JPY') ? 0.09 : 0.0009 : 0.09}
		            min={ present ? present.includes('JPY') ? 0.01 : 0.0001 : 0.01 }
		            onChange={this.onChange}
		            showNumber
		            value={num}
		            step={ present ? present.includes('JPY') ? 0.01 : 0.0001 : 0.01 }
		          />
		        </div>
		      </li>
	   		</ul>
	   	)
	}
}