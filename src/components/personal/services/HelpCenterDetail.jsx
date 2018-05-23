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
            <div className="help-center-detail">
                <div className="detail-item">
                    <h4>1.问题</h4>
                    <p>回答：后台输入的文字后台输入的问题后台输入的文字后台输入的问题</p>
                </div>
                <div className="detail-item">
                    <h4>2.问题</h4>
                    <p>回答：后台输入的文字后台输入的问题后台输入的文字后台输入的问题</p>
                </div>
                <div className="detail-item">
                    <h4>3.问题问题问题</h4>
                    <p>回答：后台输入的文字后台输入的问题后台输入的文字后台输入的问题回答：后台输入的文字后台输入的问题后台输入的文字后台输入的问题回答：后台输入的文字后台输入的问题后台输入的文字后台输入的问题回答：后台输入的文字后台输入的问题后台输入的文字后台输入的问题</p>
                    <img src="../../../statics/images/banner.png" />
                </div>
            </div>
        )
    }
}
