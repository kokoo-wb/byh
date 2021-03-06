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

export default class InviteFriends extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            data: {}
        }
    }
    componentWillMount() {
        Api.getMyInviteCode({
            token: localStorage.getItem('token')
        }).then((res) => {
            if(res.data){
                this.setState({
                    data: res.data
                })
            }
        })
    }
    componentDidMount() {

    }   
    render() {
        const { data } = this.state
        return (
            <div className="invite-friends">
                <div className="invite-code">
                    <div className="code-con">
                        <img src={data.inviteCodeUrl} />
                        <h1>{data.invitationCode}</h1>
                        <p onClick={() => {hashHistory.push('/personal/inviteexplain')}}>邀请说明<Icon type="right"/></p>
                        <i className="share-icon"></i>
                    </div>
                </div>
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={this.callback} 
                    animated={false}
                >
                    <TabPane tab="最新十单" key="1">
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
                    <TabPane tab="本月" key="2">
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
                    <TabPane tab="全部" key="3">
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
                </Tabs>
            </div>
        )
    }
}
