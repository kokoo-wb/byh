import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Icon, Modal, Toast, Popup } from 'antd-mobile'
import { PriceNumberStyle } from '../common'
import { ChartSimpleWrap, SelectGoodsAndNum, messages, TradeMarketSure } from './'
import { helper, myFetch, config } from '../utils'
import { hashHistory } from 'react-router'
import math from 'mathjs'
import { messageString } from 'component/user'

const alert = Modal.alert

class PositionDirection extends Component {
  render() {
    const { className, bsCls, data } = this.props
    //console.log(data, 'data')
    return (
      <div className="rt-position-direction">
        <div className={`-left ${className} ? ${className} : ''`}>
          {this.props.formatMessage(messages[this.props.direction])}
        </div>
        <div>
          {this.props.formatMessage(messages['currentPrice'])}
          :
          <span className="-price">{this.props.price}元</span>
        </div>
      </div>
    )
  }
}

class CcyPairItem extends Component {
  onShowChart = (e,i) => {
    const { ccyPair } = this.props.val
    let chart = e.currentTarget.dataset.chart
    let comp = null
    let onOff = false
    if (onOff == this.state.flag) {
      comp = <div className="rt-chart-inner-wrap" style={{'height': '400px'}}>
        <Icon type="loading"/>
        <ChartSimpleWrap PAIR={ccyPair}/>
      </div>
      onOff = true
    }
    if (chart == this.state.selected) {
      chart = '-1'
      comp = null
    }
    this.setState({
      selected: chart,
      flag: onOff
    })
    this.addElement = comp
  }
  state = {
    bgSell: '-grey',
    bgBuy: '-grey',
    selected: '-1',
    flag: false,
    chartShow: true,
    value: 40
  }
  addElement = null
  length= 5
  componentWillReceiveProps(nextProps) {
    if (nextProps.val.bidPriceVar < this.props.val.bidPriceVar) {
      this.setState({
        bgSell : '-red'
      })
    } else if (nextProps.val.bidPriceVar > this.props.val.bidPriceVar) {
      this.setState({
        bgSell : ''
      })
    }
    if (nextProps.val.askPriceVar < this.props.val.askPriceVar) {
      this.setState({
        bgBuy : '-red'
      })
    } else if (nextProps.val.askPriceVar > this.props.val.askPriceVar) {
      this.setState({
        bgBuy: ''
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.val == this.props.val && nextState.selected == this.state.selected && nextState.flag == this.state.flag && nextProps.chartShow == this.props.chartShow ) {
      return false
    }
    return true
  }
  componentDidMount() {
    const { val } = this.props
    if (val.ccyPair.includes('JPY')) {
      this.length = 3
    }
    if (val.ccyPair.includes('XAU')) {
      this.length = 3
    }
    if (val.ccyPair.includes('XAG')) {
      this.length = 3
    }
    //console.log(val, val.ccyPair, this.length, 'val')
  }
  onGetPrice = (data, bsCls, number = 100) => {
    //console.log(data, bsCls, number)
		let defaultAmount = 100000
		if (data.ccyPair.includes('XAU')) {
			defaultAmount = 100
		}
		if (data.ccyPair.includes('XAG')) {
			defaultAmount = 5000
		}
    number = math.chain(number)
                 .multiply(defaultAmount)
                .done()
    
    let init = JSON.parse(localStorage.init)

    let initfilter = []
    let sellPrice, buyPrice
    initfilter = init.filter((value, index) => {
      return value.ccyPair == data.ccyPair
    })
    let ladderarr = initfilter[0].dataInfoLadder.dataListLadders
    //console.log(ladderarr)
    let newladder = ladderarr.filter((val, index) => {
      if (number >= val.orderAmtLower && number <= val.orderAmtUpper ) {
        return true
      }
    })
    //console.log(newladder, 'new')
    let ladderSpreadBid = newladder[0].ladderSpreadBid
    let ladderSpreadAsk = newladder[0].ladderSpreadAsk
    if (newladder[0].fixFlag == 1) {
      sellPrice = math.chain(parseFloat(data.bidPriceFix))
              .subtract(parseFloat(initfilter[0].markupValueBid))
              .subtract(parseFloat(ladderSpreadBid))
              .done()
      buyPrice = math.chain(parseFloat(ladderSpreadAsk))
               .add(parseFloat(initfilter[0].markupValueAsk))
               .add(parseFloat(data.askPriceFix))
               .done()
      } else if (newladder[0].fixFlag == 2) {
    sellPrice = math.chain(parseFloat(data.bidPriceVar)).subtract(parseFloat(initfilter[0].markupValueBid)).subtract(parseFloat(ladderSpreadBid))
            .done()
    buyPrice = math.chain(parseFloat(ladderSpreadAsk))
             .add(parseFloat(initfilter[0].markupValueAsk))
             .add(parseFloat(data.askPriceVar))
             .done()
      }
      if (this.length == 3) {
        sellPrice = sellPrice.toFixed(3)
        buyPrice = buyPrice.toFixed(3)
      } else if (this.length == 5) {
        sellPrice = sellPrice.toFixed(5)
        buyPrice = buyPrice.toFixed(5)
      }
    if (bsCls == 0) {
      return sellPrice
    } else {
      return buyPrice
    }
  }
  onBuyClick = (val, bsCls) => {
    //console.log(this.props.intl.formatMessage)
    //console.log(val, 1)
    let Confirm = this.props.intl.formatMessage(messageString.Confirm)
    let filled = this.props.intl.formatMessage(messageString.filled)
    let LoadingLoad = this.props.intl.formatMessage(messageString.LoadingLoad)
    let Loadfailed = this.props.intl.formatMessage(messageString.Loadfailed)
    let checkoutsuccess = this.props.intl.formatMessage(messageString.checkoutsuccess)
    


    const goods = this.props.intl.formatMessage(messages.goods)
    const num = this.props.intl.formatMessage(messages.num)
    const str = this.props.intl.formatMessage(messages.alertName)
    let one = messages[helper.splitString(val.ccyPair)[0]]
    let two = messages[helper.splitString(val.ccyPair)[1]]
    let present = this.props.intl.formatMessage(one) + '/' + this.props.intl.formatMessage(two)
    let title = <span>{str}</span>
    let data = JSON.parse(localStorage.ccy)
    let defaultAmount = 100000
    data = data.map((val, index) => {
      let result = {}
      let one = messages[helper.splitString(val.ccyPair)[0]]
      let two = messages[helper.splitString(val.ccyPair)[1]]
      result.name = this.props.intl.formatMessage(one) + '/' + this.props.intl.formatMessage(two)
      result.ccyPair = val.ccyPair
      return result
    })
    let hand = '100,000'
    if (val.ccyPair.includes('XAU')) {
      hand = '100'
      defaultAmount = 100
    }
    if (val.ccyPair.includes('XAG')) {
      hand = '5,000'
      defaultAmount = 5000
    }
    alert(title, 
      <div>
        <div className="rt-quicktrade-item">
          <div className="-left">
            <span>{goods}</span>
            <span>{present}</span>
          </div>
          <div className="-right">
            <span>{num}</span>
            <span>{parseFloat(localStorage.volumn) || 0.1}</span>
            <span className="-font">{`x ${hand} ${this.props.intl.formatMessage(one)}`}</span>
          </div>
        </div>
        <PositionDirection
          direction={bsCls == 0 ? 'sell' : 'buy'}
          formatMessage={this.props.intl.formatMessage}
          val={bsCls}
          className={bsCls == 1 ? '-green' : ''}
          price={this.onGetPrice(val, bsCls, parseFloat(localStorage.volumn) || 0.1)}
        />
      </div>, [
      { text: filled, onPress: () => console.log('cancel') },
      { text: Confirm, onPress: () => new Promise((resolve) => {
        Toast.loading(LoadingLoad, 10, () => {
          Toast.fail(Loadfailed)
        })
        const options = {
            method: 'POST',
            body: JSON.stringify({
              OFLG: 1,
              PAIR: val.ccyPair,
              BSKB: bsCls,
              AMNT: helper.accMul((parseFloat(localStorage.volumn)|| 0.1), defaultAmount),
              SKJK: 1,
            })
          }
          myFetch(`${config.rootApi}/mOrdermarket`, options, true)
                .then((rs) => {
                  if (rs) {
                    Toast.hide()
                    Toast.success(checkoutsuccess, 1.2, () => {
          //console.log(123)
                    resolve()
                    Popup.show(<TradeMarketSure
                     formatMessage={this.props.intl.formatMessage}
                     time={rs.execDt}
                     price={rs.execPrice}
                     onClose={() => Popup.hide()}
                    />, { animationType: 'slide-up', maskClosable: false, maskStyle: {display: 'none'}, className: "rt-market-sure" });
                    setTimeout(() => {Popup.hide()}, 5000)
                  })
                  }
                })
            })
        }
    ])
  }
  onPositionConfirm = (val, bsCls, resolve) => {
  
  }
  onSpread = (val) => {
    let sell = helper.accSub(val.bidPriceFix, val.markupValueBid)
    let buy = helper.accAdd(val.markupValueAsk, val.askPriceFix)
    let length = 10000
    if (val.ccyPair.includes('JPY')) {
      length = 100
    }
    if (val.ccyPair.includes('XAU')) {
      length = 1
    }
    if (val.ccyPair.includes('XAG')) {
      length = 100
    }
    let result
    result = Math.abs(helper.accMul(helper.accSub(sell, buy), length))
    //console.log(result, 'result')
    return parseFloat(result).toFixed(1)
  }
  render() {
    const { val, index } = this.props
    let len = 5
    if (val.ccyPair.includes('JPY')) {
      len = 3
    }
    if (val.ccyPair.includes('XAU')) {
      len = 3
    }
    if (val.ccyPair.includes('XAG')) {
      len = 3
    }
     //console.log(val, 'val')
    const { bgSell, bgBuy } = this.state
    return (
      <div className="rt-item-wrap" onClick={() => {
          hashHistory.push({
            pathname: '/trade/order',
            query: {
              ccyPair: val.ccyPair
            }
          })
      }}>
        <div className="-item">
          <div className="-one-wrap">
            <span className="-top">
              <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
              <span>/</span>
              <FormattedMessage id={helper.splitString(val.ccyPair)[1]}/>
            </span>
            <span className="-bottom">{val.ccyPair}</span>
          </div>
          <div className="-two-wrap">
            <div className="-right-top">
              <div
                className="-one"
                onClick={
                  (e) => {
                    if (localStorage.quicktrade != 'false') {
                      e.stopPropagation()
                      this.onBuyClick(val, 0)
                    }
                  }
                }
              >
                <span className={`-number ${bgSell}`}>
                  <span className="-rt-sell-icon">
                  {
                    bgSell == '-red' ? <Icon type={require('static/svg/icon_42.svg')}/> : bgSell == '' ?
                    <Icon type={require('static/svg/icon_40.svg')}/> : <Icon type={require('static/svg/icon_41.svg')}/>
                  }
                    
                  </span>
                  <PriceNumberStyle number={helper.accSub(val.bidPriceFix, val.markupValueBid)}  className={bgSell} length={len}/>
                </span> 
              </div>
              <div
                className="-two"
                onClick={
                  (e) => {
                    if (localStorage.charts != 'false') {
                      e.stopPropagation()
                      this.onShowChart(e,String(index))
                    } 
                    
                  }
                }
              >
                <span>{this.onSpread(val)}</span>
                {(localStorage.charts == 'false' ? false : true) ?
                <div
                  data-chart={index}
                  className="-chart-btn"
                >
                  <Icon type={require('static/svg/m_chart.svg')}/>
                </div> : null}
              </div>
              <div
                className="-three"
                onClick={
                  (e) => {
                    if (localStorage.quicktrade != 'false') {
                      e.stopPropagation()
                      this.onBuyClick(val, 1)
                    }2
                  }
                }
              >
                <span className={`-number1 ${bgBuy}`}>
                  <span className="-rt-buy-icon">
                    {
                      bgBuy == '-red' ? <Icon type={require('static/svg/icon_42.svg')}/> : bgSell == '' ?
                      <Icon type={require('static/svg/icon_40.svg')}/> : <Icon type={require('static/svg/icon_44.svg')}/>
                    }
                  </span>
                  <PriceNumberStyle
                    number={helper.accAdd(val.markupValueAsk, val.askPriceFix)}
                    className={bgBuy}
                    length={len}
                  />
                </span>
              </div>
            </div>
            <div className="-right-bottom">
              {/*
                
              }*/}
            </div>
          </div>
        </div>
        <div className="rt-chart">
          {this.addElement}
        </div>
      </div>
    )
  }
}
CcyPairItem.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(CcyPairItem)
