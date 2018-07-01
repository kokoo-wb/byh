import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'
import { helper } from '../utils'

function padRight(str,len=5 ){
  //console.log(len, 'len123')
  if (!str) {
    return ''
  }
  if (str.length >= len) {
    return str
  } else {
    return padRight(str+"0",len)
  }
}

export default class MarketBtnItem extends Component {
  state = {
    bgSell: '',
    bgBuy: ''
  }
	onSpread = (sellPrice, buyPrice, present) => {

    let length = 10000
    if (present.includes('JPY')) {
      length = 100
    }
    if (present.includes('XAU')) {
      length = 1
    }
    if (present.includes('XAG')) {
      length = 100
    }
    let result
    result = Math.abs(helper.accMul(helper.accSub(sellPrice, buyPrice), length))
    //console.log(result, 'result')
    return parseFloat(result).toFixed(1)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sellPrice < this.props.sellPrice) {
      this.setState({
        bgSell : '-red'
      })
    } else if (nextProps.sellPrice > this.props.sellPrice) {
      this.setState({
        bgSell : '-green'
      })
    }
    if (nextProps.buyPrice < this.props.buyPrice) {
      this.setState({
        bgBuy : '-red'
      })
    } else if (nextProps.buyPrice > this.props.buyPrice) {
      this.setState({
        bgBuy: '-green'
      })
    }
  }
	render() {
		const { sellPrice, buyPrice, askPriceVar, bidPriceVar, present } = this.props
    const { bgSell, bgBuy } = this.state
		//console.log(present, 'present')
    let len = 5
    if (present.includes('JPY')) {
      len = 3
    }
    if (present.includes('XAU')) {
      len = 3
    }
    if (present.includes('XAG')) {
      len = 3
    }
    //console.log(len, 'len')
		return (
			<div className="rt-market-btn">
				<div
					className="-left"
					onClick={
						() => {
							this.props.onClick(0)
						}
					}
				>
					<span className="-left-icon">
						
            {
              bgSell == '-red' ? <Icon type={require('static/svg/icon_42.svg')}/> : bgSell == '-green' ? <Icon type={require('static/svg/icon_40.svg')}/> :
               <Icon type={require('static/svg/icon_41.svg')}/>
            }
					</span>
          <span className={`-left-top ${bgSell == '-red' ? '-red' : bgSell == '-green' ? '-green' : ''}`}>
            <FormattedMessage id="sell"/>
            {/* <span className="-padding">/</span>
            <span>SELL</span> */}
          </span>
					<span className={`-left-red ${bgSell == '-red' ? '-red-dark' : bgSell == '-green' ? '-green-dark' : ''}`}>
						{helper.onHandleStr(padRight(helper.transform(String(sellPrice)), len), String(sellPrice), len)}
					</span>
				</div>
				<div className="-center">
					{this.onSpread(sellPrice, buyPrice, present)}
				</div>
				<div
					className="-right"
					onClick={
						() => {
							this.props.onClick(1)
						}
					}
				>
					<span className="-right-icon"> 
						{
              bgBuy == '-red' ? <Icon type={require('static/svg/icon_42.svg')}/> : bgBuy == '-green' ? <Icon type={require('static/svg/icon_40.svg')}/> :
               <Icon type={require('static/svg/icon_41.svg')}/>
            }
					</span>
          <span className={`-right-top ${bgBuy == '-red' ? '-red' : bgBuy == '-green' ? '-green' : ''}`}>
            <FormattedMessage id="buy"/>
            {/* <span className="-padding">/</span>
            <span>BUY</span> */}
          </span>
					<span className={`-right-green ${bgBuy == '-red' ? '-red-dark' : bgBuy == '-green' ? '-green-dark' : ''}`}>
						{helper.onHandleStr(padRight(helper.transform(String(buyPrice)), len), String(buyPrice), len)}
					</span>
				</div>
			</div>
			)
	}
}