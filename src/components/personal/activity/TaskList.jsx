import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button, Toast } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskList: []
        }
    }
    componentWillMount() {
        Api.getTaskListInfo({
            token: localStorage.getItem('token'),
            pageSize: 10,
            pageNum: 1
        }).then((res) => {
            if(res.data){
                this.setState({
                    taskList: res.data
                })
            }
        })
    }
    joinTask = (actId) => () => {
        Api.joinTask({
            token: localStorage.getItem('token'),
            actId: actId
        }).then((res) => {
            Toast.info(res.msg)
        })
    }
    render() {
        const { taskList } = this.state

        return (
            <ul className="task-list">
                {
                    taskList.map(item=>{
                        return (
                            <li>
                                <img src={item.img} onClick={() => {hashHistory.push({pathname:'/personal/taskdetail',query:{id:item.id}})}}/>
                                <div className="match-msg">
                                    <div>
                                        <h1>{item.taskName}</h1>
                                        <p>距离结束：{item.endTimeString}</p>
                                    </div>
                                    <a onClick={this.joinTask(item.id)}>参加</a>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default TaskList