import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class MyWeapon extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            weaponList: [],
            points: 0
        }
    }
    componentWillMount() {
        Api.getWeaponListByToKen({
            token: localStorage.getItem('token'),
            pageSize: 10,
            pageNum: 1
        }).then((res) => {
            if(res.data){
                this.setState({
                    weaponList: res.data.list,
                    points: res.data.points
                })
            }
        })
    }
    render() {
        const { weaponList, points } = this.state

        return (
            <div className="my-weapon-container">
                {
                    weaponList.length>0? (<ul>
                        {
                            weaponList.map(item=>{
                                return (
                                    <li onClick={() => {hashHistory.push({pathname:'/personal/weapondetail',query:{id:item.id}})}}>
                                        <div className="weapon-img">
                                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                                        </div>
                                        <div className="weapon-msg">
                                            <p>{item.weaponName}</p>
                                            <p>兑换积分：{item.needPoints}</p>
                                            <p>所剩数量：{item.num}</p>
                                            <p>商品条件：{item.Info}</p>
                                            <p>{item.weaponExpire} 到期</p>
                                        </div>
                                        <a className={item.weaponStatus==1?"use-btn-disable":"use-btn"}>{item.weaponStatus==1?'不可使用':'立即使用'}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>) : (<div style={{textAlign: 'center', marginTop: 100}}>暂无内容^_^!!</div>)
                }

                <div className="bonus-point">当前积分：{points}</div>
            </div>
        )
    }
}

export default MyWeapon