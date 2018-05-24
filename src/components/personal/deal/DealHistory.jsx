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
                    tabBarUnderlineStyle={{borderColor:'#a1c700'}}
                >
                    <TabPane tab="交易历史" key="1">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡一内容
                        </div>
                    </TabPane>
                    <TabPane tab="日志" key="2">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                            选项卡二内容
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
