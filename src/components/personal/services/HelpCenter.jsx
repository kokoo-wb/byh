import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, SearchBar} from 'antd-mobile'
import { CommonHeader, SearchHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class HelpCenter extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="help-center">
                <div className="search">
                    <SearchBar
                        placeholder="请输入内容"
                        style={{padding: 0}}
                    />
                </div>
                <div className="help-items">
                    <div className="help-item" onClick={() => {hashHistory.push('/personal/helpcenterdetail')}}>
                        <div className="item-name">
                            <h4>开立账户</h4>
                            <img src="../../../statics/images/chat_01.png" />
                        </div>
                        <p className="item-desc">
                            开户流程指引，开户所需证件，其他问题/条款
                        </p>
                    </div>
                    <div className="help-item">
                        <div className="item-name">
                            <h4>开立账户</h4>
                            <img src="../../../statics/images/chat_01.png" />
                        </div>
                        <p className="item-desc">
                            开户流程指引，开户所需证件，其他问题/条款
                        </p>
                    </div>
                    <div className="help-item">
                        <div className="item-name">
                            <h4>开立账户</h4>
                            <img src="../../../statics/images/chat_01.png" />
                        </div>
                        <p className="item-desc">
                            开户流程指引，开户所需证件，其他问题/条款
                            开户流程指引，开户所需证件，其他问题/条款
                        </p>
                    </div>
                    <div className="help-item">
                        <div className="item-name">
                            <h4>开立账户</h4>
                            <img src="../../../statics/images/chat_01.png" />
                        </div>
                        <p className="item-desc">
                            开户流程指引，开户所需证件，其他问题/条款
                        </p>
                    </div>
                    <div className="help-item">
                        <div className="item-name">
                            <h4>开立账户</h4>
                            <img src="../../../statics/images/chat_01.png" />
                        </div>
                        <p className="item-desc">
                            开户流程指引，开户所需证件，其他问题/条款
                        </p>
                    </div>
                    <div className="help-item">
                        <div className="item-name">
                            <h4>开立账户</h4>
                            <img src="../../../statics/images/chat_01.png" />
                        </div>
                        <p className="item-desc">
                            开户流程指引，开户所需证件，其他问题/条款
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
