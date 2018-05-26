import React, { Component } from 'react'
import { WingBlank, Carousel } from 'antd-mobile'

import './style.less'

// constants
const ENUM = {
    day: '每日奖赏',
    month: '每月奖赏',
    special: '特别奖励'
}

class ActivityList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        const activityList = [
            {
                type: 'day',
                actor: '新用户',
                reward: '奖品内容',
                desc: '叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗斯。',
                time: '10:09',
                disable: false
            },
            {
                type: 'month',
                actor: '新用户',
                reward: '奖品内容',
                desc: '叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗斯。',
                time: '10:09',
                disable: true
            },
            {
                type: 'special',
                actor: '新用户',
                reward: '奖品内容',
                desc: '叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗斯。',
                time: '10:09',
                disable: false
            }
        ];

        return (
            <div className="activity-list">
                <div className="bonus-point">
                    <div className="bonus-point-level">
                        <p>LV46</p>
                    </div>

                    <div className="bonus-point-num">
                        <span>当前积分：2000</span>
                        <span>79/100</span>
                    </div>

                    <div className="bonus-point-progress">
                        <div className="progress-bar" style={{ width: '30%' }}></div>
                    </div>
                </div>
                <ul>
                    {activityList.map((item, index) => {
                        return (
                            <li key={index}>
                                <h1>{ENUM[item.type]}</h1>
                                <p>
                                    <label>参与对象:</label>
                                    <span>{item.actor}</span>
                                </p>
                                <p>
                                    <label>奖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品:</label>
                                    <span>{item.reward}</span>
                                </p>
                                <p>{item.desc}</p>
                                <a className={item.disable ? 'disable-btn' : ''}>
                                    <span>{item.disable ? '不能参与' : '抽奖'}</span>
                                    <span>距离下次抽奖{item.time}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ActivityList