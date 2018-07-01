import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Result  } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { messagex } from './'




const DepositSuccess = function (props) {
  
  const GoBack = props.Back
  return (
    <Result
      imgUrl="https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png"
      title={<FormattedMessage id="rechargeSuccessfully"/>}
      message={
        <div className="deposit-number">
          <div className="-number"><FormattedMessage id="serialNumber"/>{`${props.orderId}`}</div>
          <ul className="-message">
            <li className="-item">
              <span className="-left"><FormattedMessage id="account"/></span>
              <span className="-right">12316532</span>
            </li>
            <li className="-item">
              <span className="-left"><FormattedMessage id="rechargeTime"/></span>
              <span className="-right">12316532</span>
            </li>
            <li className="-item">
              <span className="-left"><FormattedMessage id="paymentMmethod"/></span>
              <span className="-right">12316532</span>
            </li>
          </ul>
        </div>
    }
      buttonText={GoBack}
      buttonType="default"
      buttonClick={() => hashHistory.push('/account')}
    />
  )
}
const DepositFail = function (props) {
   const GoBack = props.Back
  return (
    <Result
      imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
      title={<FormattedMessage id="rechargeFailed"/>}
      message={<FormattedMessage id="PleaseTryAgain"/>}
      buttonText={GoBack}
      buttonType="default"
      buttonClick={() => hashHistory.push('/account/depositDraw')}
    />
  )
}


 class DepositResult extends Component {
  state = {
    result: 0,
    orderId: 0
  }

  render() {
    const Back = this.props.intl.formatMessage(messagex.Back)
    // console.log(Back)
    let result
    switch (this.state.result) {
      case 0:
        result = <DepositSuccess orderId={this.state.orderId} Back={Back}/>
        break
      case 1:
        result = <DepositFail orderId={this.state.orderId} Back={Back}/>
        break
    }
    return (
      <div className="deposit-result">
        <CommonHeader title={
            <FormattedMessage id="depositResult"/>
        } />
        {result}
      </div>
    )
  }
}



DepositResult.propTypes = {
  intl: intlShape.isRequired
  
}

export default injectIntl(DepositResult)










