import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import * as Api from '../../../services';

class Fans extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            fansList: []
        }
    }
    componentWillMount() {
        Api.myFansList({
            token: localStorage.getItem('token')
        }).then((res) => {
            if(res.data){
                this.setState({
                    fansList: res.data
                })
            }
        })
    }
    componentDidMount() {
        
    }
    handleFocus = (friendUid) => () => {
        Api.waitFocusList({
            token: localStorage.getItem('token'),
            friendUid: friendUid
        }).then((res) => {
            console.log(res)
        })
    }
    handleCancelFocus = (friendUid) => () => {
        Api.cancelFocus({
            token: localStorage.getItem('token'),
            friendUid: friendUid
        }).then((res) => {
            console.log(res)
        })
    }
    render() {
        const { fansList } = this.state
        // const fansList = [
        //     {
        //         img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58',
        //         name: '奥利维亚',
        //         level: 88,
        //         incomeRate: '27.89%',
        //         winRate: '27.89%',
        //         profitAndLoss: 2678,
        //         avgTime: 2678,
        //         backRate: '27.89%',
        //         dealNum: 27
        //     },
        //     {
        //         img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58',
        //         name: '奥利维亚',
        //         level: 88,
        //         incomeRate: '27.89%',
        //         winRate: '27.89%',
        //         profitAndLoss: 2678,
        //         avgTime: 2678,
        //         backRate: '27.89%',
        //         dealNum: 27
        //     }
        // ];

        return (
            <div className="fans">
                {fansList.length > 0 ? (
                    <ul className="fans-list">
                        {fansList.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className="header">
                                        <div className="user">
                                            <img src={item.headImg} />
                                            <span>{item.nickName}</span>
                                            <div className="level">
                                                <img src={require('../../../statics/images/level.png')} />
                                                <span>LV{item.level}</span>
                                            </div>
                                        </div>
                                        {
                                            item.isFocus==0? <a className="attention-btn" onClick={this.handleFocus(item.id)}>关注</a>:<a className="attention-btn" onClick={this.handleCancelFocus(item.id)}>取消关注</a>
                                        }
                                    </div>
                                    <div className="fans-list-item">
                                        <img src="http://119.29.0.81:7012/work/archetype/%E4%BD%B0%E7%9B%8A%E6%B1%87_%E5%85%A8%E5%9F%8E%E6%8F%A1%E6%89%8BApp_Android&iOS_%E5%90%8E%E5%8F%B0_0901_12/%E5%89%8D%E7%AB%AF1219Android&iOS/%E5%89%8D%E7%AB%AF%E5%8E%9F%E5%9E%8B0126/images/%E5%88%97%E8%A1%A8%E8%AF%B4%E6%98%8E/u262.png" />
                                        <div className="data-msg">
                                            <div className="data--msg-item">
                                                <p className="label">总收益</p>
                                                <p className="data-num1">{item.incomeRate}</p>
                                            </div>
                                            <div className="data--msg-item">
                                                <p className="label">总胜率</p>
                                                <p className="data-num1">{item.winRate}</p>
                                            </div>
                                        </div>
                                        <div className="data-msg">
                                            <div className="data--msg-item">
                                                <p className="label">盈亏点数</p>
                                                <p className="data-num2">{item.profitAndLoss}点</p>
                                            </div>
                                            <div className="data--msg-item">
                                                <p className="label">平均持仓时间</p>
                                                <p className="data-num2">{item.avgTime}点</p>
                                            </div>
                                        </div>
                                        <div className="data-msg">
                                            <div className="data--msg-item">
                                                <p className="label">最大回撤率</p>
                                                <p className="data-num3">{item.backRate}</p>
                                            </div>
                                            <div className="data--msg-item">
                                                <p className="label">交易笔数</p>
                                                <p className="data-num3">{item.dealNum}笔</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                        <div className="nodata">
                            <img src={require('../../../statics/images/no_user.png')} />
                            <p>当前还没有粉丝</p>
                        </div>
                    )}
            </div>

        )
    }
}

export default Fans