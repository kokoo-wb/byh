import React, { Component } from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { hashHistory } from 'react-router'
import { Toast, Button } from 'antd-mobile'
import { LimitOrStopPrice } from '../trade'
import { helper, myFetch, config } from '../utils'
import { messages } from './'

 class PositionOrderDirect extends Component {

  onEdit = (data) => {
    const formatMessage= this.props.intl.formatMessage
    Toast.loading(formatMessage(messages.loading), 10, () => {
      Toast.fail(formatMessage(messages.Loadfailed))
    })
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ORDR: data.orderNo,
        OFLG: 1,
        PRIC: this.state.price || data.orderPrice
      })
    }
    //console.log(data, 'data')
    myFetch(`${config.rootApi}/mEdit`,options, true )
    .then((rs) => {
      if (rs && rs.statusCode == 0) {
        Toast.hide()
        Toast.success(formatMessage(messages.ModifyPendingSuccess), 1.2, () => {
          this.props.onClose(1, data.primaryOrderNo
,[data.orderNo], [this.state.price|| data.orderPrice])
        })
      }
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      price: this.props.data.orderPrice
    }
  }
  /*onOrderPrice = (data = 0) => {
      let orderPrice 
      if (data == 0) {
        orderPrice = this.props.sellPrice
      } else if (data == 1 ) {
        orderPrice = this.props.buyPrice
      }
      return orderPrice
  }*/
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible != this.props.visible && nextProps.visible == true) {
      this.setState({
        price: this.props.data.orderPrice
      })
    }     
  }
  onTimesChange = (price) => {
    console.log(price, 'price')
    this.setState({
      price
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
  render() {
    const data = this.props.data
    // console.log(data, 'data')
    return (
      <div className="rt-position-direct">
        <div className="rt-order-title">
          <FormattedMessage id="mainsetting"/>
        </div>
        <LimitOrStopPrice
          orderPrice={this.onOrderPrice(data.bsCls, data.conditionCls, data.ccyPair)}
          defaultCon={data.conditionCls}
          price={this.state.price}
          onChange={this.onTimesChange}
          ccy={data.ccyPair}
          direction={data.bsCls}
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

export default injectIntl(PositionOrderDirect)