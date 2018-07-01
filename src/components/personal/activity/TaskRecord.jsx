import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class TaskRecord extends Component {
    render() {

        return (
            <div className="task-record">
                <div className="header">任务名称</div>
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
                    <li>
                        <span>毛军林...</span>
                        <span>+78</span>
                        <span>+78%</span>
                        <span>+78%</span>
                        <span>12323</span>
                        <span>1</span>
                        <span>
                            <a>关注</a>
                        </span>
                    </li>
                    <li>
                        <span>毛军林...</span>
                        <span>+78</span>
                        <span>+78%</span>
                        <span>+78%</span>
                        <span>12323</span>
                        <span>1</span>
                        <span>
                            <a>关注</a>
                        </span>
                    </li>
                    <li>
                        <span>毛军林...</span>
                        <span>+78</span>
                        <span>+78%</span>
                        <span>+78%</span>
                        <span>12323</span>
                        <span>1</span>
                        <span>
                            <a>关注</a>
                        </span>
                    </li>
                    <li>
                        <span>毛军林...</span>
                        <span>+78</span>
                        <span>+78%</span>
                        <span>+78%</span>
                        <span>12323</span>
                        <span>1</span>
                        <span>
                            <a>关注</a>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TaskRecord