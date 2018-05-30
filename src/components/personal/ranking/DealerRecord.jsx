import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class DealerRecord extends Component {
    render() {

        return (
            <div className="dealer-record">
                <div className="deal-menu">
                    <div className="deal-menu-item" onClick={() => this.changeMenu(0)}>
                        <a className="active">持仓列表</a>
                    </div>
                    <div className="deal-menu-item" onClick={() => this.changeMenu(1)}>
                        <a>交易历史列表</a>
                    </div>
                </div>

                <div className="thead">
                    <span>交易</span>
                    <span>开启关闭</span>
                    <span>获利</span>
                </div>

                <ul>
                    <li>
                        <div className="dealer-record-top">
                            <div>
                                <p>0.02BUY</p>
                                <p>EUR/USD</p>
                            </div>
                            <div className="on-and-off">
                                <p>
                                    <span>2017-09-16 16:15:11</span>
                                    <span>1.189772...</span>
                                </p>
                                <p>
                                    <span>2017-09-16 16:15:11</span>
                                    <span>1.189772...</span>
                                </p>
                            </div>
                            <div className="income-num">
                                <p>1.8pips</p>
                                <p>$3.98</p>
                            </div>
                        </div>

                        <div className="dealer-record-bottom">
                            <span>dodoleFx</span>
                            <span>
                                <img src={require('../../../statics/images/dealerrecord_ico.png')} />
                                <span style={{ marginLeft: '10px' }}>12/-2</span>
                            </span>
                            <span>总和：1345, $3.98</span>
                        </div>
                    </li>

                    <li>
                        <div className="dealer-record-top">
                            <div>
                                <p>0.02BUY</p>
                                <p>EUR/USD</p>
                            </div>
                            <div className="on-and-off">
                                <p>
                                    <span>2017-09-16 16:15:11</span>
                                    <span>1.189772...</span>
                                </p>
                                <p>
                                    <span>2017-09-16 16:15:11</span>
                                    <span>1.189772...</span>
                                </p>
                            </div>
                            <div className="income-num">
                                <p>1.8pips</p>
                                <p>$3.98</p>
                            </div>
                        </div>

                        <div className="dealer-record-bottom">
                            <span>dodoleFx</span>
                            <span>
                                <img src={require('../../../statics/images/dealerrecord_ico.png')} />
                                <span style={{ marginLeft: '10px' }}>12/-2</span>
                            </span>
                            <span>总和：1345, $3.98</span>
                        </div>
                    </li>

                    <li>
                        <div className="dealer-record-top">
                            <div>
                                <p>0.02BUY</p>
                                <p>EUR/USD</p>
                            </div>
                            <div className="on-and-off">
                                <p>
                                    <span>2017-09-16 16:15:11</span>
                                    <span>1.189772...</span>
                                </p>
                                <p>
                                    <span>2017-09-16 16:15:11</span>
                                    <span>1.189772...</span>
                                </p>
                            </div>
                            <div className="income-num">
                                <p>1.8pips</p>
                                <p>$3.98</p>
                            </div>
                        </div>

                        <div className="dealer-record-bottom">
                            <span>dodoleFx</span>
                            <span>
                                <img src={require('../../../statics/images/dealerrecord_ico.png')} />
                                <span style={{ marginLeft: '10px' }}>12/-2</span>
                            </span>
                            <span>总和：1345, $3.98</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DealerRecord