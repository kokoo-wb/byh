import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class WeaponRecord extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weaponRecord: []
        }
    }
    componentWillMount() {
        Api.historyWeaponList({
            token: localStorage.getItem('token'),
            pageSize: 10,
            pageNum: 1
        }).then((res) => {
            if (res.data) {
                this.setState({
                    weaponRecord: res.data
                })
            }
        })
    }
    render() {
        const { weaponRecord } = this.state

        return (
            <div className="weapon-record">
                {weaponRecord.length > 0 && (
                    <ul>
                        {weaponRecord.map((item, index) => (
                            <li key={index}>
                                <div className="weapon-msg">
                                    <p>{item.weaponName}</p>
                                    <p>获取时间：{item.weaponCreate}</p>
                                    <p>结束时间：{item.weaponExpire}</p>
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
                        <img src={require('static/images/no_weapon.png')} />
                        <p>暂无历史武器记录</p>
                    </div>
                )}
            </div>
        )
    }
}

export default WeaponRecord