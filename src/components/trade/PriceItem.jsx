import React, { Component } from 'react'
import { Radio, Stepper, Checkbox } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { helper, config, myFetch } from '../utils'

export default class PriceItem extends Component {
	state = {
		value: 3,
		price: this.props.orderPrice,
    	flag: false,
    	rangePrice: 0,
    	number: 0
	}
	changePrice = 0
	  componentWillReceiveProps(nextProps) {
	    if (nextProps.direction != this.props.direction ) {
	      this.setState({
	        flag: false
	      })
	    }
	  }
	onChangeStepper = (e) => {
	    /*let len = 5
	    let num = 0
	    let digit = 0
	    if (this.props.ccy.includes('JPY')) {
	      len = 3
	    }
	    if (len == 5) {
	      num = helper.accDiv(e, 10000)
	      digit = 5
	    } else if (len == 3) {
	      num = helper.accDiv(e, 100)
	      digit = 3
	    }
	    if (this.state.flag) {
	      if (!this.changePrice) {
	         this.changePrice = this.props.orderPrice
	      }
	      this.setState({
	        price: Number(helper.accAdd(this.changePrice, num).toFixed(digit)),
	        rangePrice: this.changePrice,
	        flag: true
	      }, () => {
           this.changePrice = this.state.price
	        this.props.onTimesChange(this.state.price)
	      })
	    } else {
	      this.setState({
	        price: Number(helper.accAdd(this.props.orderPrice, num).toFixed(digit)),
	        rangePrice: this.props.orderPrice,
	        flag: true
	      }, () => {
	        this.changePrice = this.props.orderPrice
	        this.props.onTimesChange(this.state.price)
	      })
	    }*/
	    console.log(e)
	 }
	render() {
		const { orderPrice,direction, className } = this.props
		return (
			<div>
				<div className={`rt-price-item`}>
		          <span className="-wrap-left">
		          	  <FormattedMessage id="price"/>
		          <span className="-price-range">
		           {this.props.orderPrice}
		          </span>
		        </span>
		        <div className="-wrap-price-right">
		          <Stepper
		            className="rt-order-stepper"
		            showNumber
		            step={0.0001}
		            onChange={this.onChangeStepper}
		            value={this.state.flag ? this.state.price : this.props.orderPrice}
		            
		          />
		        </div>
		      </div>
			</div>
			)
	}
}