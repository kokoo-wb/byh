import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { FormattedMessage } from 'react-intl'

export default class InOutDetail extends Component {
	render() {
		const { visible, onClose } = this.props
		return (
			<Modal
				visible={visible}
				onClose={() => {console.log(1)}}
				animate={false}
			 >
			 	<CommonHeader
					title={
						<span>
							<FormattedMessage id="incomeDetail"/>
						</span>
					}
					onLeftClick={
						() => {onClose()}
					}
				/>
				<ul className="rt-history-detail">
					<li className="-item">
						<span>开仓时间</span>
						<span>04-11 15:10</span>
					</li>
					<li className="-item">
						<span>商品</span>
						<span>欧元/美元</span>
					</li>
					<li className="-item">
						<span>数量</span>
						<span>3127</span>
					</li>
				</ul>
			 </Modal>
			)
	}
}