import React, { Component } from 'react'
import { Icon } from 'antd-mobile'

import { linechart } from './chart';

import './style.less'

class DealDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: 0,
        }
    }

    componentDidMount() {

    }

    changeMenu = (key) => {
        this.setState(Object.assign({}, this.state, { key: key }));
    }

    /**
     * [画图表]
     * @param [type] name [description]
    */
    drawChart = () => {
        // if (document.getElementById('dealTrend')) { 
        //     linechart('dealTrend', [
        //         { incomeRate: 15, rewardRate: 20 },
        //         { incomeRate: 20, rewardRate: 25 },
        //         { incomeRate: 35, rewardRate: 36 },
        //         { incomeRate: 45, rewardRate: 30 },
        //         { incomeRate: 30, rewardRate: 47 },
        //         { incomeRate: 40, rewardRate: 30 },
        //         { incomeRate: 55, rewardRate: 48 }
        //     ])         
        // }

        setTimeout(() => {
            linechart('dealTrend', [
                { incomeRate: 15, rewardRate: 20 },
                { incomeRate: 20, rewardRate: 25 },
                { incomeRate: 35, rewardRate: 36 },
                { incomeRate: 45, rewardRate: 30 },
                { incomeRate: 30, rewardRate: 47 },
                { incomeRate: 40, rewardRate: 30 },
                { incomeRate: 55, rewardRate: 48 }
            ])
        }, 200)
    }

    render() {

        const dealRecordList = [
            { time: '4/11', dealNum: 10, type: '欧美/美元', trend: -24 },
            { time: '4/11', dealNum: 10, type: '欧美/美元', trend: 128 },
            { time: '4/11', dealNum: 10, type: '欧美/美元', trend: -24 },
            { time: '4/11', dealNum: 10, type: '欧美/美元', trend: -24 },
            { time: '4/11', dealNum: 10, type: '欧美/美元', trend: 128 }
        ];

        return (
            <div className="deal-container">
                <div className="header-box">
                    <img className="head-img" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58" />
                    <p className="userinfo">奥利维亚</p>
                    <a className="attention-btn">关注</a>
                    <div className="fans-attention">
                        <div>
                            <span className="num">888</span>
                            <span> 粉丝</span>
                        </div>
                        <div>
                            <span className="num">128</span>
                            <span> 关注</span>
                        </div>
                    </div>
                </div>

                <div className="deal-menu">
                    <div className="deal-menu-item" onClick={() => this.changeMenu(0)}>
                        <a className={this.state.key == 0 ? 'active' : ''}>交易策略</a>
                    </div>
                    <div className="deal-menu-item" onClick={() => this.changeMenu(1)}>
                        <a className={this.state.key == 1 ? 'active' : ''}>交易记录</a>
                    </div>
                </div>
                {this.state.key == 0 && (
                    <p className="legend">
                        <span>收益率</span>
                        <span>回报率</span>
                    </p>
                )}

                {this.state.key == 0 && (
                    <div id="dealTrend" style={{ width: '100%', height: '500px' }}></div>
                )}

                {this.state.key == 1 && (
                    <ul className="deal-record">
                        {dealRecordList.map((item, index) => (
                            <li key={index} className={item.trend > 0 ? 'buy' : 'sale'}>
                                <span>{item.time}</span>
                                <span>{item.type}</span>
                                <span>{item.dealNum}</span>
                                <span className={item.trend > 0 ? 'buy' : 'sale'}>{item.trend > 0 ? '买' : '卖'}</span>
                                <span className={item.trend > 0 ? 'buy' : 'sale'}>{item.trend}</span>
                                <Icon type="right" />
                            </li>
                        ))}
                    </ul>
                )}

                {this.state.key == 0 && this.drawChart()}
            </div>
        )
    }
}

export default DealDetail