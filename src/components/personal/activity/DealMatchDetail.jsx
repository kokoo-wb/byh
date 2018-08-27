import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class DealMatchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowReward: false,
            matchInfo: {},
            personList: []
        }
    }
    componentWillMount() {
        Api.GetMatchInfo({
            token: localStorage.getItem('token'),
            id: this.props.location.query.id
        }).then((res) => {
            if (res.data) {
                this.setState({
                    matchInfo: res.data
                })
            }
        })

        Api.getPersonListInfo({
            token: localStorage.getItem('token'),
            id: this.props.location.query.id
        }).then((res) => {
            if (res.data) {
                this.setState({
                    personList: res.data
                })
            }
        })

    }

    showReward = () => {
        this.setState(Object.assign({}, this.state, { isShowReward: !this.state.isShowReward }));
    }

    render() {
        const { matchInfo, personList } = this.state
        return (
            <div className="deal-match-detail">
                <div className="match-header">
                    <div className="end-time">
                        <img src={require('static/images/time.png')} />
                        <span>距离结束：{matchInfo.endTime}</span>
                    </div>
                    <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                </div>
                <div className="match-msg-box">
                    <h1>{matchInfo.matchName}</h1>
                    <p>
                        <label>交易时间：</label>
                        <span>{matchInfo.startTime + '-' + matchInfo.endTime}</span>
                    </p>
                    <p>
                        <label>规则以及奖励</label>
                        {!this.state.isShowReward && <a onClick={this.showReward}>展开</a>}
                    </p>
                    {this.state.isShowReward && <p className="reward-desc">规则：{matchInfo.rule}<br />奖励：{matchInfo.prize}</p>}
                    {this.state.isShowReward && <a onClick={this.showReward}>收起</a>}
                </div>
                <div className="header">
                    <span>比赛结果</span>
                    <a onClick={() => { hashHistory.push({ pathname: '/personal/dealmatchjoin', query: { id: this.props.location.query.id } }) }}>查看参赛记录</a>
                </div>
                <ul>
                    <li>
                        <span>名称</span>
                        <span>收益率</span>
                        <span>是否完成</span>
                        <span>排名</span>
                        <span></span>
                    </li>
                    {
                        personList.map(item => {
                            return (
                                <li>
                                    <span>{item.nickname}</span>
                                    <span>{item.nickname}</span>
                                    <span>{item.isFinish ? '完成' : '未完成'}</span>
                                    <span>{item.ranking}</span>
                                    <span>
                                        <a>关注</a>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>

                <div className="footer">
                    <a>抽奖记录</a>
                </div>
            </div>
        )
    }
}

export default DealMatchDetail