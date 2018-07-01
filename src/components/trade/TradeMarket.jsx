import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { createForm } from 'rc-form'
import { Switch, Modal, Popover, Icon, InputItem, Toast, Popup } from 'antd-mobile'
import { messageString } from 'component/user'
import { NewMarketOrder2 } from 'component/position'
import {
  messages,
  MarketShowItem,
  MarketBtnItem,
  PriceItem,
  OffsetItem,
  SelectPopValid,
  MarketNameItem,
  NewGoodsAndNum,
  TradeMarketSure
} from './'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import { helper, config, myFetch } from 'component/utils'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

const alert = Modal.alert

const Item = Popover.Item

class GoodsAndNum extends Reflux.Component {
  constructor(props) {
    super(props)
    this.store = PriceStore
    this.storeKeys = ['sellPrice', 'buyPrice']
    this.state = {
      visible: false,
      visible1: false,
      value: props.defaultNum ? String(props.defaultNum) : localStorage.volumn ? localStorage.volumn :'0.1',
      present: props.present,
      ccy: props.ccy
    }
  }
  
  async priceCallback() {
    const options = {
      method: 'POST'
    }
    const result = myFetch(`${config.rootApi}/mRatelist`, options, true)
    return result
  }
  onTimerPrice = (name, num) => {
     PriceAction.changePrice(name, num, this.priceCallback())
      this.timer1 = this.setTimeout(() => {
        this.onTimerPrice(name, num)
      }, config.timeTick.price)
  }
  componentDidMount() {
    let defaultAmount = 100000
		if (this.state.ccy.includes('XAU')) {
			defaultAmount = 100
		}
		if (this.state.ccy.includes('XAG')) {
			defaultAmount = 5000
		}
    this.alertTimer = this.onTimerPrice(this.state.ccy, helper.accMul(this.state.value, defaultAmount))
  }
  onSelect = (opt) => {
    let one = messages[helper.splitString(opt.props.value)[0]]
    let two = messages[helper.splitString(opt.props.value)[1]]
    let present = this.props.formatMessage(one) + '/' + this.props.formatMessage(two)
    this.setState({
      visible: false,
      present: present,
      ccy: opt.props.value
    }, () => {
      //console.log(this.state.ccy)
      if (this.timer1) {
        clearTimeout(this.timer1)
      }
      let defaultAmount = 100000
      if (this.state.ccy.includes('XAU')) {
        defaultAmount = 100
      }
      if (this.state.ccy.includes('XAG')) {
        defaultAmount = 5000
      }
    this.onTimerPrice(this.state.ccy, helper.accMul(this.state.value, defaultAmount))
      this.props.topSelected(opt.props.value)
    })
  }
  onSelect1 = (opt) => {
    this.setState({
      visible1: false,
      value: opt.props.value
    }, () => {
      console.log(this.state.value)
      if (this.timer1) {
        clearTimeout(this.timer1)
      }
      if (this.timer1) {
        clearTimeout(this.timer1)
      }
      let defaultAmount = 100000
      if (this.state.ccy.includes('XAU')) {
        defaultAmount = 100
      }
      if (this.state.ccy.includes('XAG')) {
        defaultAmount = 5000
      }
      this.onTimerPrice(this.state.ccy, helper.accMul(this.state.value, defaultAmount))
      this.props.numValue(opt.props.value)
    })
  }
  onOverlay = (data) => {
    if (data == 'undefined') {
      data = []
      return data
    }
    let result = []
    result = data.map((val, index) => {
      return <Item key={index} value={val.ccyPair}>
        {val.name}
      </Item>
    })
    return result
  }
  componentDidUpdate(prevProps, prevState) {
    this.props.onCallBack(this.state.sellPrice, this.state.buyPrice)
  }
  handleVisibleChange = (visible) => {
    if (this.onOverlay(this.props.data).length < 1) {
      return
    }
    this.setState({visible})
  }
  handleVisibleChange1 = (visible) => {
    this.setState({
      visible1: visible
    })
  }
  onChange = (val) => {
    this.setState({
      value: val
    }, () => {
      this.props.numValue(val)
      if (this.timer1) {
        clearTimeout(this.timer1)
      }
      let defaultAmount = 100000
      if (this.state.ccy.includes('XAU')) {
        defaultAmount = 100
      }
      if (this.state.ccy.includes('XAG')) {
        defaultAmount = 5000
      }
      this.onTimerPrice(this.state.ccy, helper.accMul(this.state.value, defaultAmount))
    })
  }
  render() {
    const goods = this.props.formatMessage(messages.goods)
    const num = this.props.formatMessage(messages.num)
    
    //console.log(this.state.sellPrice,this.state.buyPrice,helper.accMul(this.state.value, 100000),  90)
    const { data, className, val } = this.props
    const { getFieldProps } = this.props.form
    let hand = '100,000'
    if (this.state.ccy.includes('XAU')) {
      hand = '100'
    }
    if (this.state.ccy.includes('XAG')) {
      hand = '5,000'
    }
    //console.log(this.state.ccy, hand, 'hand')
    return (
      <div>
        <div className="rt-select-goodsandnum-alert">
          <div className="rt-selectone">
            <span className="-left">
              {goods}
            </span>
            <span className="-center">
              {this.state.present}
            </span>
            <Popover
              visible={this.state.visible}
              overlay={this.onOverlay(data)}
              overlayClassName="rt-popover-change"
              onVisibleChange={
                this.handleVisibleChange
              }
              placement='bottom'
              popupAlign={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [0, 15],
              }}
              onSelect={this.onSelect}
            >
              <span className="-right">
                <Icon type="down"/>
              </span>
            </Popover>
          </div>
          <div className="rt-selectone">
            <span className="-left">
              {num}
            </span>
            <span className="rt-select-inner">
              <InputItem
                {
                  ...getFieldProps('number',{
                    initialValue: '',
                  })
                }
                type="money"
                onChange={this.onChange}
                value={this.state.value}
              />
            <span className="-num-bottom">
              <Icon type={require('static/svg/mul.svg')}/>
              {hand}{helper.splitString(this.state.present)[0]}
            </span>
            </span>
            <Popover
               visible={this.state.visible1}
               overlay={[
                 (<Item key="1" value={'0.1'}>0.1</Item>),
                 (<Item key="2" value={'0.5'}>0.5</Item>),
                 (<Item key="3" value={'1'}>1</Item>),
                 (<Item key="4" value={'3'}>3</Item>)
               ]}
               onVisibleChange={
                 this.handleVisibleChange1
               }
               onSelect={
                 this.onSelect1
               }
             >
               <span className="-right">
                 <Icon type="down"/>
               </span>
             </Popover>
          </div>
        </div>
        <div className="rt-position-direction">
        <div className={`-left ${className} ? ${className} : ''`}>
          {this.props.formatMessage(messages[this.props.direction])}
        </div>
        <div>
          {this.props.formatMessage(messages['currentPrice'])}
          :
          <span className="-price">{val == 0 ? this.state.sellPrice : this.state.buyPrice }</span>
        </div>
      </div>
      </div>
      
    )
  }
}

