import React, { Component } from 'react'
import { Button, ListView } from 'antd-mobile'
import { config, helper, myFetch } from '../utils'

export default class NewDetail extends Component {
  constructor() {
    super()
    this.state = {
      news: [],
      last: '',
      isLoading: true,
      isEnd: false,
      active:0,
    }
  }
  render() {
    return (
      <div className="rt-news-detail">
        <ul>
          <li className="-list">
            <p className="create">建仓确认</p>
            <p className="ordernum">
              <span>您的订单号</span>
              <span className={`-num`}>2016011054</span>:
              <span className={`-cost`}>外汇交易建仓，<span className={`-ben`}>成本</span></span>
            </p>
            <p className="direction">
              <span>1.10170,</span>
              <span>数量<span className={`-num`}>100,000,</span></span>
              <span className={`-ben`}>方向买</span>
            </p>
            <p className="-account">
              <span className="-hu">账户：</span>
              <span className="email">116804783@mail.com</span>
            </p>
            <p className="time">2016-10-17 13:21</p>
          </li>
          
        </ul>
      </div>
    )
  }
}