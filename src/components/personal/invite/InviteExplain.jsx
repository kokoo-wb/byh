import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class InviteExplain extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }   
    render() {
        return (
            <div className="invite-explain">
                <h4>邀请码说明</h4>
                <p>
                英国时间 4 月 24 日，伦敦旅游网站 Culture Trip 宣布，获得由 PPF Group 领投的 8000 万美元 B 轮投资，本轮过后，其融资总额已达 1.03 亿美元。
    Culture Trip 是一个提供旅游和文化内容的门户网站，用户可以在网页或 App 上浏览文章、照片及视频。网站与全球 300 多名付费作者合作，目前每月有约 1300 万的访客，主要集中于 20-30 岁，手机应用的下载量达到 85 万次。
     创始人 Kris Naudts 曾是一名精神科医生，他一直喜欢分享故事和文化，强调不想让 Culture Trip 变成一个无趣的内容工厂，而要 “激励人们探索世界各地的文化和新事物”。
                </p>
            </div>
        )
    }
}
