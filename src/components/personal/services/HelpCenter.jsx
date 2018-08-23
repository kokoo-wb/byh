import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, SearchBar} from 'antd-mobile'
import { CommonHeader, SearchHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

import * as Api from '../../../services';

export default class HelpCenter extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            iconList: [
                '../../../statics/images/help_center_icon_one.png',
                '../../../statics/images/help_center_icon_two.png',
                '../../../statics/images/help_center_icon_three.png',
                '../../../statics/images/help_center_icon_four.png',
                '../../../statics/images/help_center_icon_five.png',
                '../../../statics/images/help_center_icon_six.png'
            ],
            dataList: []
        }
    }
    componentWillMount() {
        Api.getHelpersList({
            pageNum: 1,
            searchWords: ''
        }).then((res) => {
            if(res.data){
                this.setState({
                    dataList: res.data
                })
            }
        })
    }
    componentDidMount() {

    }
    render() {
        const { dataList, iconList } = this.state
        return (
            <div className="help-center">
                <div className="search">
                    <SearchBar
                        placeholder="请输入内容"
                        style={{padding: 0}}
                    />
                </div>
                <div className="help-items">
                    {
                        dataList.length>0? dataList.map((item,index)=>{
                            return <div className="help-item" onClick={() => {hashHistory.push({pathname:'/personal/helpcenterdetail',query:{id:item.id}})}}>
                                <div className="item-name">
                                    <h4>{item.articleTitle}</h4>
                                    <img src={item.icon} />
                                </div>
                                <p className="item-desc">
                                    {item.info}
                                </p>
                            </div>
                        }) : <div style={{textAlign: 'center', marginTop: 100}}>暂无内容^_^!!</div>
                    }
                </div>
            </div>
        )
    }
}
