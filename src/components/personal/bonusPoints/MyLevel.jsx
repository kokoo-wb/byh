import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { List, Steps, Icon } from 'antd-mobile'
const Step = Steps.Step
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

import * as Api from '../../../services';

export default class MyLevel extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        Api.MyLevel({
            token: localStorage.getItem('token')
        }).then((res) => {
            console.log(res)
            if(res.data){
                this.setState({
                    data: res.data
                })
            }
        })
    }

    componentDidMount() {

    }

    render() {
        const { data } = this.state

        const imgArr = [
            '../../../statics/images/level_one_big.png',
            '../../../statics/images/level_two_big.png',
            '../../../statics/images/level_three_big.png',
            '../../../statics/images/level_four_big.png'
        ]

        return (
            <div className="my-level">
                <div className="level-steps">
                    <div className={data.myLevel==1?"level-step current-step":"level-step"}>
                        <img src="../../../statics/images/level_one_small.png" />
                        <p>等级1</p>
                    </div>
                    <div className={data.myLevel==2?"level-step current-step":"level-step"}>
                        <img src="../../../statics/images/level_two_small.png" />
                        <p>等级2</p>
                    </div>
                    <div className={data.myLevel==3?"level-step current-step":"level-step"}>
                        <img src="../../../statics/images/level_three_small.png" />
                        <p>等级3</p>
                    </div>
                    <div className={data.myLevel==4?"level-step current-step":"level-step"}>
                        <img src="../../../statics/images/level_four_small.png" />
                        <p>等级4</p>
                    </div>
                </div>
                <div className="level-con">
                    <img src={imgArr[data.myLevel-1]} />
                    <label>LV{data.myLevel}</label>
                    <div className="level-progress"><div className="progress" style={{width: '50%'}}></div></div>
                    <p>距离下一等级还差{data.needPoint}积分</p>
                </div>
                <div className="authority-explain">
                    <h4>权限说明</h4>
                    <p>
                    UI中国提供的网络服务中包含的任何文本、图片、图形、音频和/或视频资料均受版权、商标和/或其它财产所有权法律的保护，未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者被用于其他任何商业目的。所有这些资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机内。UI中国不就由上述资料产生或在传送或递
                    </p>
                </div>
            </div>
        )
    }
}