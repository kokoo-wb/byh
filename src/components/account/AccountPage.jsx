import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, NoticeBar } from 'antd-mobile'
import { CenterHeader } from 'component/header'
import { FooterBar } from 'component/footer'
import { TopAccount } from 'component/trade'
import './accountItem.less'
import { AccountItemAll, AccountName } from './'


export default class AccountPage extends Component {
  
  render() {
    return (
      <div>
        <CenterHeader title={<FormattedMessage id="account"/>}/>
        <AccountName />
        {
          localStorage.live ? null : sessionStorage.notice ? 
          <NoticeBar
            mode="closable"
            icon={null}
            className="rt-notice-bar"
            onClick={
              () => {
                localStorage.removeItem('notice')
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
                  //hashHistory.push('/openaccount')
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
        
        <div className="cm-scrollable-container rt-bg-grey">
          <div className="rt-height22"></div>
          <AccountItemAll />
        </div>
        <FooterBar activeIndex={4}/>
      </div>
    )
  }
}
