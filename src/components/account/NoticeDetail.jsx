import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { CommonHeader } from 'component/header'

export default class NoticeDetail extends Component {
	render() {
		return (
			<div className="rt-notice-detail">
		        <CommonHeader title="公告"/>
		        <div className="detail-top">
		          <h3 className="-title">关于开通借记卡支付通道的通知</h3>
		          <p className="-time">2016-05-10 09:21:47</p>
		        </div>
		        <article>
		          <span className="first"></span>
		          和讯外汇消息 亚洲交易时间段盘初，离岸人民币兑美元汇率跌破6.54至6.5447，为3月3日以来的最低位。隔夜，离岸人民币大幅下挫263个点，收于6.5407.今日，人民币兑美元中间价报6.5233元，较上个交易日（6.5105元）下调128个点。目前，在岸人民币报6.5133，内外汇价价差扩大近300点。
		        </article>
		        {/*<div className="rt-padding-lr">
		          <Button className="cm-main-button -blue">
		                确定
		          </Button>
		        </div>*/}
		          
		      </div>
			)
	}
}