import React, { Component } from 'react'
import './style.less'

import * as Api from '../../../services';

export default class PersonalIndex extends Component {

  constructor(...args){
    super(...args)
    this.state = {
        
    }
  }

  componentDidMount() {
    Api.myFocusList({
      
    }).then((res) => {
        console.log(res)
    })
  }

  
  render() {
    return (
      <div className="personal-index">
        <div className="user-info">
            <div className="user-head-name">
              <div className="user-head">
                <img src="../../../statics/images/chat_01.png" />
              </div>
              <div className="user-name">
                <h3>奥利维亚</h3>
                <p>账号号码</p>
              </div>
            </div>
            <div className="user-level">
              <h4>等级<em>21</em></h4>
              <div className="level-info">
                <div className="level-progress"><div className="progress"></div></div>
                <div className="level-text">70/90</div>
              </div>
            </div>         
        </div>
        <div className="other-info">
          <div className="other-info-item">
            <h4>徽章</h4>
            <img src="../../../statics/images/chat_01.png" />
          </div>
          <div className="other-info-item">
            <h4>粉丝</h4>
            <p>128</p>
            <i>(+12 在过去的一星期)</i>
          </div>
          <div className="other-info-item">
            <h4>关注</h4>
            <p>64</p>
            <i>(+4 在过去的一星期)</i>
          </div>
        </div>
        <div className="title-item">最新活动</div>
        <div className="banner">
            <img src="../../../statics/images/banner.png" />
        </div>
        <div className="title-item">主选单</div>
        <div className="main-content">
          <div className="main-item">
            <img src="../../../statics/images/main_menu_one.png" />
            <p>我的交易</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_two.png" />
            <p>商品市场</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_three.png" />
            <p>高手排行</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_four.png" />
            <p>客服服务</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_five.png" />
            <p>会员中心</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_six.png" />
            <p>经常活动</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_seven.png" />
            <p>推荐好友</p>
          </div>
          <div className="main-item">
            <img src="../../../statics/images/main_menu_eight.png" />
            <p>抽奖</p>
          </div>
        </div>
      </div>
    )
  }
}