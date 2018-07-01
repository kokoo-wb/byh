import React, { Component } from 'react'
import { CommonHeader } from 'component/header'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { InputItem, Button, Checkbox } from 'antd-mobile'
import { createForm } from 'rc-form'
import { messages } from 'component/trade'

const AgreeItem = Checkbox.AgreeItem

class LoginSetting extends Component {
	render() {
		const { getFieldProps } = this.props.form
    	const phoneAslogin = this.props.intl.formatMessage(messages.phoneAslogin)
    	const inputVerify = this.props.intl.formatMessage(messages.inputVerify)
    	const inputloginpass = this.props.intl.formatMessage(messages.inputloginpass)
    	const inputemail = this.props.intl.formatMessage(messages.inputemail)
		return (
			<div className="rt-login-setting">
				<CommonHeader
					title={
						<FormattedMessage id="logaccsetting"/>
					}
				/>
				<h3 className="rt-explain"><FormattedMessage id="KeepTransitionHistory"/></h3>
				<div className="cm-scrollable-container rt-padding-40">
					<InputItem
						type="phone"
						clear
						className="cm-common-input"
						placeholder={phoneAslogin}
					/>
					<div className="rt-clear-float">
						<InputItem
							type="phone"
							clear
							className="cm-common-input cm-verify-width"
							placeholder={inputVerify}
						/>
						<Button className="cm-main-button cm-get-verify">
							<FormattedMessage id="getValidation"/>
						</Button>
					</div>
					<InputItem
						type="password"
						clear
						className="cm-common-input"
						placeholder={inputloginpass}
					/>
					<InputItem
						type="phone"
						clear
						className="cm-common-input"
						placeholder={inputemail}
					/>
					<AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
			           <FormattedMessage id="alrread"/>
			           <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>
			           	<FormattedMessage id="regisprotocol"/>
			           </a>
			           <span className="rt-color-blue">
			              <FormattedMessage id="and1"/>
			           </span>
			           <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>
			           	<FormattedMessage id="userbook"/>
			           </a>
			        </AgreeItem>
					<Button className="cm-main-button -blue rt-margin30">
						<FormattedMessage id="set"/>
					</Button>
				</div>
			</div>
			)
	}
}


LoginSetting.propType = {
  intl: intlShape.isRequired
}
export default injectIntl(createForm()(LoginSetting))