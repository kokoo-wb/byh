import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { InputItem, Modal, NoticeBar ,Icon, Toast, ListView, Switch, Button, RefreshControl } from 'antd-mobile'
import { hashHistory } from 'react-router'
import { config, myFetch, helper } from '../utils'
import { messages } from '../trade'
import moment from 'moment'
import { MarketModifyDetails, GoodAndNum, CurrentPriceAlert, StringOffsetItem, DistanceItem, ModifyNumber } from './'
import { messageString } from 'component/user'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'
import math from 'mathjs'
import { createForm } from 'rc-form'


const alert = Modal.alert

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

let pageIndex = 1;

class MarketList extends Reflux.Component {
  constructor(props) {
    super(props)
    this.store = PriceStore
    this.storeKeys = ['sellPrice', 'buyPrice']
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.dataBlob = []
    this.totalPage = 1
    this.state = {
      dataSource: dataSource.cloneWithRows(this.dataBlob),
      isLoading: true,
      hasMore: false,
      refreshing: false,
      visible: false,
      data: [],
      visible1: false,
      offsetNum: 0,
      rateCheck: false,
      closeNum: 0
    };
  }
  isOffset = (flag) => {
    //console.log(flag, 'flag')
    this.setState({
      rateCheck: flag
    })
  }
  offsetChange = (val) => {
    //console.log(val, 'offsetNum')
    this.setState({
      offsetNum: val
    })
  }
  onGetNumber = (val,data) => {
    this.setState({
      closeNum: val
    })
  }
  onClosePostion = (data) => {
    // console.log(data,'789789')
    let filled = this.props.intl.formatMessage(messageString.filled)
    let Confirm = this.props.intl.formatMessage(messageString.Confirm)
    //this.onTimerPrice(data.ccypairCd, data.positionAmt)
    //console.log(this.state.sellPrice)
    if (this.time1) {
      //console.log(123)
      clearTimeout(this.time1)
    }
    let propmt = this.props.intl.formatMessage(messages.closeName)
     //console.log(this.props.intl.formatMessage)
     let content = this.props.intl.formatMessage(messages.closeposition)
     let buy = this.props.intl.formatMessage(messages.buy)
     let sell = this.props.intl.formatMessage(messages.sell)
    alert(propmt, <div className="rt-guadan-alert">
      <GoodAndNum data={data} formatMessage={this.props.intl.formatMessage}/>
      <CurrentPriceAlert
        data={data}
        formatMessage={this.props.intl.formatMessage}
      />
      <ModifyNumber
        getNumber={(val) => {
          this.onGetNumber(val, data)
        }}
        data={data}
        formatMessage={this.props.intl.formatMessage}
      />
      <DistanceItem
        isOffset={this.isOffset}
        formatMessage={this.props.intl.formatMessage}
        onChange={this.offsetChange}
        present={data.ccypairCd}
        num={data.ccypairCd.includes('JPY') || data.ccypairCd.includes('XAU') || data.ccypairCd.includes('XAG') ? 0.01 : 0.0001}
      />
      
    </div>, [
      { text: filled, onPress: () => console.log('cancel') },
      { text: Confirm, onPress: () => new Promise((resolve) => {
        return this.onConfirmClose(data, resolve)
      })}
    ])
  }
  onConfirmClose = (data, resolve) => {
    //console.log(data, 10)
    this.onClose(data, resolve)
  }
  onFetchData = (page = 1, refresh = false) => {
    if (refresh) {
      page = 1
      pageIndex = 1
      this.dataBlob = []
      this.totalPage = 1
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PGNO: page
      })
    }
    //console.log(pageIndex, this.totalPage)
    if (pageIndex > this.totalPage) {
      //console.log(pageIndex, this.totalPage, 1)
      this.setState({ hasMore: true, isLoading: false, refreshing: false })
      return
    }
    //console.log(123)
    myFetch(`${config.rootApi}/mPositionlist`, options, true)
      .then((rs) => {
        //console.log(rs, 'rs')
        if (rs) {
          if (rs.statusCode == 0) {
            this.totalPage = rs.totalPage
            let arr = rs.dataInfoPosition.dataListPositions
            this.dataBlob = this.dataBlob.concat(arr)
            setTimeout(() => {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
                isLoading: false,
                refreshing: false
              })
            })
          } else if (rs.statusCode == 1) {
            this.totalPage = rs.totalPage
            this.dataBlob = []
            setTimeout(() => {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
                isLoading: false,
                refreshing: false
              })
            })
          }
        } 
      })
  }
  async priceCallback() {
    const options = {
      method: 'POST'
    }
    const result = myFetch(`${config.rootApi}/mRatelist`, options, true)
    return result
  }
  onTimerPrice = (name,num) => {
     PriceAction.changePrice(name, num, this.priceCallback())
      this.timer = this.setTimeout(() => {
        this.onTimerPrice(name, num)
      }, config.timeTick.price)
  }
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage
    setTimeout(() => this.setState({
      height: this.state.height - ReactDOM.findDOMNode(this.refs.lv).offsetTop,
    }), 0)

    this.manuallyRefresh = true;
    setTimeout(() => this.setState({ refreshing: true }), 10);
    //console.log(this.refs.lv.getInnerViewNode, 'this.refs')
    if (this.refs.lv.getInnerViewNode) {
      this.refs.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    this.refs.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        //console.log('start pull to refresh');
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
    }
  }
  componentWillUnmount() {
    pageIndex = 1
    this.dataBlob = []
    if (this.refs.lv.getInnerViewNode) {
      this.refs.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
      this.refs.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }
    super.componentWillUnmount()
  }
  _RenderRow = (rowData= {}, sectionID, rowID) => {
      console.log(rowData, 'rowData')
      //console.log(this,1)
      let hand = '100,000'
      let defaultAmount = 100000
      if (rowData.ccypairCd.includes('XAU')) {
        defaultAmount = 100
        hand = '100'
      }
      if (rowData.ccypairCd.includes('XAG')) {
        defaultAmount = 5000
        hand = '5,000'
      }
      return (
        <div className="-item">
        <div className="-item-top">
          <div className="-left">
            <div className="-left-top">
              <FormattedMessage id="ordernumber"/>
              &nbsp;{rowData.orderNo}
            </div>
            <ul className="-left-center">
              <li className="-one">
                <div className="-one-left-top">
                  <FormattedMessage id={helper.splitString(rowData.ccypairCd)[0]}/>
                  <span>/</span>
                  <FormattedMessage id={helper.splitString(rowData.ccypairCd)[1]}/>
                </div>
                <div className={`-one-left-center ${rowData.bsCls == 0 ? '' : '-green'}`}>
                  {
                    rowData.bsCls == 0 ? <FormattedMessage id="sell"/> : <FormattedMessage id="buy"/>
                  }
                </div>
                <div className="-one-left-bottom">
                  {helper.accDiv(helper.accSub(rowData.positionAmt, rowData.orderingAmt), defaultAmount)}
                  <span className="-line">/</span>
                  {
                    helper.accDiv(rowData.positionAmt, defaultAmount)
                  }
                </div>
              </li>
              <li className="-two">
                <div><FormattedMessage id="OrderTime"/> {moment(rowData.execDt, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD hh:mm:ss')}</div>
                <span className="-two-third">
                  x {hand}<FormattedMessage id={helper.splitString(rowData.ccypairCd)[0]}/>
                </span>
              </li>
            </ul>
          </div>
          <div className="-right">
            <div className="-right-top">{rowData.unSettledPl}</div>
            <div className="-right-bottom"><FormattedMessage id="OrderPrice"/><span>{rowData.execPrice}</span></div>
          </div>
        </div>
        {/*<div className="-item-center">
          <div>建仓时间 {moment(rowData.execDt, "YYYY-MM-DD hh:mm:ss").format('YYYY-MM-DD hh:mm:ss')}</div>
          <div>隔夜利息: <span>113.69</span></div>
        </div>*/}
        <div className="-item-bottom">
          <Button
            className="-bottom-left"
            disabled={helper.accSub(rowData.positionAmt, rowData.orderingAmt) == 0 ? true : false}
            onClick={
              () => {
                //console.log(rowData)
                clearTimeout(this.timer)
                if (helper.accSub(rowData.positionAmt, rowData.orderingAmt) == 0 ) {
                  return
                }
                this.setState({
                  visible1: true,
                  data: rowData
                },() => {
                  this.onTimerPrice(rowData.ccypairCd, rowData.positionAmt)
                })
              }
            }
          >
            <FormattedMessage id="Setlimitstoploss"/>
          </Button>
          <Button
            className="-bottom-right"
            disabled={helper.accSub(rowData.positionAmt, rowData.orderingAmt) == 0 ? true : false}
            onClick={
              () => {
                if (helper.accSub(rowData.positionAmt, rowData.orderingAmt) == 0 ) {
                  return
                }
                this.setState({
                  rateCheck: false,
                  offsetNum: 0,
                  closeNum: 0,
                }, () => {
                  this.onClosePostion(rowData)
                })
                
              }
            }
          >  
            <FormattedMessage id="Closeposition"/>
          </Button>
        </div>
      </div>
      )
  }
  onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      //console.log('onEndReached')
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      //console.log('reach end', event);
      this.setState({ isLoading: true }, () => {
        pageIndex += 1
        this.onFetchData(pageIndex)
      });
      
  }
  onClose = (data, resolve) => {
    //console.log(this.state.sellPrice, 'this.state.Price')
    //const { getFieldValue } = this.props.form
    //console.log(getFieldValue.num, 1)
     let inputCorrectNum = this.props.intl.formatMessage(messages.inputCorrectNum)
     let inprocessof = this.props.intl.formatMessage(messages.inprocessof)
     let submitFailure = this.props.intl.formatMessage(messages.submitFailure)
     let liquidationSuccess = this.props.intl.formatMessage(messages.liquidationSuccess)
      
      let defaultAmount = 100000
      if (data.ccypairCd.includes('XAU')) {
        defaultAmount = 100
      }
      if (data.ccypairCd.includes('XAG')) {
        defaultAmount = 5000
      }
      let num = helper.accDiv(data.positionAmt, defaultAmount)
      //console.log(this.state.closeNum, 111)
      if (this.state.closeNum < 0.01 || this.state.closeNum > num) {
        Toast.fail(inputCorrectNum, 1.2)
        return
      }
      let direction
      if (data.bsCls == 0) {
        direction = 1
      } else if (data.bsCls == 1) {
        direction = 0
      }
      let slip = {}
      if (this.state.rateCheck) {
        let price
        if (data.bsCls == 0) {
          price= this.state.sellPrice
        } else if (data.bsCls == 1) {
          price= this.state.buyPrice
        }
        let length = 10000
        if (data.ccypairCd.includes('JPY')) {
          length = 100
        }
        if (data.ccypairCd.includes('XAU')) {
          length = 100
        }
        if (data.ccypairCd.includes('XAG')) {
          length = 100
        }
        //console.log(this.state.offsetNum, 0)
        //console.log(length, 1)
        /*let slrg = math.chain(parseFloat(this.state.offsetNum))
                       .multiply(length)
                       .done()*/
        let slrg = helper.accMul(this.state.offsetNum, length)
        //console.log(slrg, 1)
        slip = Object.assign({}, {PRIC: price, SLRG: slrg})
      }
      Toast.loading(inprocessof, 10, () => {
        Toast.fail(submitFailure)
      })
      const options = {
        method: 'POST',
        body: JSON.stringify({
          PAIR: data.ccypairCd,
          BSKB: direction,
          AMNT: helper.accMul(this.state.closeNum, defaultAmount),
          SKJK: this.state.rateCheck ? 2 : 1,
          ...slip,
          KORD: data.orderNo,
          OFLG: 1
        })
      }
      myFetch(`${config.rootApi}/mClosemarket`, options, true)
       .then((rs) => {
          if ( rs && rs.statusCode == 0) {
            Toast.hide()
            resolve()
            Toast.success(liquidationSuccess, 1.2, () => {
              console.log(123)
              this.dataBlob = []
              pageIndex = 1
              //this.onFetchData(null, true)
              this.manuallyRefresh = true;
              this.setState({ refreshing: true });
              //console.log(2222)
              
            })
          }
       })
    
  }
  onScroll = (e) => {
    this.st = e.scroller.getValues().top
    this.domScroller = e
  }

  onRefresh = () => {
    //console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }
    //console.log('onRefresh2');
    this.setState({ isLoading: true }, () => {
      this.onFetchData(null, true)
    })
  }
  render() {
    // console.log(this.dataBlob.length,'this.dataBlob')
    let loading = this.props.intl.formatMessage(messages.loading)
    let nomore = this.props.intl.formatMessage(messages.noMore)
    let loadmore = this.props.intl.formatMessage(messages.loadMore)
    const footer = () => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? loading : this.state.hasMore ? nomore : loadmore}
            </div>)
    return (
        <div className="cm-scrollable-container rt-position-list">
          <ListView ref="lv"
            dataSource={this.state.dataSource}
            renderFooter={ this.dataBlob.length > 0 ? '' : footer}
            renderRow={this._RenderRow}
            style={{
               height: document.documentElement.clientHeight - window.htmlFont*3.28,
               overflow: 'auto', 
            }}
            pageSize={10}
            onScroll={this.onScroll}
            scrollRenderAheadDistance={500}
            scrollEventThrottle={200}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
            scrollerOptions={{ scrollbars: false, scrollingComplete: this.scrollingComplete }}
            refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
          />
          <MarketModifyDetails
            visible={this.state.visible1}
            data={this.state.data}
            sellPrice={this.state.sellPrice}
            buyPrice={this.state.buyPrice}
            onClose={
              (num) => {
                if (num == 1) {
                  this.setState({
                    visible1: false,
                  }, () => {
                    clearTimeout(this.timer)
                    this.manuallyRefresh = true;
                    this.setState({
                      data: [],
                      refreshing: true
                    })
                  })
                } else {
                  this.setState({
                    visible1: false,
                  }, () => {
                    clearTimeout(this.timer)
                    this.setState({
                      data: []
                    })
                  })
                }
                
              }
            }
          />
        </div>
    )
  }
}

MarketList.propType = {
  intl: intlShape.isRequired
}
reactMixin(MarketList.prototype, TimerMixin)

export default injectIntl(createForm()(MarketList))

