import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class NoticeList extends Component {
	render() {
		return (
			<ul className="rt-notice-list">
				<li className="-item">
					<div className="-top">关于开通借记卡支付通道的通知</div>
					<div className="-bottom">
						<span className="-left">2016-05-10 09:21:47</span>
						<span className="-right" onClick={
							() => {
								hashHistory.push('/notice/detail')
							}
						}>查看详情</span>
					</div>
				</li>
				<li className="-item">
					<div className="-top">关于开通借记卡支付通道的通知</div>
					<div className="-bottom">
						<span className="-left">2016-05-10 09:21:47</span>
						<span className="-right" onClick={
							() => {
								hashHistory.push('/notice/detail')
							}
						}>查看详情</span>
					</div>
				</li>
			</ul>
			)
	}
}