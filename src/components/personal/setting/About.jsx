import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon} from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class About extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="about">
                <h1>佰益匯</h1>
                <h4>BY<i>TRADER</i></h4>
                <p>后台输入的文字后台输入的文字后台输入的文字后台输入的文字后台输入的文字后台输入的文字后台输入的文字</p>
            </div>
        )
    }
}