reactMixin(GoodsAndNum.prototype, TimerMixin)

const AlertSelectGoodsAndNum = createForm()(GoodsAndNum)

class TradeMarket extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,
      value: localStorage.volumn ? localStorage.volumn : '0.1',
      valueAlert: 0,
      direction: 0,
      limitCheck: false,
      stopCheck: false,
      rateCheck: false,
      offsetNum: props.present.includes('JPY') || props.present.includes('XAU') || props.present.includes('XAG') ? 0.01 : 0.0001,
      validity: 0,
      present: props.present,
      surePresent: props.present,
      callSellPrice: 0,
      callBuyPrice: 0
    }
    this.store = PriceStore
    this.storeKeys = ['sellPrice', 'buyPrice', 'highPrice', 'lowPrice', 'openPrice', 'bidPriceVar', 'askPriceVar', 'changePriceBid']
  }
  onCallBack = (sellPrice, buyPrice) => {
    let sell, buy
    if (sellPrice == 0) {
      sell = this.state.sellPrice
    } else {
      sell = sellPrice
    }
    if (buyPrice == 0) {
      buy = this.state.buyPrice
    } else {
      buy = buyPrice
    }
    this.setState({
      callSellPrice: sell,
      callBuyPrice: buy
    })
  }
  onConfirmClick = (val) => {
    //console.log(val, 'val')
    this.setState({
      surePresent: this.props.present,
      valueAlert: 0
    })
    if (this.timer) {
      //console.log(123)
      clearTimeout(this.timer)
    }

    let Confirm = this.props.intl.formatMessage(messageString.Confirm)
    let filled = this.props.intl.formatMessage(messageString.filled)
    

    const str = this.props.intl.formatMessage(messages.alertName)
    let one = messages[helper.splitString(this.props.present)[0]]
    let two = messages[helper.splitString(this.props.present)[1]]
    let present = this.props.intl.formatMessage(one) + '/' + this.props.intl.formatMessage(two)

    let title = <span>{str}</span>
    let data = JSON.parse(localStorage.ccy)
    data = data.map((val, index) => {
    let result = {}
    let one = messages[helper.splitString(val.ccyPair)[0]]
    let two = messages[helper.splitString(val.ccyPair)[1]]
    result.name = this.props.intl.formatMessage(one) + '/' + this.props.intl.formatMessage(two)
    result.ccyPair = val.ccyPair
    return result
    })
		let defaultAmount = 100000
		if (this.props.present.includes('XAU')) {
			defaultAmount = 100
		}
		if (this.props.present.includes('XAG')) {
			defaultAmount = 5000
		}
    alert(title, 
        <AlertSelectGoodsAndNum
          data={data}
          ccy={this.props.present}
          present={present}
          topSelected={this.topSelected}
          numValue={this.numValue1}
          formatMessage={this.props.intl.formatMessage}
          defaultNum={this.state.value}
          direction={val == 0 ? 'sell' : 'buy'}
          val={val}
          className={val == 1 ? '-green' : ''}
          onCallBack={this.onCallBack}
        />, [
      { text: filled, onPress: () => {
        if (this.timer) {
            clearTimeout(this.timer)
          }
          this.onTimerPrice(this.props.present, helper.accMul(this.state.value, defaultAmount) );
      } },
      { text: Confirm, onPress: () => {
        this.onPositionConfirm(val)
        }
      }
    ])
  }
  onPositionConfirm = (val) => {
    let submitting = this.props.intl.formatMessage(messageString.submitting)
    let submitFaild = this.props.intl.formatMessage(messageString.submitFaild)
    let checkoutsuccess = this.props.intl.formatMessage(messageString.checkoutsuccess)
    if (this.timer) {
      clearTimeout(this.timer)
    }
    let length = 10000
    let defaultAmount = 100000
    if (this.state.surePresent.includes('JPY')) {
      length = 100
    }
    if (this.state.surePresent.includes('XAU')) {
      length = 100
      defaultAmount = 100
    }
    if (this.state.surePresent.includes('XAG')) {
      length = 100
      defaultAmount = 5000
    }
    this.onTimerPrice(this.props.present, helper.accMul(this.state.value, defaultAmount) );
    let amount = 0
    if (this.state.valueAlert == 0) {
      amount = this.state.value
    } else {
      amount = this.state.valueAlert
    }
    //console.log(this.state.surePresent, 'you')
    let offset = {}
    
    //console.log(this.state.offsetNum, length, 'wo')
    if (this.state.rateCheck) {
      if (val == 0) {
        offset.PRIC = this.state.callSellPrice
      } else if (val == 1) {
        offset.PRIC = this.state.callBuyPrice
      }
      offset.SLRG = helper.accMul(this.state.offsetNum, length)
    }
    Toast.loading(submitting, 10, () => {
      Toast.fail(submitFaild)
    })
    const options = {
      method: 'POST',
      body: JSON.stringify({
        OFLG: 1,
        PAIR: this.state.surePresent,
        BSKB: val,
        AMNT: helper.accMul(amount, defaultAmount),
        SKJK: this.state.rateCheck ? 2 : 1,
        ...offset,
      })
    }
    myFetch(`${config.rootApi}/mOrdermarket`, options, true)
    .then((rs) => {
      if (rs) {
        Toast.hide()
        Toast.success(checkoutsuccess, 1.2, () => {
          //console.log(123)
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
  }
  topSelected = (val) => {
    //console.log(val, 1000)
    this.setState({
      surePresent: val,
    })
  }
  numValue1 = (val) => {
    //console.log(val, 90)
    this.setState({
      valueAlert: val
    })
  }
  numValue = (val) => {
    console.log(val, 'val')
    this.setState({
      value: val
    }, () => {
      this.props.number(val)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let defaultAmount = 100000
      if (this.props.present.includes('XAU')) {
        defaultAmount = 100
      }
      if (this.props.present.includes('XAG')) {
        defaultAmount = 5000
      }
      this.onTimerPrice(this.props.present, helper.accMul(this.state.value, defaultAmount))
    })
  }
  onOrderPrice = () => {
    let orderPrice 
    if (this.state.direction == 0) {
      orderPrice = this.state.sellPrice
    } else if (this.state.direction == 1 ) {
      orderPrice = this.state.buyPrice
    }
    return orderPrice
  }
  onTimesChangeLimit = (e, num) => {
    this.setState({
      pric: num
    })
  }
  onTimesChangeStop = (e, num) => {
    this.setState({
      pric1: num
    })
  }
  onValidity = (e) => {
    this.setState({
      validity: helper.requestTime(e)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.present != this.props.present) {
      let result = 0.0001
      if (nextProps.present.includes('JPY')) {
        result= 0.01
      }
      if (nextProps.present.includes('XAU')) {
        result= 0.01
      }
      if (nextProps.present.includes('XAG')) {
        result= 0.01
      }
      this.setState({
        offsetNum : result
      })
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let defaultAmount = 100000
      if (nextProps.present.includes('XAU')) {
        defaultAmount = 100
      }
      if (nextProps.present.includes('XAG')) {
        defaultAmount = 5000
      }
      this.onTimerPrice(nextProps.present, helper.accMul(this.state.value, defaultAmount) );
    }  
  }
  onOffsetChange = (e) => {
    console.log(e , 'e')
    this.setState({
      offsetNum: e
    })
  }
  async priceCallback() {
    const options = {
      method: 'POST'
    }
    const result = myFetch(`${config.rootApi}/mRatelist`, options, true)
    return result
  }
  onTimerPrice = (name, num) => {
     PriceAction.changePrice(name, num, this.priceCallback())
      this.timer = this.setTimeout(() => {
        this.onTimerPrice(name, num)
      }, config.timeTick.price)
  }
  componentDidMount() {
    let defaultAmount = 100000
		if (this.props.present.includes('XAU')) {
			defaultAmount = 100
		}
		if (this.props.present.includes('XAG')) {
			defaultAmount = 5000
		}
    this.onTimerPrice(this.props.present, helper.accMul(this.state.value, defaultAmount) );
  }
  render() {
    //console.log(this.props)
    //console.log(100)
    const { getFieldProps } = this.props.form
    const { limitCheck, stopCheck, offsetNum, rateCheck } = this.state
    let changeDiv = helper.accDiv(this.state.changePriceBid, this.state.sellPrice)
    let diffRate = helper.accMul(helper.accSub(changeDiv, this.state.changePriceBid), 100).toFixed(2)
    return (
      <div className="rt-padding-24 rt-bg-white">
        <NewGoodsAndNum
          present={this.props.present}
          numValue={this.numValue}
        />
        <MarketNameItem />
        <MarketBtnItem
          askPriceVar={this.state.askPriceVar}
          bidPriceVar={this.state.bidPriceVar}
          sellPrice={this.state.sellPrice}
          buyPrice={this.state.buyPrice}
          length={this.props.length}
          present={this.props.present}
          onClick={
            this.onConfirmClick
          }
        />
        <MarketShowItem
          highPrice={this.state.highPrice}
          lowPrice={this.state.lowPrice}
          diffPrice={helper.accSub(this.state.sellPrice, this.state.openPrice)}
          diffRatePrice={diffRate}
        />
        <div className="rt-market-condition">
          <div className={`-item-wrap ${rateCheck ? '-active':'' } `}>
            <div className="-item">
              <FormattedMessage id="distance"/>
              <Switch
                {...getFieldProps('rate', {
                  initialValue: false,
                  valuePropName: 'checked',
                })}
                onClick={
                  (checked) => { 
                    this.setState({
                      rateCheck: checked
                    }) 
                  }
                }
              />
            </div>
            {
            rateCheck ? (
              <OffsetItem
                present={this.props.present}
                num={offsetNum}
                onChange={this.onOffsetChange}
              />
              ) : null
          }
          </div>
          
          
          
        </div>
      </div>
    )
  }
}
TradeMarket.propType = {
  intl: intlShape.isRequired
}
reactMixin(TradeMarket.prototype, TimerMixin)

export default injectIntl(createForm()(TradeMarket))