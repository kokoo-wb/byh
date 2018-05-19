import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, Grid, Modal } from 'antd-mobile'



const dataArr = [
  {
    icon: <Icon type={require('static/svg/icon_47.svg')}/>,
    name: <span>
            <FormattedMessage id="deposit"/>
            <span>／</span>
            <FormattedMessage id="withdraw"/>
          </span>,
    deposit:true,
    link: '/account/depositdraw'
  },
  {
    icon: <Icon type={require('static/svg/icon_46.svg')}/>,
    name: <FormattedMessage id="clientAgreement"/>,
    link: '/client/agreement'
  },
  {
    icon: <Icon type={require('static/svg/icon_45.svg')}/>,
    name: <FormattedMessage id="clientService"/>,
    link: '/'
  },
  {
    icon: <Icon type={require('static/svg/icon_48.svg')}/>,
  name: <span>
            <FormattedMessage id="notice"/>
          </span>,
    link: '/account/message'
  },
  {
    icon: <Icon type={require('static/svg/icon_49.svg')}/>,
    name: <span>
            <FormattedMessage id="trade1"/>
            <FormattedMessage id="history"/>
          </span>,
    link: '/account/history'
  },
  {
    icon: <Icon type={require('static/svg/icon_50.svg')}/>,
    name: <FormattedMessage id="aboutUs"/>,
    link: '/'
  }
]

  const onFetchLink = function (val) {
    if (val.deposit) {
      const alert = Modal.alert
      let close  = alert(<div className="rt-deposit-withdraw-tips">
        <span>提示</span>
        <span
          className="-cross"
          onClick={
            () => {
              close.close()
            }
          }
        >
          <Icon type="cross"/>
        </span>
      </div>, <div className="alert-tip">
        <p>您的账户是模拟账户</p>
        <p>充值功能为模拟操作</p>
        <p>如要开始真实交易请开通展示账户</p>
      </div>, [
        { text: '立即开户', onPress: () => console.log('cancel') },
        { text: '先体验充值', onPress: () => {hashHistory.push(`${val.link}`)} },
      ])
      return
    }else{
      hashHistory.push(val.link)
    }
    
  }
const AccountItemAll = function() {
  return (
    <div className="rt-account-itemall">
      <Grid data={dataArr}
        columnNum={3}
        hasLine={false}
        renderItem={(val, index) => (
          <div
            key={index}
            className="-item"
            onClick={
              () => {
                onFetchLink(val)
              }
            }
          >
            <span className="-left">{val.icon}</span>
            <span>
              {
                val.name
              }
            </span>
            
          </div>
        )}
      />
    </div>
  )
}

export default AccountItemAll
