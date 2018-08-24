import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class DealMatchJoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordList: []
        }
    }
    componentWillMount() {
        Api.getMatch({
            token: localStorage.getItem('token'),
            id: this.props.location.query.id
        }).then((res) => {
            if(res.data){
                this.setState({
                    recordList: res.data
                })
            }
        })
        
    }
    render() {
        const { recordList } = this.state

        return (
            <div className="deal-match-join">
                <div className="header">比赛名称</div>
                <ul>
                    <li>
                        <span>名称</span>
                        <span>收益($)</span>
                        <span>收益率</span>
                        <span>回报率</span>
                        <span>交易笔数</span>
                        <span>排名</span>
                        <span></span>
                    </li>
                    {
                        recordList.map(item=>{
                            return (
                                <li>
                                    <span>{item.nickname}</span>
                                    <span>{item.earnings}</span>
                                    <span>{item.dollarYield}</span>
                                    <span>{item.returnYield}</span>
                                    <span>{item.number}</span>
                                    <span>{item.ranking}</span>
                                    <span>
                                        <a>关注</a>
                                    </span>
                                </li>  
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default DealMatchJoin