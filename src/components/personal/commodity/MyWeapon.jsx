import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class MyWeapon extends Component {
    render() {

        return (
            <div className="my-weapon-container">
                <ul>
                    <li>
                        <div className="weapon-img">
                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                        </div>
                        <div className="weapon-msg">
                            <p>武器名称</p>
                            <p>兑换积分：7777</p>
                            <p>所剩数量：809</p>
                            <p>商品条件：这个是文字编辑内容</p>
                            <p>2017/09/09 00:00 到期</p>
                        </div>
                        <a className="use-btn">立即使用</a>
                    </li>

                    <li>
                        <div className="weapon-img">
                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                        </div>
                        <div className="weapon-msg">
                            <p>武器名称</p>
                            <p>兑换积分：7777</p>
                            <p>所剩数量：809</p>
                            <p>商品条件：这个是文字编辑内容</p>
                            <p>2017/09/09 00:00 到期</p>
                        </div>
                        <a className="use-btn-disable">立即使用</a>
                    </li>

                    <li>
                        <div className="weapon-img">
                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                        </div>
                        <div className="weapon-msg">
                            <p>武器名称</p>
                            <p>兑换积分：7777</p>
                            <p>所剩数量：809</p>
                            <p>商品条件：这个是文字编辑内容</p>
                            <p>2017/09/09 00:00 到期</p>
                        </div>
                        <a className="use-btn">立即使用</a>
                    </li>

                    <li>
                        <div className="weapon-img">
                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                        </div>
                        <div className="weapon-msg">
                            <p>武器名称</p>
                            <p>兑换积分：7777</p>
                            <p>所剩数量：809</p>
                            <p>商品条件：这个是文字编辑内容</p>
                            <p>2017/09/09 00:00 到期</p>
                        </div>
                        <a className="use-btn">立即使用</a>
                    </li>
                </ul>

                <div className="bonus-point">当前积分：2423</div>
            </div>
        )
    }
}

export default MyWeapon