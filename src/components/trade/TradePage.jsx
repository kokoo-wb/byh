import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { InputItem, NoticeBar } from 'antd-mobile'
import { FooterBar } from 'component/footer'
import { SearchHeader } from 'component/header'
import { TopAccount, TitleTip, TradeTotalItem, ChartSimpleWrap, ChatRoom, SelectGoods, OrderDirection, ChoseButton, Data, NewMarketOrder1, NewMarketOrder2} from './'
import { myFetch, config, helper } from '../utils'



class TradePage extends Component {
  state = {
    dataRatelist: []
  }
  render() {
    return (
      <div className="rt-trade-page">
        <SearchHeader />
        {
          localStorage.live ? null : sessionStorage.notice ? 
          <NoticeBar
            mode="closable"
            icon={null}
            className="rt-notice-bar"
            onClick={
              () => {
                sessionStorage.removeItem('notice')
              }
            }
          >
            <FormattedMessage
              id='notice_noChange'
            />
            <span
              className="-notice_change"
              onClick={
                () => {
                  hashHistory.push('/openaccount')
                }
              }
            >
              <FormattedMessage
                id='notice_change'
              />
            </span>
          </NoticeBar> : null
        }
        
        <TopAccount/>
        <TitleTip />
        {/*<ChartSimpleWrap />*/}
        <div className="cm-scrollable-container">
          <TradeTotalItem location={this.props.location}/>
          
        </div>
        {
          localStorage.chat != 'false' ?
          <ChatRoom /> : null
        }
        
        <FooterBar activeIndex={0}/>
      </div>
    )
  }
}

export default TradePage