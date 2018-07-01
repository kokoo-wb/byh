import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import { messages } from './'
import { Icon } from 'antd-mobile'
import moment from 'moment'

class TradeMarketSure extends Component {
  render() {
    const { price, time, onClose } = this.props
    
    return (
      <div
        className="rt-tradeMarket-sure"
        onClick={
          () => {onClose()}
        }
      >
        <div className="-left">
          <Icon type={require('static/svg/correct.svg')}/>
        </div>
        <div className="-right">
          <div className="-top">
            <span className="-big">{this.props.formatMessage(messages.orderConfirmation)}</span>
            <span>{moment(time, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')}</span>
          </div>
          <div className="-bottom">
            {this.props.formatMessage(messages.transactionPrice)}
            <span className="-dot">:</span>
            {price}
          </div>
        </div>
        
      </div>
      )
  }
}


export default TradeMarketSure