import React, { Component } from 'react'

export default class LogList extends Component {
	render() {
		return (
			<ul className="rt-log-list">
				<li className="-item">
					<h3>建仓确认</h3>
					<p>您的订单号20161011054:外汇交易建仓，成本1.10170，数量100,000，方向买
账户：116804783@mail.com</p>
					<div>2016-10-17 13:21</div>
				</li>
			</ul>
			)
	}
}