import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class LotteryDrawRecord extends Component {
    render() {

        return (
            <div className="lottery-draw-record">
                <ul>
                    <li>
                        <div className="record-msg">
                            <p>抽奖名称</p>
                            <p>时间：17/09/09 08:00</p>
                            <p>结果：谢谢参与</p>
                            <p>消耗：-10积分</p>
                        </div>
                    </li>

                    <li>
                        <div className="record-msg">
                            <p>抽奖名称</p>
                            <p>时间：17/09/09 08:00</p>
                            <p>结果：谢谢参与</p>
                            <p>消耗：-10积分</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default LotteryDrawRecord