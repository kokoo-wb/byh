import React, { Component } from 'react'
//import ReactTimeout from 'react-timeout'
import { Result } from 'antd-mobile'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import { myFetch, config, helper } from '../utils'
import { CcyPairItem } from './'
import _ from 'lodash'
import { messages } from './'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')



class TradeTotalItem extends Reflux.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartShow: true,
      dataRatelist: []
    }
    this.store = PriceStore
    this.storeKeys = ['dataRatelist']
  }

  onTradeAll = () => {
    PriceAction.inforAll()
    this.setTimeout(() => {
        this.onTradeAll()
      }, config.timeTick.price)
  }
  componentDidMount() {
    this.onTradeAll()
    
    //console.log(this.props.location)
    if (this.props.location &&  this.props.location.query && this.props.location.query.switch1 && this.props.location.query.switch1 == 1) {
      //console.log(1)
      this.setState({
        chartShow : false
      })
    }
  }
  render() {
    //console.log(this.state.dataRatelist, 'dataRatelist')
    const { dataRatelist, chartShow } = this.state
    const formatMessage = this.props.intl.formatMessage
    let message = formatMessage(messages.TradeLoading)
    //console.log(JSON.parse(localStorage.ccy).length, 'ccy')
    if (JSON.parse(localStorage.ccy).length < 1) {
      message = formatMessage(messages.TradeIsNothing)
    }
    
    return (
      <div className="rt-trade-totalitem">
        <div className="-trade-item">
          {
            dataRatelist.length < 1 ?
            <Result
              imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
              message={message}
            /> :
            dataRatelist.map((val, index) => {
              return (
                <CcyPairItem val={val} index={index} key={index} chartShow={chartShow}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

reactMixin(TradeTotalItem.prototype, TimerMixin)

export default injectIntl(TradeTotalItem)
