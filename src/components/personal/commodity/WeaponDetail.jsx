import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class WeaponDetail extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            weaponDetail: {}
        }
    }
    componentWillMount() {
        Api.GetWeaponByWeaponObatinId({
            token: localStorage.getItem('token'),
            weaponObatinId: this.props.location.query.id
        }).then((res) => {
            if(res.data){
                this.setState({
                    weaponDetail: res.data
                })
            }
        })
    }
    activateWeapon = (weaponObatinId) => () => {
        Api.activateWeapon({
            token: localStorage.getItem('token'),
            weaponObatinId: weaponObatinId
        }).then((res) => {
            Toast.info(res.msg)
        })
    }
    deleteWeapon = (weaponObatinId) => () => {
        Api.deleteWeapon({
            token: localStorage.getItem('token'),
            weaponObatinId: weaponObatinId
        }).then((res) => {
            Toast.info(res.msg)
        })
    }
    render() {
        const { weaponDetail } = this.state

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
                    <h1>{weaponDetail.weaponName}</h1>
                    <p>兑换积分：{weaponDetail.needPoints}</p>
                    <p>有效期：{weaponDetail.weaponExpire}</p>
                    <p>兑换时间：{weaponDetail.obtainTime}</p>
                    <p>所剩时间：{weaponDetail.item}</p>
                    <p>对应平仓位：{weaponDetail.item}</p>
                    <p>浮亏补偿：{weaponDetail.item}</p>
                    <p>浮亏补偿上限（美元）：{weaponDetail.item}</p>
                    <p>获得道具后追加仓位限制：{weaponDetail.obtlimitAddPosition}</p>
                    <p>转让限制：{weaponDetail.changeUser}</p>
                    <p>武器类型：{weaponDetail.categoryName}</p>
                    <p>使用限制：{weaponDetail.obtlimitRankType}</p>
                </div>

                <div className="btn-box">
                    <a>武器历史记录</a>
                    <a onClick={this.activateWeapon(weaponDetail.id)}>立即激活</a>
                    <a onClick={this.deleteWeapon(weaponDetail.id)}>删除武器</a>
                </div>
            </div>
        )
    }
}

export default WeaponDetail