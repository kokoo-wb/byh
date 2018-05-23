import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, List} from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class PushSetting extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="push-setting">
                推送设置
            </div>
        )
    }
}
