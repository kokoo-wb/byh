import React, { Component } from 'react'
import { Icon } from 'antd-mobile'

import './style.less'

class DealMatch extends Component {
    render() {

        return (
            <div className="deal-match">
                <div className="select-match">
                    <span>交易比赛</span>
                    <Icon type="down" />
                </div>
                <ul>
                    <li>
                        <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                        <div className="match-msg">
                            <div>
                                <h1>交易比赛名称</h1>
                                <p>
                                    <span>当前第一名：</span>
                                    <span>alliali</span>
                                </p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                        <div className="match-msg">
                            <div>
                                <h1>交易比赛名称</h1>
                                <p>
                                    <span>当前第一名：</span>
                                    <span>alliali</span>
                                </p>
                            </div>
                        </div>
                    </li>

                    <li>
                        <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                        <div className="match-msg">
                            <div>
                                <h1>交易比赛名称</h1>
                                <p>
                                    <span>当前第一名：</span>
                                    <span>alliali</span>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DealMatch