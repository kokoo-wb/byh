import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon} from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class HistoryRecord extends Component {
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
            <div className="history-record">
                
            </div>
        )
    }
}
