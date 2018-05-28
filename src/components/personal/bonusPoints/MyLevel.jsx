import React, {Component} from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { List, Steps, Icon } from 'antd-mobile'
const Step = Steps.Step
import { CommonHeader } from 'component/header'
import { myFetch, config, helper } from 'component/utils'
import 'whatwg-fetch'
import './style.less'

export default class MyLevel extends Component {
    constructor(...args){
        super(...args)
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="my-level">
                <div className="level-steps">
                    <div className="level-step">
                        <img src="../../../statics/images/diamond.png" />
                        <p>等级1</p>
                    </div>
                    <div className="level-step current-step">
                        <img src="../../../statics/images/diamond.png" />
                        <p>等级1</p>
                    </div>
                    <div className="level-step">
                        <img src="../../../statics/images/diamond.png" />
                        <p>等级1</p>
                    </div>
                    <div className="level-step">
                        <img src="../../../statics/images/diamond.png" />
                        <p>等级1</p>
                    </div>
                </div>
                <div className="level-con">
                    <img src="../../../statics/images/diamond.png" />
                    <label>LV36</label>
                    <div className="level-progress"><div className="progress" style={{width: '50%'}}></div></div>
                    <p>距离下一等级还差778积分</p>
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