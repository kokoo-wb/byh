import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, SwipeAction, List, Button } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { CommonHeader } from 'component/header'



export default class BankCard extends Component {
  state = {
    active: 0,
    getInfo: {}
  }

  render() {
    const { active, getInfo } = this.state
    return (
      <div className="rt-bank-card">
        <CommonHeader title={
            <FormattedMessage id="bankcard"/>
        } />
        <div className="card-number">
          <span className="-left">
            <FormattedMessage id="bankcard"/> 
            <span> : </span>
            3
            <FormattedMessage id="zhang"/> 
            </span>
           <span className="-right"><FormattedMessage id="addRule"/></span>
        </div>
        <div className="swiper">
          <SwipeAction
            autoClose
            right={[
              {
                text: '解绑',
                onPress: () => console.log('cancel'),
              },
            ]}
          >
            <List.Item
              extra="**** **** **** 1131"
            >
              中国工商银行
            </List.Item>
          </SwipeAction>
          <SwipeAction
            autoClose
            right={[
              {
                text: '解绑',
                onPress: () => console.log('cancel'),
              },
            ]}
          >
            <List.Item
              extra="**** **** **** 1131"
            >
              中国工商银行
            </List.Item>
          </SwipeAction>
        </div>
        <Button
          className="cm-main-button"
          onClick={
            () => {
              hashHistory.push('/account/addbankcard')
            }
          }
        >
          <FormattedMessage id="add"/>
        </Button>
       
      </div>
    )
  }
}