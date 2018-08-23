import React, { Component } from 'react'
import { Icon } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowReward: false,
            taskInfo: {},
            personList: []
        }
    }
    componentWillMount() {
        Api.getTaskInfo({
            token: localStorage.getItem('token'),
            id: this.props.location.query.id
        }).then((res) => {
            if(res.data){
                this.setState({
                    taskInfo: res.data
                })
            }
        })

        Api.getPersonListInfo({
            token: localStorage.getItem('token'),
            id: this.props.location.query.id
        }).then((res) => {
            if(res.data){
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
        const { taskInfo, personList } = this.state

        return (
            <div className="task-detail">
                <div className="match-header">
                    <div className="end-time">
                        <img src={require('../../../statics/images/time.png')} />
                        <span>距离结束：{taskInfo.endTime}</span>
                    </div>
                    <img src={taskInfo.img} />
                </div>
                <div className="match-msg-box">
                    <h1>{taskInfo.taskName}</h1>
                    <p>
                        <label>任务时间：</label>
                        <span>{taskInfo.startTime}</span>
                    </p>
                    <p>
                        <label>奖励</label>
                        {!this.state.isShowReward && <a onClick={this.showReward}>展开</a>}
                    </p>
                    {this.state.isShowReward && <p className="reward-desc">{taskInfo.prize}</p>}
                    {this.state.isShowReward && <a onClick={this.showReward}>收起</a>}
                </div>
                <div className="header">参与者</div>
                <ul>
                    <li>
                        <span>名称</span>
                        <span>收益率</span>
                        <span>是否完成</span>
                        <span>排名</span>
                        <span></span>
                    </li>
                    {
                        personList.map(item=>{
                            return (
                                <li>
                                    <span>{item.nickname}</span>
                                    <span>{item.nickname}</span>
                                    <span>{item.isFinish?'完成':'未完成'}</span>
                                    <span>{item.ranking}</span>
                                    <span></span>
                                </li>  
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default TaskDetail