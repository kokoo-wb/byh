import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon} from 'antd-mobile'

import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

import * as Api from '../../../services';

export default class Faq extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            faqList: []
        }
    }
    componentWillMount() {
        Api.getQuestionsList({}).then((res) => {
            if(res.data){
                this.setState({
                    faqList: res.data
                })
            }
        })
    }
    componentDidMount() {

    }
    render() {
        const { faqList } = this.state
        
        return (
            <div className="faq">
                {
                    faqList.length>0?faqList.map(item=>{
                        return <FaqItem title={item.articleTitle} content={item.htmlInfo}/>
                    }):<div style={{textAlign: 'center', marginTop: 100}}>暂无内容^_^!!</div>
                }
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
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                    <div className="ellipsis" style={{display: ellipsis&&!open?'block':'none'}}>...</div>
                </div>
                <a className="open" onClick={this.onOpenChange} style={{display: ellipsis?'block':'none'}}>{open?'收起':'展开'}</a>
            </div>
        )
    }
}
