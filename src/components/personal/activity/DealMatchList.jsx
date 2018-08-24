import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class DealMatchList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matchList: []
        }
    }
    componentWillMount() {
        Api.getTaskListInfo({
            token: localStorage.getItem('token'),
            pageSize: 1,
            pageNum: 10
        }).then((res) => {
            if(res.data){
                this.setState({
                    matchList: res.data
                })
            }
        })
    }
    joinMatch = (actId) => () => {
        Api.joinMatch({
            token: localStorage.getItem('token'),
            actId: actId
        }).then((res) => {
            Toast.info(res.msg)
        })
    }
    render() {
        const { matchList } = this.state

        return (
            <ul className="deal-match-list">
                {
                    matchList.map((item,index)=>{
                        return (
                            <li key={index}>
                                <img src={item.img} onClick={() => {hashHistory.push({pathname:'/personal/dealmatchdetail',query:{id:item.id}})}}/>
                                <div className="match-msg">
                                    <div>
                                        <h1>{item.taskName}</h1>
                                        <p>距离结束：{item.endTimeString}</p>
                                    </div>
                                    <a onClick={this.joinMatch(item.id)}>参加</a>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default DealMatchList