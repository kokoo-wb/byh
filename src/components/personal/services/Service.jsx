import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, List} from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class Service extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="service">
                <List className="service-list">
                    <Item arrow="horizontal" onClick={() => {hashHistory.push('/personal/faq')}}>常见问题</Item>
                    <Item arrow="horizontal" onClick={() => {hashHistory.push('/personal/helpcenter')}}>帮助中心</Item>
                    <Item arrow="horizontal">联系客服</Item>
                </List>
            </div>
        )
    }
}
