import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, Tabs} from 'antd-mobile'
const TabPane = Tabs.TabPane
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class MessageCenter extends Component {
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
            <div className="message-center">
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={this.callback} 
                    animated={false}
                >
                    <TabPane tab="系统消息" key="1">
                        <div className="message">
                            <div className="message-item" onClick={() => {hashHistory.push('/personal/messagedetail')}}>
                                <h4>消息标题</h4>
                                <p>1、优化系统，页面跳转更加流畅</p>
                                <p>2、程序员哥哥修复了很多BUG</p>
                                <p>3、增加许多令人激动的功能</p>
                                <i>17/10/10</i>
                            </div>
                            <div className="message-item">
                                <h4>消息标题</h4>
                                <p>1、优化系统，页面跳转更加流畅</p>
                                <p>2、程序员哥哥修复了很多BUG</p>
                                <p>3、增加许多令人激动的功能</p>
                                <i>17/10/10</i>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="BYFX推送" key="2">
                        <div className="message">
                            <div className="message-item">
                                <h4>消息标题</h4>
                                <p>1、优化系统，页面跳转更加流畅</p>
                                <p>2、程序员哥哥修复了很多BUG</p>
                                <p>3、增加许多令人激动的功能</p>
                                <i>17/10/10</i>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}
