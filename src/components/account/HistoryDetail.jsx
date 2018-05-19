import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { FormattedMessage } from 'react-intl'
import { config, helper, myFetch } from 'component/utils'
import moment from 'moment'
const onGuadanType = (val = 0) => {
  let result = '市价/限价/止损'
  switch(val) {
    case 0: 
      result = '市价/限价/止损';
      break
    case 11: 
      result = 'IFD1次';
      break
    case 12:
      result = 'IFD2次';
      break
    case 21:
      result = 'OCO限价';
      break
    case 22:
      result = 'OCO止损';
      break
    case 31:
      result = 'IFO1次';
      break
    case 32:
      result = 'IFO2次限价';
      break
    case 33:
      result = 'IFO2次止损';
      break
    case 41:
      result = '全決済';
      break
    case 51:
      result = '强制平仓';
      break
    default:
      result = '市价/限价/止损'
  }
  return result
}

export default class HistoryDetail extends Component {
	
	render() {
		const { visible, onClose, data } = this.props
		const ccy = helper.splitString(data.ccyPair)
		console.log(data)
		return (
			<Modal
				visible={visible}
				onClose={() => {console.log(1)}}
				animate={false}
			 >
			 	<CommonHeader
					title={
						<span>
							<FormattedMessage id="trade1"/>
							<FormattedMessage id="history"/>
							<FormattedMessage id="detail"/>
						</span>
					}
					onLeftClick={
						() => {onClose()}
					}
				/>
        <div className="cm-scrollable-container">
				<ul className="rt-history-detail">
					<li className="-item">
						<FormattedMessage id="serialnumber" />
						<span>{data ? data.orderNo : ''}</span>
					</li>
					<li className="-item">
						<FormattedMessage id="goods" />
						{
							ccy ? 
							<span>
								<FormattedMessage id={ccy[0] || 'EUR'}/>
	              <span>/</span>
	              <FormattedMessage id={ccy[1] || 'USD'}/>
							</span> : <span></span>
						}
						
					</li>
					<li className="-item">
						<FormattedMessage id="direction" />
						<span>
							{
								data ? data.bsCls == 0 ? <FormattedMessage id="sell"/> :<FormattedMessage id="buy"/> :null
							}
						</span>
					</li>
					<li className="-item">
						<FormattedMessage id="number"/>
						<span>{data ? data.execAmt : 0}</span>
					</li>
					
					<li className="-item">
						<FormattedMessage id="accountId"/>
						<span>{data ? data.loginId : 0}</span>
					</li>
					<li className="-item">
						<FormattedMessage id="type"/>
						<span>{data ? onGuadanType(data.orderFormDtlCls) : ''}</span>
					</li>
          <li className="-item">
            <FormattedMessage id="guadandata"/>
            <span>{moment(data.orderDt, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD hh:mm:ss')}</span>
          </li>
          <li className="-item">
            <FormattedMessage id="dealdata"/>
            <span>{moment(data.execDt, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD hh:mm:ss')}</span>
          </li>
          <li className="-item">
            <FormattedMessage id="dealprice" />
            <span>{data ? data.execPrice : 0}</span>
          </li>
          <li className="-item">
            <FormattedMessage id="open/close"/>
            <span>{data ? data.newcloseCls == 2 ? '平仓':'开仓': ''}</span>
          </li>
				</ul>
        
          {
            data ? data.newcloseCls == 2 ?
            <ul className="rt-history-detail">
              <li className="-item">
                <FormattedMessage id="clpositionNo" />
                <span>{data.closeOrderNo}</span>
              </li>
              <li className="-item">
                <FormattedMessage id="tradePl"/>
                <span>{data.tradePl}</span>
              </li>
              <li className="-item">
                <FormattedMessage id="swapAdd"/>
                <span>{data.settleSwap}</span>
              </li>
              <li className="-item">
                <FormattedMessage id="totalPl"/>
                <span>{data.totalPl}</span>
              </li>
            </ul> : null : null
          }
        </div>
			 </Modal>
			)
	}
}