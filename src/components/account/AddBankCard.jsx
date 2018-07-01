import React, { Component } from 'react'
import { CommonHeader } from 'component/header'
import { FormattedMessage } from 'react-intl'
import { BankCardList } from './'

export default class AddBankCard extends Component {
  render() {
    const mobile = sessionStorage.mobile
    return (
      <div className="rt-binding-card">
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
        <BankCardList/>
      </div>
    )
  }
}