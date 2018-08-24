import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityDetail: {}
        }
    }
    componentWillMount() {
        Api.getDrawInfo({
            token: localStorage.getItem('token'),
            id: this.props.location.query.id
        }).then((res) => {
            if(res.data){
                this.setState({
                    activityDetail: res.data
                })
            }
        })
        
    }
    render() {
        const { activityDetail } = this.state

        return (
            <div className="activity-detail">
                <h1>{activityDetail.title}</h1>
                <p>{activityDetail.startTime}</p>
                <div className="detail-container">{activityDetail.info}</div>
                <div className="footer">
                    <a>抽奖记录</a>
                </div>
            </div>
        )
    }
}

export default ActivityDetail