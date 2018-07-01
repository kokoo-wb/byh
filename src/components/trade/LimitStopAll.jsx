import React, { Component } from 'react'
import { Radio, Stepper, Checkbox } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { PriceItem } from './'
import { helper, config, myFetch } from '../utils'
import math from 'mathjs'

export default class LimitStopAll extends Component {
  constructor(props) {
    super(props)
    this.now = 0
    this.flag = false
    this.leftRight = 0
  } 
  
  state = {
    value: 3,
    price: this.props.orderPrice,
    flag: false,
    rangePrice: 0,
    number: 0,
    val: this.props.orderPrice,
    step: 0.0001
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.ccy.includes('JPY') || this.props.ccy.includes('XAU') || this.props.ccy.includes('XAG')) {
      this.setState({
        step: 0.01
      })
    } else {
      this.setState({
        step: 0.0001
      })
    }

    // TODO: 止损加减阶梯

    if (nextProps.direction != this.props.direction ) {
      //console.log(2222)
      this.leftRight = 0
      this.flag = false
      this.setState({
        flag: false
      })
    }
    if (nextProps.ccy != this.props.ccy) {
      this.leftRight = 0
      this.flag = false
      this.setState({
        flag: false
      })
    }
  }
  onChangeStepper = (val) => {
    this.flag = true
    if (this.leftRight == 0) {
      this.leftRight = this.props.showPrice
      //console.log(123)
    }
    this.setState({
      val
    }, () => {
      this.props.onTimesChange(this.state.val)
    })
   }
   componentWillUnmount() {
      this.now = 0     
      this.leftRight = 0
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
   onValue = (type, direction) => {
      let max = Infinity
      let min = -Infinity
      let arr = []
      if (direction == 0) {
        if (type == 4) {
          max = 0
        } else if (type == 3) {
          min = 0
        }
      } else if (direction == 1) {
        if (type == 4) {
          min = 0
        } else if (type == 3) {
          max = 0
        }
      }
      arr.push(max, min)
      //console.log(arr, 'arr')
      return arr
  }
  onChange = (value) => {
    this.leftRight = 0
    console.log(this.leftRight)
    this.flag = false
    this.now = 0
    this.setState({
      value,
        rangePrice: 0,
        val: this.props.orderPrice
    }, () => {
      this.props.onChange(value)
    })
  }
  render() {
    const { orderPrice,direction, className } = this.props
    const data = [
      {value: 3, classname: '-left', label: 'limit'},
      {value: 4, classname: '-right', label: 'stop'}
    ]
    return (
      <div className="rt-limit-stop">
        <div className="-condirection-type">
          {
            data.map( i => {
              return (
                <div className={`${this.state.value === i.value ? i.classname + ' -active' : i.classname}` } key={i.value}>
                  <Checkbox
                    checked={this.state.value === i.value}
                    onChange={
                      () => {
                        this.onChange(i.value)
                      }
                    }
                  />
                  <FormattedMessage id={i.label}/>
                </div>
              )
            }) 
          }
        </div>
        <div className={`rt-price-item`}>
          <span className="-wrap-left">
            <FormattedMessage id="price"/>
            <span className="-price-range">
             {this.onRangePrice(direction, this.state.value)}{this.leftRight == 0 ? this.props.showPrice : this.leftRight}
            </span>
          </span>
        <div className="-wrap-price-right">
          <Stepper
            className="rt-order-stepper"
            value={this.flag ? this.state.val : this.props.orderPrice}
            step={this.state.step}
            onChange={this.onChangeStepper}
            showNumber
          />
        </div>
          </div>
      </div>
      )
  }
}