import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, List} from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class MyDeal extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="my-deal">
                <div className="deal-info">
                    <div className="info-item">
                        <p>总资产</p>
                        <i>13,980.00</i>
                    </div>
                    <div className="info-item">
                        <p>可用资产</p>
                        <i>2,730.00</i>
                    </div>
                    <div className="info-item">
                        <p>保证金</p>
                        <i>11,250.00</i>
                    </div>
                    <div className="info-item">
                        <p>浮动盈亏</p>
                        <i>-200.80</i>
                    </div>
                </div>
                <List className="deal-list">
                    <Item arrow="horizontal">存/取款</Item>
                    <Item arrow="horizontal">收支明细</Item>
                    <Item arrow="horizontal">交易历史</Item>
                </List>
            </div>
        )
    }
}
