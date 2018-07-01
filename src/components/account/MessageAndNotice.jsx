import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { CommonHeader } from 'component/header'
import { SimpleSwitchBtn } from 'component/common'
import { MessageList, NoticeList } from './'

export default class MessageAndNotice extends Component {
	state = {
		active: 0
	}
	onClick = (val) => {
		this.setState({
			active: val
		})
	}
	render() {
		const { active } = this.state
		return (
			 <div>
			 	<CommonHeader
			 		title={
			 			<FormattedMessage id="notice"/>
			 		}
			 	/>
			 	 {/*<SimpleSwitchBtn
			 	 	left={
			 	 		<FormattedMessage id="message" />
			 	 	}
			 	 	right={
			 	 		<FormattedMessage id="notice" />
			 	 	}
			 	 	onClick={
			 	 		this.onClick
			 	 	}
			 	 />*/}
			 	 <NoticeList />
			 </div>
			)
	}
}