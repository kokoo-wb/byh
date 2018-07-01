import React, { Component } from 'react'
import { InputItem } from 'antd-mobile'
import { messages } from 'component/trade'
import { createForm } from 'rc-form'
import { helper, config, myFetch } from 'component/utils'

class ModifyNumber extends Component {
  onBlur = (val) => {
    //console.log(val, 'val')
    document.querySelector('.am-modal-body').style.overflow = 'auto'
    this.props.getNumber(val)
  }
  componentDidMount() {
    let hand = '100,000'
		let defaultAmount = 100000
		if (this.props.data.ccypairCd.includes('XAU')) {
			defaultAmount = 100
			hand = '100'
		}
		if (this.props.data.ccypairCd.includes('XAG')) {
			defaultAmount = 5000
			hand = '5,000'
		}
    let total = helper.accDiv(helper.accSub(this.props.data.positionAmt, this.props.data.orderingAmt), defaultAmount)
    //console.log(typeof total, 'total')
    /*/if (total) {
      console.log(total)
      total = String(total)
    }*/
    this.props.getNumber(total)
    //console.log(1)
  }
	render() {
    let propmt = this.props.formatMessage(messages.closeNum)
    let inputTextNum1 = this.props.formatMessage(messages.inputTextNum1)
    let inputTextNum2 = this.props.formatMessage(messages.inputTextNum2)
    let hand = '100,000'
		let defaultAmount = 100000
		if (this.props.data.ccypairCd.includes('XAU')) {
			defaultAmount = 100
			hand = '100'
		}
		if (this.props.data.ccypairCd.includes('XAG')) {
			defaultAmount = 5000
			hand = '5,000'
		}
    let total = helper.accDiv(helper.accSub(this.props.data.positionAmt, this.props.data.orderingAmt), defaultAmount)
    total = total ? String(total) : ''
      
    const { getFieldProps } = this.props.form
		return (
      <div className="rt-modify-number">
        <span>{propmt}</span>
        <InputItem
          {...getFieldProps('num', {
            initialValue: total ? String(total) : ''
          })}
          type="money"
          extra={`x ${hand}`}
          onBlur={this.onBlur}
          onFocus={() => {
            document.querySelector('.am-modal-body').style.overflow = 'hidden'
          }}

        />
      </div>
      )
	}
}

export default createForm()(ModifyNumber)