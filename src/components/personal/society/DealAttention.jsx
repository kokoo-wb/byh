import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class DealAttention extends Component {
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
            }
        ];

        return (
            <div className="attention">
                {attentionList.length > 0 ? (
                    <ul className="attention-list">
                        {attentionList.map((item, index) => (
                            <li key={index}>
                                <div className="attention-list-item">
                                    <img className="head-img" src={item.img} />
                                    <div className="user-msg">
                                        <p className="username">
                                            <span>{item.name}</span>
                                            <div className="level">
                                                <img src={require('../../../statics/images/level.png')} />
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
                ) : (
                        <div className="nodata">
                            <img src={require('../../../statics/images/no_user.png')} />
                            <p>当前还没有待关注人哦</p>
                        </div>
                    )}
            </div>
        )
    }
}

export default DealAttention