import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class ActivityRecord extends Component {
    render() {

        return (
            <div className="activity-record">
                <ul>
                    <li>
                        <div className="record-msg">
                            <p>活动名称</p>
                            <p>活动时间：17/09/09 08:00</p>
                            <p>结&nbsp;&nbsp;&nbsp;&nbsp;果：获得奖励内容</p>
                        </div>
                    </li>

                    <li>
                        <div className="record-msg">
                            <p>活动名称</p>
                            <p>活动时间：17/09/09 08:00</p>
                            <p>结&nbsp;&nbsp;&nbsp;&nbsp;果：获得奖励内容</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ActivityRecord