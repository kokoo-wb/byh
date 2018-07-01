import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'antd-mobile'
import { CommonHeader } from '../header'
import { FooterBar } from '../footer'
import { helper, myFetch, config } from 'component/utils'
import {
  GuadanDetailTop,
  PositionOrderDirect,
  PositionOrderOco,
  PositionOrderIfo
} from './'
import { LimitStopAll } from 'component/trade'

export default class PositionModifyOrder extends Component {
  render() {
    const { visible, data, status, onClose, arr } = this.props
    //console.log(status)
    return (
      <Modal
        visible={visible}
        animate={false}
        className="rt-guadan-modal"
      >
        <CommonHeader
          title={
            <span>
              <FormattedMessage id="ChangePendingDetail"/>
            </span>
          }
          onLeftClick={
            () => {
              onClose(0)
            }
          }
        />
        <GuadanDetailTop data={data}/>
        <div className="-background rt-height22"></div>
        <div className="cm-scrollable-container rt-padding-24">
        {
          status == 0 ? <PositionOrderDirect
           data={data}
           arr={arr}
           visible={visible}
           onClose={onClose}
           sellPrice={this.props.sellPrice}
           buyPrice={this.props.buyPrice}
          /> : 
          status == 2 ?
          <PositionOrderOco
            data={data}
            visible={visible}
            onClose={onClose}
            arr={arr}
            sellPrice={this.props.sellPrice}
            buyPrice={this.props.buyPrice}
          /> : status == 3 ? 
          <PositionOrderIfo
            data={data}
            visible={visible}
            onClose={onClose}
            arr={arr}
            sellPrice={this.props.sellPrice}
            buyPrice={this.props.buyPrice}
          /> : <PositionOrderDirect
            data={data}
            visible={visible}
            arr={arr}
            onClose={onClose}
            sellPrice={this.props.sellPrice}
            buyPrice={this.props.buyPrice}
            />
        }
          
        </div>
        <FooterBar activeIndex={1}/>
      </Modal>
      )
  }
}