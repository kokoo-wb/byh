import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from  'antd-mobile'
import { CommonHeader } from 'component/header'
import { FormattedMessage } from 'react-intl'
import { SimpleSwitchBtn } from 'component/common'
import { HistoryList, LogList } from './'

export default class HistoryAndLogList extends Component {
	state = {
		active: 0
	}
	onClick = (i) => {
		this.setState({
			active: i
		})
	}
	render() {
		return (
			<div className="rt-history-log">
				<CommonHeader
					title={
						<span>
							<FormattedMessage id="trade1"/>
							<FormattedMessage id="history"/>
						</span>
					}
				/>
				{/*<SimpleSwitchBtn
				  left={
				  	<span>
						<FormattedMessage id="trade1"/>
						<FormattedMessage id="history"/>
					</span>
				  }
				  right={
				  	<FormattedMessage id="log"/>
				  }
				  onClick={
				  	this.onClick
				  }
				/>*/}
				 <HistoryList />
				
			</div>
			)
	}
}

HistoryAndLogList.propTypes = {
	left: PropTypes.node,
	right: PropTypes.node
}