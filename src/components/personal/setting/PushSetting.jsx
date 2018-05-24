import React, {Component} from 'react'
import { createForm } from 'rc-form';
import { defineMessages, intlShape, injectIntl, FormattedMessage ,formatMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, List, Switch} from 'antd-mobile'
const Item = List.Item
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

class PushSetting extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }
    componentDidMount() {

    }
    render() {
        const { getFieldProps } = this.props.form
        return (
            <div className="push-setting">
                <List className="setting-list">
                    <Item extra={<Switch {...getFieldProps('Switch1', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        行情交易
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch2', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        订单提醒
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch3', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        交易提醒
                    </Item>
                </List>
                <List className="setting-list">
                    <Item extra={<Switch {...getFieldProps('Switch4', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        其他设置
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch5', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        新增粉丝
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch6', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        积分变更
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch7', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        武器变更
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch8', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        最新活动
                    </Item>
                    <Item extra={<Switch {...getFieldProps('Switch9', {
                            initialValue: true,
                            valuePropName: 'checked',
                        })}
                        onClick={(checked) => { console.log(checked); }}/>}>
                        信息推送
                    </Item>
                </List>
            </div>
        )
    }
}
export default injectIntl(createForm()(PushSetting))