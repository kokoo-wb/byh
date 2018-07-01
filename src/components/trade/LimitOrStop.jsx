import React, { Component } from 'react'
import { Checkbox, Stepper } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { PriceItem } from './'
import { helper, config, myFetch } from '../utils'

export default class LimitOrStop extends Component { 
  state = {
    check : this.props.defaultdefaultCon !== undefined ? this.props.defaultType : true,
    price: this.props.orderPrice,
    flag: false,
    rangePrice: 0,
    step: 0.0001
  }
  changePrice = 0
  leftRight = 0
  componentWillReceiveProps(nextProps) {
    //console.log(this.props.ccy, 'ccy')
    if (this.props.ccy) {
      if (this.props.ccy.includes('JPY') || this.props.ccy.includes('XAU') || this.props.ccy.includes('XAG')) {
        this.setState({
          step: 0.01
        })
      } else {
        this.setState({
          step: 0.0001
        })
      }
    }
    

    // TODO: 止损加减阶梯
    
    if (nextProps.direction != this.props.direction ) {
      this.leftRight = 0
      this.setState({
        flag: false
      })
    }
    if (nextProps.ccy != this.props.ccy) {
      this.leftRight = 0
      this.setState({
        flag: false
      })
    }
    if (nextProps.visible !== undefined && nextProps.visible === false && nextProps.visible != this.props.visible) {
      this.leftRight = 0
      this.setState({
        flag: false
      })
    }
  }
  componentWillUnmount() {     
    this.leftRight = 0
 }
  onChangeStepper = (e) => {
    if (this.leftRight == 0) {
      this.leftRight = this.props.showPrice
      //console.log(123)
    }
    this.setState({
      flag: true,
      price: e
    }, () => {
      this.props.onTimesChange(this.state.price)
    })
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
  render() {
    const { orderPrice, direction, className, defaultCon} = this.props
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
               
               {this.onRangePrice(direction, defaultCon)}{this.leftRight == 0 ? this.props.showPrice : this.leftRight}
              </span>
            </span>
            <div className="-wrap-price-right">
              <Stepper
                className="rt-order-stepper"
                onChange={this.onChangeStepper}
                value={this.state.flag ? this.state.price : this.props.orderPrice}
                step={this.state.step}
                showNumber
              />
            </div>
          </div>
      </div>
      )
  }
}