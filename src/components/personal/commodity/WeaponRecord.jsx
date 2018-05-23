import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class WeaponRecord extends Component {
    render() {

        return (
            <div className="weapon-record">
                <ul>
                    <li>
                        <div className="weapon-msg">
                            <p>武器名称</p>
                            <p>获取时间：17/09/09 08:00</p>
                            <p>结束时间：17/09/09 08:00</p>
                            <p>途径：活动</p>
                            <p>状态：激活</p>
                        </div>
                        <a className="show-btn">查看</a>
                    </li>

                    <li>
                        <div className="weapon-msg">
                            <p>武器名称</p>
                            <p>获取时间：17/09/09 08:00</p>
                            <p>结束时间：17/09/09 08:00</p>
                            <p>途径：活动</p>
                            <p>状态：激活</p>
                        </div>
                        <a className="show-btn">查看</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default WeaponRecord