import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, ListView } from 'antd-mobile'
import { config, helper, myFetch } from '../utils'
import { CommonHeader } from '../header'
import { NewDetail, NoticeList } from './'

export default class News extends Component {
  constructor() {
    super()
    this.state = {
      news: [],
    }
    this.onNewsDetail = this.onNewsDetail.bind(this)
  }
  onNewsDetail = (i) =>{
    //console.log(i)
  }
  render() {
    return (
      <div className="rt-news-container">
        <CommonHeader title={<FormattedMessage id="notice"/>}/>
        {/*<div className="btn-outer">
          <div className="-btn-all">
            <Button
              className={this.state.active == 0 ? '-btn-active' : ''}
              onClick={
                () => {
                  this.setState({
                    active: 0
                  },() => {
                    this.onNewsDetail(0)
                  })
                }
              }
            >
              消息
            </Button>
            <Button
              className={this.state.active == 1 ? '-btn-active' : ''}
              onClick={
                () => {
                  this.setState({
                    active: 1
                  },() => {
                    this.onNewsDetail(1)
                  })
                }
              }
            >
              公告
            </Button>
          </div>
        </div>*/}
        <NewDetail/>
      </div>
    )
  }
}