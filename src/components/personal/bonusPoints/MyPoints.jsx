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

export default class MyPoints extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="my-point">
                <div className="bonus-point">
                    <div className="bonus-point-level">
                        <p>LV46</p>
                    </div>

                    <div className="bonus-point-num">
                        <span>当前积分：2000</span>
                        <span>79/100</span>
                    </div>

                    <div className="bonus-point-progress">
                        <div className="progress-bar" style={{ width: '30%' }}></div>
                    </div>

                    <div className="bonus-point-btns">
                        <a className="exchange-bonus-btn">兑积分</a>
                        <a className="earn-bonus-btn">赚积分</a>
                    </div>
                    <a className="bounus-point-instro">积分说明</a>
                </div>
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={this.callback} 
                    animated={false}
                >
                    <TabPane tab="赚取记录" key="1">
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
                    <TabPane tab="兑换记录" key="2">
                        <List className="my-list">
                            <Item multipleLine extra={<a style={{color: 'red'}}>+80积分</a>}>
                                我邀请了xxx加入 <Brief>2018/5/26 09:00</Brief>
                            </Item>
                            <Item multipleLine extra={<a style={{color: 'red'}}>+80积分</a>}>
                                我邀请了xxx加入 <Brief>2018/5/26 09:00</Brief>
                            </Item>
                            <Item multipleLine extra={<a style={{color: 'red'}}>+80积分</a>}>
                                我邀请了xxx加入 <Brief>2018/5/26 09:00</Brief>
                            </Item>
                            <Item multipleLine extra={<a style={{color: 'red'}}>+80积分</a>}>
                                我邀请了xxx加入 <Brief>2018/5/26 09:00</Brief>
                            </Item>
                        </List>
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