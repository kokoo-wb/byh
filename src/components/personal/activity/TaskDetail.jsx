import React, { Component } from 'react'
import { Icon } from 'antd-mobile'

import './style.less'

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowReward: false
        }
    }


    showReward = () => {
        this.setState(Object.assign({}, this.state, { isShowReward: !this.state.isShowReward }));
    }

    render() {

        return (
            <div className="task-detail">
                <div className="match-header">
                    <div className="end-time">
                        <img src={require('../../../statics/images/time.png')} />
                        <span>距离结束：00:00:00:00</span>
                    </div>
                    <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                </div>
                <div className="match-msg-box">
                    <h1>任务比赛名称</h1>
                    <p>
                        <label>任务时间：</label>
                        <span>17/09/09-17/09/09</span>
                    </p>
                    <p>
                        <label>奖励</label>
                        {!this.state.isShowReward && <a onClick={this.showReward}>展开</a>}
                    </p>
                    {this.state.isShowReward && <p className="reward-desc">叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗斯。</p>}
                    {this.state.isShowReward && <a onClick={this.showReward}>收起</a>}
                </div>
                <div className="header">任务名称</div>
                <ul>
                    <li>
                        <span>名称</span>
                        <span>收益率</span>
                        <span>是否完成</span>
                        <span>排名</span>
                        <span></span>
                    </li>
                    <li>
                        <span>毛军林...</span>
                        <span>+78%</span>
                        <span>完成</span>
                        <span>1</span>
                        <span>
                            <a>关注</a>
                        </span>
                    </li>
                    <li>
                        <span>毛军林...</span>
                        <span>+78%</span>
                        <span>完成</span>
                        <span>1</span>
                        <span>
                            <a>关注</a>
                        </span>
                    </li>
                    <li>
                        <span>毛军林...</span>
                        <span>+78%</span>
                        <span>完成</span>
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

export default TaskDetail