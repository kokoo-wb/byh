import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, List} from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class BindThirdParty extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="bind-third">
                <List className="bind-third-list">
                    <Item arrow="horizontal" extra={<a className="extra-text">112****9231</a>}>手机号码</Item>
                    <Item arrow="horizontal" extra={<a className="extra-text">去绑定</a>}>绑定微信登录</Item>
                    <Item arrow="horizontal" extra={<a className="extra-text">去绑定</a>}>绑定QQ登录</Item>
                    <Item arrow="horizontal" extra={<a className="extra-text">去绑定</a>}>绑定微博登录</Item>
                </List>
            </div>
        )
    }
}
