import React, { Component } from 'react'
import { Checkbox, Stepper } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { helper, config, myFetch } from '../utils'

export default class LimitOrStopPrice extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newprice: props.price,
			ccy: props.ccy
		}
		this.leftRight = 0
	}
	onChange = (e) => {
		//console.log(e, 'e')
		if (this.leftRight == 0) {
      this.leftRight = this.props.orderPrice
      //console.log(123)
    }
    
    	//console.log(1, this.state.newprice)
    	this.props.onChange(e)
	}
	componentWillUnmount() { 
      this.leftRight = 0
   }
	stepCcy = (ccy) => {

		let result = 0.0001
	   if (ccy) {
	   	 if (ccy.includes('JPY') || ccy.includes('XAU') || ccy.includes('XAG')) {
	   	 	//console.log(1)
	   	 	result = 0.01
	   	 } else {
	   	 	result = 0.0001
	   	 }
	   }
	   return result
	}
	onRangePrice = (direction, type) => {
      let result
      if (direction == 0) {
        if (type == 4) {
          result = '<'
        } else if (type == 3) {
          result = '>'
        }
      } else if (direction == 1) {
        if (type == 4) {
          result = '>'
        } else if (type == 3) {
          result = '<'
        }
      }
      return result
   }
	render() {
		const { price, className, defaultCon } = this.props
		//console.log(price, 'price')
		return (
			<div className={`rt-limit-stop ${className} ? ${className} : ''`}>
				<div className="-condirection-type">
					<div className={`-left -active -ratio`}>
						<Checkbox
						  checked={true}
						  disabled={true}
						/>
						<FormattedMessage id={`${defaultCon == 3 ? 'limit' : 'stop'}`}/>
					</div>
				</div>
				<div className={`rt-price-item`}>
		          <span className="-wrap-left">
		          	  <FormattedMessage id="price"/>
		          	  <span className="-price-range">
			             {this.onRangePrice(this.props.direction, defaultCon)}{this.leftRight == 0 ? this.props.orderPrice : this.leftRight}
			            </span>
		          </span>
		          <div className="-wrap-price-right">
			         <Stepper
			            className="rt-order-stepper"
			            onChange={this.onChange}
			            value={this.props.price}
			            step={this.stepCcy(this.state.ccy)}
			            showNumber
			         />
			      </div>
		      </div>
			</div>
			)
	}
}