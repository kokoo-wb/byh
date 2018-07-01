import React, { Component } from 'react'
import { Stepper } from 'antd-mobile'
import { messages } from 'component/trade'

export default class StringOffsetItem extends Component {
	state =  {
		num: this.props.num
	}
	onChange = (e) => {
		//console.log(e)
		this.setState({
			num: e
		}, () => {
			this.props.onChange(e)
		})
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
		//console.log(num, 'num')
		let name = this.props.formatMessage(messages.turnoveroffset)
	   return (
	   		<ul className="rt-offset-string">
	   		  <li className={`-item`}>
		        <span className="-wrap-left">
		          {name}
		        </span>
		        <div className="-wrap-price-right">
		          <Stepper
		            className="rt-order-stepper"
		            max={ present ? present.includes('JPY') ? 0.09 : 0.0009 : 0.09}
		            min={ present ? present.includes('JPY') ? 0.01 : 0.0001 : 0.01 }
		            onChange={this.onChange}
		            showNumber
		            value={this.state.num}
		            step={ present ? present.includes('JPY') ? 0.01 : 0.0001 : 0.01 }
		          />
		        </div>
		      </li>
	   		</ul>
	   	)
	}
}