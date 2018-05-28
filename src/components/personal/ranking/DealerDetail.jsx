import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import { linechart } from './chart';

import './style.less'

class DealerDetail extends Component {
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
        //         { incomeRate: 15, avgBackRate: 20, maxBackRate: 30 },
        //         { incomeRate: 20, avgBackRate: 25, maxBackRate: 40 },
        //         { incomeRate: 35, avgBackRate: 36, maxBackRate: 35 },
        //         { incomeRate: 45, avgBackRate: 30, maxBackRate: 45 },
        //         { incomeRate: 30, avgBackRate: 47, maxBackRate: 50 },
        //         { incomeRate: 40, avgBackRate: 30, maxBackRate: 60 },
        //         { incomeRate: 55, avgBackRate: 48, maxBackRate: 56 }
        //     ])         
        // }

        setTimeout(() => {
            linechart('dealTrend', [
                { incomeRate: 15, avgBackRate: 20, maxBackRate: 30 },
                { incomeRate: 20, avgBackRate: 25, maxBackRate: 40 },
                { incomeRate: 35, avgBackRate: 36, maxBackRate: 35 },
                { incomeRate: 45, avgBackRate: 30, maxBackRate: 45 },
                { incomeRate: 30, avgBackRate: 47, maxBackRate: 50 },
                { incomeRate: 40, avgBackRate: 30, maxBackRate: 60 },
                { incomeRate: 55, avgBackRate: 48, maxBackRate: 56 }
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
                    <p className="goodat">擅长：美元/欧元</p>
                    <p className="begintime">开户日期：2017/01/01</p>
                    <div className="btn-box">
                        <a className="attention-btn">关注</a>
                        <a className="attention-btn">关注</a>
                    </div>

                    <div className="ace-attention">
                        <div>
                            <span className="num">888</span>
                            <span> 粉丝</span>
                        </div>
                        <div>
                            <span className="num">128</span>
                            <span> 关注</span>
                        </div>
                        <div>
                            <span className="num">2732</span>
                            <span>名 粉丝</span>
                        </div>
                    </div>
                </div>

                <div className="deal-data">
                    <div className="deal-data-item">
                        <div>
                            <p>总收益</p>
                            <p>27.89%</p>
                        </div>
                        <div>
                            <p>盈亏点数</p>
                            <p>2789点</p>
                        </div>
                        <div>
                            <p>最大回撤率</p>
                            <p>27.89%</p>
                        </div>
                    </div>
                    <div className="deal-data-item">
                        <div>
                            <p>总胜率</p>
                            <p>27.89%</p>
                        </div>
                        <div>
                            <p>平均持仓时间</p>
                            <p>2789点</p>
                        </div>
                        <div>
                            <p>交易笔数</p>
                            <p>27.89%</p>
                        </div>
                    </div>
                </div>

                <div className="deal-menu">交易策略</div>
                {this.state.key == 0 && (
                    <p className="legend">
                        <span>获益率</span>
                        <span>平均回撤率</span>
                        <span>最大回撤率</span>
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

export default DealerDetail