import React, { Component } from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { hashHistory } from 'react-router'
import { Button, Toast } from 'antd-mobile'
import { LimitOrStopPrice  } from '../trade'
import { helper, config, myFetch } from '../utils'
import { messages } from './'

class PositionOrderIfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: props.arr[0].orderPrice,
      price1: props.arr[1].orderPrice,
      price2: props.arr[2].orderPrice
    }
  }
  onEdit = (data) => {
    const formatMessage= this.props.intl.formatMessage
    Toast.loading(formatMessage(messages.loading), 10, () => {
      Toast.fail(formatMessage(messages.Loadfailed))
    })
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ORDR: data[0].orderNo,
        OFLG: 1,
        PRIC: this.state.price || data[0].orderPrice
      })
    }
    myFetch(`${config.rootApi}/mEdit`,options, true )
    .then((rs) => {
      if (rs && rs.statusCode == 0) {
        Toast.hide()
        Toast.success(formatMessage(messages.ModifyPendingSuccess), 1.2, () => {
          this.onCopyEdit(data)
        })
      }
    })
  }
  onCopyEdit = (data) => {
    const formatMessage= this.props.intl.formatMessage
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ORDR: data[1].orderNo,
        OFLG: 1,
        PRIC: this.state.price1 || data[1].orderPrice
      })
    }
    myFetch(`${config.rootApi}/mEdit`, options, true)
     .then((rs) =>{
       Toast.success(formatMessage(messages.AmendSingleSuccess), 1.2, () => {
          this.onCopyEdit1(data)
       })
     })
  }
  onCopyEdit1 = (data) => {
    const formatMessage= this.props.intl.formatMessage
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ORDR: data[2].orderNo,
        OFLG: 1,
        PRIC: this.state.price2 || data[2].orderPrice
      })
    }
    myFetch(`${config.rootApi}/mEdit`, options, true)
     .then((rs) =>{
       Toast.success(formatMessage(messages.AmendSingleTwoSuccess), 1.2, () => {
          this.props.onClose(1, data[0].primaryOrderNo, [data[0].orderNo, data[1].orderNo, data[2].orderNo], [this.state.price || data[0].orderPrice, this.state.price1 || data[1].orderPrice, this.state.price2 || data[2].orderPrice])
       })
     })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible != this.props.visible && nextProps.visible == true) {
      this.setState({
        price: nextProps.arr[0].orderPrice,
        price1: nextProps.arr[1].orderPrice,
        price2: nextProps.arr[2].orderPrice
      })
    }     
  }
  onTimesChange = (price) => {
    this.setState({
      price
    })
  }
  onTimesChange1 = (price) => {
    this.setState({
      price1: price
    })
  }
  onTimesChange2 = (price) => {
    this.setState({
      price2: price
    })
  }
  onOrderPrice = (direction, type, ccy) => {
    let length = 10000
    let fixed = 5
    if ( ccy && ccy.includes('JPY')) {
      length = 100
      fixed = 3
    }
    if ( ccy && ccy.includes('XAU')) {
      length = 100
      fixed = 3
    }
    if ( ccy && ccy.includes('XAG')) {
      length = 100
      fixed = 3
    }
    let pips
    let result = parseFloat(helper.accDiv(3, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    let orderPrice 
    if (direction == 0) {
      orderPrice = parseFloat(helper.accAdd(this.props.sellPrice, pips)).toFixed(fixed)
      //console.log(this.props.sellPrice, pips, orderPrice, 'sellPrice')
    } else if (direction == 1 ) {
      orderPrice = parseFloat(helper.accAdd(this.props.buyPrice, pips)).toFixed(fixed)
      //console.log(this.props.buyPrice, pips, orderPrice, 'buyPrice')
    }

    return orderPrice
  }
  onOrderPrice1 = (direction, type, ccy) => {
    let price = this.state.price
    let length = 10000
    let fixed = 5
    let newprice
    if ( ccy && ccy.includes('JPY')) {
      length = 100
      fixed = 3
    }
    if ( ccy && ccy.includes('XAU')) {
      length = 100
      fixed = 3
    }
    if ( ccy && ccy.includes('XAG')) {
      length = 100
      fixed = 3
    }
    let pips
    let result = parseFloat(helper.accDiv(3, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    if (direction == 0) {
      newprice = parseFloat(helper.accAdd(price, pips)).toFixed(fixed)
      //console.log(price, pips, newprice, 'sellPrice')
    } else if (this.state.direction == 1 ) {
      newprice = parseFloat(helper.accAdd(price, pips)).toFixed(fixed)
      //console.log(price, pips, newprice, 'buyPrice')
    }
    return newprice
  }
  onOrderPrice2 = (direction, type, ccy) => {
    let price = this.state.price
    let length = 10000
    let fixed = 5
    let newprice
    if ( ccy && ccy.includes('JPY')) {
      length = 100
      fixed = 3
    }
    if ( ccy && ccy.includes('XAU')) {
      length = 100
      fixed = 3
    }
    if ( ccy && ccy.includes('XAG')) {
      length = 100
      fixed = 3
    }
    let pips
    let result = parseFloat(helper.accDiv(3, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    if (direction == 0) {
      newprice = parseFloat(helper.accAdd(price, pips)).toFixed(fixed)
      //console.log(price, pips, newprice, 'sellPrice')
    } else if (this.state.direction == 1 ) {
      newprice = parseFloat(helper.accAdd(price, pips)).toFixed(fixed)
      //console.log(price, pips, newprice, 'buyPrice')
    }
    return newprice
  }
  render() {

    const data = this.props.arr
    //console.log(data, 'data')
    return (
      <div className="rt-position-direct">
      <div className="rt-order-title">
          <FormattedMessage id="mainsetting"/>
        </div>
        <LimitOrStopPrice
          defaultCon={data[0].conditionCls}
          price={this.state.price}
          onChange={this.onTimesChange}
          ccy={data[0].ccyPair || 'EUR/USD'}
          orderPrice={this.onOrderPrice(data[0].bsCls, data[0].conditionCls, data[0].ccyPair)}
          direction={data[0].bsCls}
        />
        <div className="rt-order-title">
          <FormattedMessage id="copysetting"/>
          <FormattedMessage id="one"/>
        </div>
        <LimitOrStopPrice
          defaultCon={data[1].conditionCls}
          price={this.state.price1}
          onChange={this.onTimesChange1}
          ccy={data[0].ccyPair || 'EUR/USD'}
          orderPrice={this.onOrderPrice1(data[1].bsCls, data[1].conditionCls, data[0].ccyPair)}
          direction={data[1].bsCls}
        />
        <div className="rt-order-title">
          <FormattedMessage id="copysetting"/>
          <FormattedMessage id="two"/>
        </div>
        <LimitOrStopPrice
          defaultCon={data[2].conditionCls}
          price={this.state.price2}
          onChange={this.onTimesChange2}
          ccy={data[0].ccyPair || 'EUR/USD'}
          orderPrice={this.onOrderPrice2(data[2].bsCls, data[2].conditionCls, data[0].ccyPair)}
          direction={data[2].bsCls}
        />
        <Button className="btn rt-sure " type="primary"
          onClick={
            () => {
              this.onEdit(data)
            }
          }
        >
          <FormattedMessage
            id='confirm'
           /> 
        </Button>
      </div>
    )
  }
}

export default injectIntl(PositionOrderIfo)