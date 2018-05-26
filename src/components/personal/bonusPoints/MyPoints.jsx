import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { List, Tabs, Icon } from 'antd-mobile'
const TabPane = Tabs.TabPane
const Item = List.Item
const Brief = Item.Brief
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class MyPoints extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="my-point">
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
                
            </div>
        )
    }
}