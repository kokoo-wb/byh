import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon} from 'antd-mobile'

import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class Faq extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            open: false,
            height: '4.2em'
        }
    }
    componentDidMount() {

    }
    onOpenChange = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleClick = () => {
        this.setState({
            height: this.state.height == 'auto' ? '4.2em' : 'auto'
        })
    }
    render() {
        return (
            <div className="faq">
                <div className="faq-item">
                    <h4>帮助内容标题</h4>
                    <div className="faq-content" style={{height: this.state.height}}>
                        内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容
                    </div>
                    <a className="open" onClick={this.handleClick}>展开</a>
                </div>
            </div>
        )
    }
}
