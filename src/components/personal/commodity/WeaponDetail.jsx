import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class WeaponDetail extends Component {
    render() {

        return (
            <div className="weapon-detail">
                <div className="header-box">
                    <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                    <div className="curr-income">
                        <span>当前效益</span>
                        <span> +80 美元</span>
                    </div>
                </div>

                <div className="weapon-msg">
                    <h1>武器名称</h1>
                    <p>兑换积分：7777</p>
                    <p>有效期：一年</p>
                    <p>兑换时间：2018/10/27 09:00</p>
                    <p>所剩时间：123天18小时22分</p>
                    <p>对应平仓位：美元兑日元</p>
                    <p>浮亏补偿：80%</p>
                    <p>浮亏补偿上限（美元）：10000</p>
                    <p>获得道具后追加仓位限制：有</p>
                    <p>转让限制：有</p>
                    <p>武器类型：盾</p>
                    <p>使用限制：初级用户</p>
                </div>

                <div className="btn-box">
                    <a>武器历史记录</a>
                    <a>立即激活</a>
                    <a>删除武器</a>
                </div>
            </div>
        )
    }
}

export default WeaponDetail