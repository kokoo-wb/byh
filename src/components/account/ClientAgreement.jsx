import React, { Component } from 'react'
import { CommonHeader } from 'component/header'
import { FormattedMessage } from 'react-intl'

export default class ClientAgreement extends Component {
  componentDidMount() {
    
  }
  render() {
    return(
      <div>
        <CommonHeader title={<FormattedMessage id="clientAgreement"/>}/>
      </div>
      )
  }
}