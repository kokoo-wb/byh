import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, Tabs} from 'antd-mobile'
const TabPane = Tabs.TabPane
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class DealHistory extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    callback = (key) => {
        console.log(key);
    }      
    render() {
        return (
            <div className="deal-history">
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={this.callback} 
                    animated={false}
                >
                    <TabPane tab="交易历史" key="1">
                        <div className="history">
                            <div className="history-title">最近30天交易记录</div>
                            <div className="history-table">
                                <div className="history-thead">
                                    <span>平仓日期</span>
                                    <span>商品</span>
                                    <span>数量</span>
                                    <span>方向</span>
                                    <span>交易盈亏</span>
                                </div>
                                <div className="history-tbody">
                                    <div className="history-tr">
                                        <span>4/11</span>
                                        <span>欧元/美元</span>
                                        <span>10</span>
                                        <span><em className="sale">卖</em></span>
                                        <span><i className="down">-24</i></span>
                                        <span><Icon type="right"/></span>
                                    </div>
                                    <div className="history-tr">
                                        <span>4/11</span>
                                        <span>欧元/美元</span>
                                        <span>10</span>
                                        <span><em className="buy">买</em></span>
                                        <span><i className="up">+128</i></span>
                                        <span><Icon type="right"/></span>
                                    </div>
                                    <div className="history-tr">
                                        <span>4/11</span>
                                        <span>欧元/美元</span>
                                        <span>10</span>
                                        <span><em className="sale">卖</em></span>
                                        <span><i className="down">-24</i></span>
                                        <span><Icon type="right"/></span>
                                    </div>
                                    <div className="history-tr">
                                        <span>4/11</span>
                                        <span>欧元/美元</span>
                                        <span>10</span>
                                        <span><em className="buy">买</em></span>
                                        <span><i className="up">+128</i></span>
                                        <span><Icon type="right"/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="日志" key="2">
                        <div className="log">
                            <div className="log-item">
                                <h4>建仓确认</h4>
                                <p>您的订单号2017081954：外汇交易建仓</p>
                                <p>成本：1.0070</p>
                                <p>数量：100000</p>
                                <p>方向：买</p>
                                <p>账户：970791164@qq.com</p>
                                <i>2018/04/12 12:02</i>
                            </div>
                            <div className="log-item">
                                <h4>建仓确认</h4>
                                <p>您的订单号2017081954：外汇交易建仓</p>
                                <p>成本：1.0070</p>
                                <p>数量：100000</p>
                                <p>方向：买</p>
                                <p>账户：970791164@qq.com</p>
                                <i>2018/04/12 12:02</i>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}
