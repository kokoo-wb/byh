import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class TaskList extends Component {
    render() {

        return (
            <ul className="task-list">
                <li>
                    <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                    <div className="match-msg">
                        <div>
                            <h1>任务比赛名称</h1>
                            <p>距离结束：00:00:00:00</p>
                        </div>
                        <a>参加</a>
                    </div>
                </li>

                <li>
                    <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                    <div className="match-msg">
                        <div>
                            <h1>任务比赛名称</h1>
                            <p>距离结束：00:00:00:00</p>
                        </div>
                        <a>参加</a>
                    </div>
                </li>

                <li>
                    <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                    <div className="match-msg">
                        <div>
                            <h1>任务比赛名称</h1>
                            <p>距离结束：00:00:00:00</p>
                        </div>
                        <a>参加</a>
                    </div>
                </li>
            </ul>
        )
    }
}

export default TaskList