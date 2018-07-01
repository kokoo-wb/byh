import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { CommonHeader } from 'component/header'
import { SimpleSwitchBtn } from 'component/common'
import { AccountTop, Deposit, WithDraw } from './' 

export default class DepositDraw extends Component {
  state = {
    active: 0,
    getInfo: {}
  }
  onClick = (val) => {
    if(val == 0){
      this.setState({
                    active: 0
                  })
    }else{
      this.setState({
        active:1
      })
    }
  }
  render() {
    const { active, getInfo } = this.state
    return (
      <div className="rt-deposit-draw">
        <CommonHeader title={
          <span>
            <FormattedMessage id="deposit"/>
            <span>／</span>
            <FormattedMessage id="withdraw"/>
          </span>
        } />
        <AccountTop/>
        <div className="-botton">
          <SimpleSwitchBtn
            left={
              <FormattedMessage id="deposit"/>
            }
            right={
              <FormattedMessage id="withdraw"/>
            }
            onClick={
              this.onClick
            }
          />
        </div>
        {this.state.active == 0 ? <Deposit/> : <WithDraw/>}
        
      </div>
    )
  }
}