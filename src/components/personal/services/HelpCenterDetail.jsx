import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, List} from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

import * as Api from '../../../services';

export default class Service extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            data: {}
        }
    }
    componentWillMount() {
        Api.getHelpersById({
            id: this.props.location.query.id
        }).then((res) => {
            if(res.data){
                this.setState({
                    data: res.data
                })
            }
        })
    }
    componentDidMount() {

    }
    render() {
        const { data } = this.state
        return (
            <div className="help-center-detail">
                <div className="detail-item">
                    <h4>{data.articleTitle}</h4>
                    <p dangerouslySetInnerHTML={{__html: data.htmlInfo}}></p>
                </div>
            </div>
        )
    }
}
