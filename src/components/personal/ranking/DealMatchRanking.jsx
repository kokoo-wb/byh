import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

const ENUM = [
    require('static/images/the_first.png'),
    require('static/images/the_second.png'),
    require('static/images/the_third.png')
]

class DealMatchRanking extends Component {
    render() {

        const attentionList = [
            {
                img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58',
                name: '奥利维亚',
                level: 88,
                currIncome: '27.89%',
                monthIncome: 2789,
                fansNum: 888
            },
            {
                img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58',
                name: '奥利维亚',
                level: 88,
                currIncome: '27.89%',
                monthIncome: 2789,
                fansNum: 888
            },
            {
                img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58',
                name: '奥利维亚',
                level: 88,
                currIncome: '27.89%',
                monthIncome: 2789,
                fansNum: 888
            },
            {
                img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58',
                name: '奥利维亚',
                level: 88,
                currIncome: '27.89%',
                monthIncome: 2789,
                fansNum: 888
            }
        ];

        return (
            <div className="deal-match-ranking">
                <div className="match-img">
                    <img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" />
                </div>
                <div className="match-msg">
                    <h1>比赛名称</h1>
                    <p>叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗斯。</p>
                </div>
                <div className="rank-header">当前排名</div>
                {attentionList.length > 0 && (
                    <ul className="attention-list">
                        {attentionList.map((item, index) => (
                            <li key={index}>
                                <div className="attention-list-item">
                                    <div className="rank-num">
                                        <span>{index + 1}</span>
                                        {index < 3 && <img src={ENUM[index]} />}
                                    </div>
                                    <img className="head-img" src={item.img} />
                                    <div className="user-msg">
                                        <p className="username">
                                            <span>{item.name}</span>
                                            <div className="level">
                                                <img src={require('static/images/level.png')} />
                                                <span>LV{item.level}</span>
                                            </div>
                                        </p>
                                        <p>粉丝：{item.fansNum}</p>
                                        <p>
                                            <span>
                                                <span>当前盈利：</span>
                                                <span className="income-rate">{item.currIncome}</span>
                                            </span>
                                            <span className="income30">
                                                <span>近30日盈利 </span>
                                                <span className="income-num">{item.monthIncome}</span>
                                            </span>
                                        </p>
                                    </div>

                                    <a className="confirm-btn">确认</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}

export default DealMatchRanking