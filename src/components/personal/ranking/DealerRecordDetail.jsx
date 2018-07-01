import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class DealerRecordDetail extends Component {
    render() {

        return (
            <ul className="dealer-record-detail">
                <li>
                    <span>开仓时间</span>
                    <span>04-11 15:10</span>
                </li>
                <li>
                    <span>商品</span>
                    <span>欧元/美元</span>
                </li>
                <li>
                    <span>数量</span>
                    <span>
                        <p>10</p>
                        <p>x 10万欧元</p>
                    </span>
                </li>
                <li>
                    <span>开仓价格</span>
                    <span>3127</span>
                </li>
                <li>
                    <span>方向</span>
                    <span>买</span>
                </li>
                <li>
                    <span>开仓价</span>
                    <span>1.10044</span>
                </li>
                <li>
                    <span>止盈</span>
                    <span>1.10044</span>
                </li>
                <li>
                    <span>止损</span>
                    <span>1.10044</span>
                </li>
                <li>
                    <span>持仓过夜</span>
                    <span>是</span>
                </li>
                <li>
                    <span>平仓价</span>
                    <span>$12334.00</span>
                </li>
                <li>
                    <span>补充总额</span>
                    <span>$12334.00</span>
                </li>
                <li>
                    <span>商品名称</span>
                    <span>商品名称</span>
                </li>
                <li>
                    <span>获取时间</span>
                    <span>2016-04-11 15:10</span>
                </li>
                <li>
                    <span>途径</span>
                    <span>活动</span>
                </li>
                <li>
                    <span>结束时间</span>
                    <span>2016-04-11 15:10</span>
                </li>
                <li>
                    <span>止损值</span>
                    <span>￥888</span>
                </li>
                <li>
                    <span>状态</span>
                    <span>激活</span>
                </li>
            </ul>
        )
    }
}

export default DealerRecordDetail