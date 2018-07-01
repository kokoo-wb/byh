import React, {Component} from 'react'
import ReactDOM from 'react-dom'
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

        }
    }
    componentDidMount() {

    }
    render() {
        const content = "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
        return (
            <div className="faq">
                <FaqItem title={'帮助内容标题'} content={content}/>
                <FaqItem title={'帮助内容标题'} content={'内容内容内容内容'}/>
                <FaqItem title={'帮助内容标题'} content={content}/>
            </div>
        )
    }
}

class FaqItem extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            open: false,
            maxHeight: 40*2,
            ellipsis: false
        }
    }
    componentDidMount() {
        let {maxHeight} = this.state
        if(this.refs.content.clientHeight > maxHeight){
            this.setState({
                ellipsis: true
            })
        }
    }
    onOpenChange = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        let {title,content} = this.props
        let {open,ellipsis,maxHeight} = this.state

        return (
            <div className="faq-item" style={{paddingBottom: ellipsis&&open? '60px':'30px'}}>
                <h4 className="faq-title">{title}</h4>
                <div className="faq-content" ref="content" style={{height: ellipsis&&!open?maxHeight:'auto'}}>
                    {content}
                    <div className="ellipsis" style={{display: ellipsis&&!open?'block':'none'}}>...</div>
                </div>
                <a className="open" onClick={this.onOpenChange} style={{display: ellipsis?'block':'none'}}>{open?'收起':'展开'}</a>
            </div>
        )
    }
}
