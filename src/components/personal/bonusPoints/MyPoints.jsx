import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { List, Tabs, Icon } from 'antd-mobile'
const TabPane = Tabs.TabPane
const Item = List.Item
const Brief = Item.Brief
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

import * as Api from '../../../services';

export default class MyPoints extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            data: {},
            pointsList: []
        }
    }
    componentWillMount() {
        Api.pointCenter({
            token: localStorage.getItem('token')
        }).then((res) => {
            if(res.data){
                this.setState({
                    data: res.data
                })
            }
        })

        Api.logInvite({
            token: localStorage.getItem('token')
        }).then((res) => {
            if(res.data){
                this.setState({
                    pointsList: res.data
                })
            }
        })
    }
    componentDidMount() {

    }

    render() {
        const { data, pointsList } = this.state

        return (
            <div className="my-point">
                <div className="bonus-point">
                    <div className="bonus-point-level">
                        <p>LV{data.level}</p>
                        <img src={require('../../../statics/images/bonuspoint.png')} />
                    </div>

                    <div className="bonus-point-num">
                        <span>当前积分：{data.points}</span>
                        <span>79/100</span>
                    </div>

                    <div className="bonus-point-progress">
                        <div className="progress-bar" style={{ width: '30%' }}></div>
                    </div>

                    <div className="bonus-point-btns">
                        <a className="exchange-bonus-btn">兑积分</a>
                        <a className="earn-bonus-btn">赚积分</a>
                    </div>
                    <a className="bounus-point-instro" onClick={() => {hashHistory.push('/personal/pointsinstro')}}>积分说明</a>
                </div>
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={this.callback} 
                    animated={false}
                >
                    <TabPane tab="赚取记录" key="1">
                        <div className="earn-record">
                            {
                                pointsList.length>0 ? pointsList.map(item=>{
                                    return <div className="earn-item">
                                    <div className="earn-item-left">
                                        <p className="earn-item-title">{item.description}</p>
                                        <p className="earn-item-date">{item.createDate}</p>
                                    </div>
                                    <div className="earn-item-right">
                                        <p className="earn-item-point">+{item.incPoint}积分</p>
                                        <p className="earn-item-sum">当前总积分 {item.point}</p>
                                    </div>
                                </div>
                                }) : <div style={{textAlign: 'center', marginTop: 100}}>暂无内容^_^!!</div>
                            }
                        </div>
                    </TabPane>
                    <TabPane tab="兑换记录" key="2">
                        <div className="earn-record">
                            <div className="earn-item">
                                <div className="earn-item-left">
                                    <p className="earn-item-title">我邀请了xxx加入</p>
                                    <p className="earn-item-date">2017/09/09 09:00</p>
                                </div>
                                <div className="earn-item-right">
                                    <p className="earn-item-point">+80积分</p>
                                    <p className="earn-item-sum">当前总积分 70</p>
                                </div>
                            </div>
                            <div className="earn-item">
                                <div className="earn-item-left">
                                    <p className="earn-item-title">我邀请了xxx加入</p>
                                    <p className="earn-item-date">2017/09/09 09:00</p>
                                </div>
                                <div className="earn-item-right">
                                    <p className="earn-item-point">+80积分</p>
                                    <p className="earn-item-sum">当前总积分 70</p>
                                </div>
                            </div>
                            <div className="earn-item">
                                <div className="earn-item-left">
                                    <p className="earn-item-title">我邀请了xxx加入</p>
                                    <p className="earn-item-date">2017/09/09 09:00</p>
                                </div>
                                <div className="earn-item-right">
                                    <p className="earn-item-point">+80积分</p>
                                    <p className="earn-item-sum">当前总积分 70</p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="活动记录" key="3">
                        <div className="act-record">
                            <div className="activity-item">
                                <div className="activity-item-left">
                                    <p className="activity-item-title">我邀请了xxx加入</p>
                                    <p className="activity-item-date">活动时间：2017/09/09 09:00</p>
                                    <p className="activity-item-result">结果：获得奖励内容</p>
                                </div>
                                <div className="activity-item-right">
                                    <p className="activity-item-status">已发放</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-item-left">
                                    <p className="activity-item-title">我邀请了xxx加入</p>
                                    <p className="activity-item-date">活动时间：2017/09/09 09:00</p>
                                    <p className="activity-item-result">结果：获得奖励内容</p>
                                </div>
                                <div className="activity-item-right">
                                    <p className="activity-item-status">审核中</p>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-item-left">
                                    <p className="activity-item-title">我邀请了xxx加入</p>
                                    <p className="activity-item-date">活动时间：2017/09/09 09:00</p>
                                    <p className="activity-item-result">结果：获得奖励内容</p>
                                </div>
                                <div className="activity-item-right">
                                    <p className="activity-item-status">已寄出</p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}