import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { List } from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class HistoryRecord extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }   
    render() {
        return (
            <div className="history-record">
                <List className="my-list">
                    <Item extra={'04-11 15:10'}>开仓时间</Item>
                    <Item extra={'欧元/美元'}>商品</Item>
                    <Item extra={'10'}>数量</Item>
                    <Item extra={'3127'}>开仓价格</Item>
                    <Item extra={'买'}>方向</Item>
                    <Item extra={'1.10044'}>开仓价</Item>
                    <Item extra={'1.10044'}>止盈</Item>
                    <Item extra={'1.10044'}>止损</Item>
                    <Item extra={'是'}>持仓过夜</Item>
                    <Item extra={'$12334.00'}>平仓价</Item>
                    <Item extra={'$12334.00'}>补充总额</Item>
                    <Item extra={'商品名称'}>商品名称</Item>
                    <Item extra={'获取时间'}>2018-5-26</Item>
                    <Item extra={'活动'}>途径</Item>
                    <Item extra={'2018-6-26'}>结束时间</Item>
                    <Item extra={'￥888'}>止损值</Item>
                    <Item extra={'激活'}>状态</Item>
                </List>
            </div>
        )
    }
}
