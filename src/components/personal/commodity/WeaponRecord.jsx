import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class WeaponRecord extends Component {
    render() {

        const weaponRecord = [
            {
                weaponName: '武器名称',
                startTime: '17/09/09 08:00',
                endTime: '17/09/09 08:00',
                way: '活动',
                status: '激活'
            },
            {
                weaponName: '武器名称',
                startTime: '17/09/09 08:00',
                endTime: '17/09/09 08:00',
                way: '活动',
                status: '激活'
            }
        ];

        return (
            <div className="weapon-record">
                {weaponRecord.length > 0 && (
                    <ul>
                        {weaponRecord.map((item, index) => (
                            <li key={index}>
                                <div className="weapon-msg">
                                    <p>{item.weaponName}</p>
                                    <p>获取时间：{item.startTime}</p>
                                    <p>结束时间：{item.endTime}</p>
                                    <p>途径：{item.way}</p>
                                    <p>状态：{item.status}</p>
                                </div>
                                <a className="show-btn">查看</a>
                            </li>
                        ))}
                    </ul>
                )}

                {weaponRecord.length <= 0 && (
                    <div className="nodata">
                        <img src={require('../../../statics/images/no_weapon.png')} />
                        <p>暂无历史武器记录</p>
                    </div>
                )}
            </div>
        )
    }
}

export default WeaponRecord