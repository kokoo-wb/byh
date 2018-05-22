import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class Attention extends Component {
	render() {
		
		return (
            <ul className="attention-list">
                <li>
                    <div className="attention-list-item">
                        <img className="head-img" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58" />
                        <div className="user-msg">
                            <p className="username">奥利维亚</p>
                            <p>粉丝：888</p>
                            <p>
                                <span>
                                    <span>当前盈利：</span>
                                    <span className="income-rate">27.98%</span>
                                </span>
                                <span className="income30">
                                    <span>近30日盈利 </span> 
                                    <span className="income-num">+2789</span>
                                </span>
                            </p>
                        </div>

                        <a className="confirm-btn">确认</a>
                    </div>                    
                </li>
                <li>
                    <div className="attention-list-item">
                        <img className="head-img" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2222457038,1434704351&fm=58" />
                        <div className="user-msg">
                            <p className="username">奥利维亚</p>
                            <p>粉丝：888</p>
                            <p>
                                <span>
                                    <span>当前盈利：</span>
                                    <span className="income-rate">27.98%</span>
                                </span>
                                <span className="income30">
                                    <span>近30日盈利 </span> 
                                    <span className="income-num">+2789</span>
                                </span>
                            </p>
                        </div>
                        <a className="confirm-btn">确认</a>
                    </div>                    
                </li>
            </ul>
		)
	}
}

export default Attention