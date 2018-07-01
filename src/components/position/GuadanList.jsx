import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Icon, ListView, Modal, RefreshControl, Toast} from 'antd-mobile'
import { hashHistory } from 'react-router'
import { helper, myFetch, config } from '../utils'
import { messages } from '../trade'
import { messageString } from 'component/user'
import { PositionModifyOrder } from './'
import update from 'react-addons-update'
import Reflux from 'reflux'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'

const alert = Modal.alert

let pageIndex = 1

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class GuadanList extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = PriceStore
    this.storeKeys = ['sellPrice', 'buyPrice']
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.dataBlob = []
    this.state = {
      dataSource: dataSource.cloneWithRows(this.dataBlob),
      isLoading: true,
      hasMore: false,
      visible: false,
      visible1: false,
      data: {},
      status: 0,
      dataArr: [],
      refreshing: false
    };
  }
  onRevokeCancel = (orderno) => {
    let filled = this.props.intl.formatMessage(messageString.filled)
    let Confirm = this.props.intl.formatMessage(messageString.Confirm)
    let submitting = this.props.intl.formatMessage(messageString.submitting)
    let submitFaild = this.props.intl.formatMessage(messageString.submitFaild)
    let Cancelpendingsuccess = this.props.intl.formatMessage(messageString.Cancelpendingsuccess)

     let propmt = this.props.intl.formatMessage(messages.prompts)
     //console.log(this.props.intl.formatMessage)
     let content = this.props.intl.formatMessage(messages.cancelguadan)
    alert(propmt, <div className="rt-guadan-alert" style={{'padding': '50px 0'}}>{content}</div>, [
      { text: filled, onPress: () => console.log('cancel') },
      { text: Confirm, onPress: () => { this.onConfirmCancel(orderno)}},
    ])
  }
  onConfirmCancel = (orderno) => {
    let submitting = this.props.intl.formatMessage(messageString.submitting)
    let Cancelpendingsuccess = this.props.intl.formatMessage(messageString.Cancelpendingsuccess)
    Toast.loading(submitting, 10, () => {
      Toast.fail(submitFaild)
    })
    const options = {
      method: 'POST',
      body: JSON.stringify({
        TORD: orderno,
        OFLG: 1
      })
    }
    myFetch(`${config.rootApi}/mCancel`, options, true)
    .then((rs) => {
      if (rs && rs.statusCode == 0) {
        Toast.hide()
        Toast.success(Cancelpendingsuccess, 2, () => {
          this.dataBlob = []
          pageIndex = 1
          this.manuallyRefresh = true;
          this.setState({ refreshing: true });
        })
      }
    })
  }
  onCancel = (flag) => {
    //console.log(flag, 1)
    if (flag) {
      this.onFetchTradeireki()
    }
  }
  onFetchData = (page = 1, refresh = false) => {
    if (refresh) {
      page = 1
      pageIndex = 1
      this.dataBlob = []
    }
 
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PGNO: page
      })
    }
    if (pageIndex > this.totalPage) {

      setTimeout(() => {
        this.setState({ hasMore: true, isLoading: false, refreshing: false })
        return
      }, 1000)
    } else {
      myFetch(`${config.rootApi}/mAvailorderlist`, options, true)
      .then((rs) => {
        //console.log(rs, 'rs')
        if (rs && rs.statusCode == 0) {
          this.totalPage = rs.totalPage
          let arr = rs.dataInfoAvailOrder.dataListAvailOrders
          arr.map((val, index) => {
            if (this.dataBlob[val.primaryOrderNo]) {
              //console.log(1)
              this.dataBlob[val.primaryOrderNo] = this.dataBlob[val.primaryOrderNo].concat([val])
            } else {
              this.dataBlob[val.primaryOrderNo] = [val]
            }
          })
          console.log(this.dataBlob, 90)
          setTimeout(() => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
              isLoading: false,
              refreshing: false
            })
          })
        } 
      })
    }
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
      this.timer1 = this.setTimeout(() => {
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
    

    // simulate initial Ajax
    //this.onFetchData()
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
  onRelateorder = (orderno) => {
    const options = {
       method: 'POST',
       body: JSON.stringify({
        ORDN: orderno
      })
    }
    myFetch(`${config.rootApi}/mRelateorder`, options, true)
     .then((rs) => {
        if (rs && rs.statusCode == 0) {
          let data = rs.dataInfoRelateOrder.dataListRelateOrders
          //console.log(data)
          this.setState({
            status: rs.orderFormCls,
            dataArr: data
          })
      }
     })
  }
  onGuadanType = (val = 0) => {

    let StopOrLimit = this.props.intl.formatMessage(messageString.StopOrLimit)
    let IFD1number = this.props.intl.formatMessage(messageString.IFD1number)
    let IFD2number = this.props.intl.formatMessage(messageString.IFD2number)
    let OCOLimit = this.props.intl.formatMessage(messageString.OCOLimit)
    let OCOStop = this.props.intl.formatMessage(messageString.OCOStop)
    let IFO1number = this.props.intl.formatMessage(messageString.IFO1number)
    let IFO2numberLismit = this.props.intl.formatMessage(messageString.IFO2numberLismit)
    let IFO2numberStop = this.props.intl.formatMessage(messageString.IFO2numberStop)
    let Allnumber = this.props.intl.formatMessage(messageString.Allnumber)
    let forcedClosed = this.props.intl.formatMessage(messageString.forcedClosed)

    let result = StopOrLimit
      switch(val) {
        case 0: 
        result = StopOrLimit;
        break
      case 11: 
        result = IFD1number;
        break
      case 12:
        result = IFD2number;
        break
      case 21:
        result = OCOLimit;
        break
      case 22:
        result = OCOStop;
        break
      case 31:
        result = IFO1number;
        break
      case 32:
        result = IFO2numberLismit;
        break
      case 33:
        result = IFO2numberStop;
        break
      case 41:
        result = Allnumber;
        break
      case 51:
        result = forcedClosed;
        break
      default:
        result = StopOrLimit
    }
    return result
  }
  _RenderRow = (rowData, sectionID, rowID) => {
       //console.log(rowData, 12)
      //console.log(rowID, rowData, 'pp')
      //return <div>2</div>
    if (rowData.length == 2) {
      
      return <div className="-list-all">
        {
          rowData.map((val, index) => {
            let hand = '100,000'
			      let defaultAmount = 100000
          if (val.ccyPair.includes('XAU')) {
            defaultAmount = 100
            hand = '100'
          }
          if (val.ccyPair.includes('XAG')) {
            defaultAmount = 5000
            hand = '5,000'
          }
          return (
          <div className="-list" key={rowID+index}>
            <div className="-first">
              <div className="-one">
                <h4>
                  <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
                  <span>/</span>
                  <FormattedMessage id={helper.splitString(val.ccyPair)[1]}/>
                </h4>
                <span>
                  <div className={`in ${val.bsCls == 0 ? 'sell' : 'buy'}`}>
                    {val.bsCls == 0 ? <FormattedMessage id="sell"/> : <FormattedMessage id="buy"/>}
                  </div>
                </span>
                <span>
                  {helper.accDiv(val.orderAmt, defaultAmount)}
                  <span className="icon">
                     x {hand}
                    <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
                  </span>
                </span>
              </div>
              <div className="-two">
                <span>
                  <FormattedMessage
                    id='price'
                  />
                ：<span className={`-price`}>{val.orderPrice}</span></span>
                <span>
                  <FormattedMessage
                    id='termofvalidity'
                  />
                ：<span className={`-time`}>
                    <FormattedMessage id={helper.conrequestTime(val.orderTermCls)}/>
                  </span>
                </span>
                <span>
                    <FormattedMessage
                        id='type'
                      />
                 <span className="direction">
                   {this.onGuadanType(val.orderFormDtlCls)}
                 </span></span>
              </div>
            </div>
            <div className="-bottom">
              <div className="modify"
                onClick={
                  () => {
                    clearTimeout(this.timer1)
                    this.onRelateorder(val.orderNo);
                    this.setState({
                      visible1: true,
                      data: val
                    }, () => {
                      this.onTimerPrice(val.ccyPair, val.orderAmt)
                    })
                  }
                }
              >
                <FormattedMessage
                  id='modifyguadan'
                />
              </div>
              <div
                 className="revoke"
                 onClick={
                   () => {
                      this.onRevokeCancel(val.orderNo)
                   }
                 }
              >
                <FormattedMessage
                  id='revoke'
                />
              </div>
          </div>
        </div>
            )
          })
            }
        </div>
      } else if (rowData.length == 1) {
        let hand = '100,000'
        let defaultAmount = 100000
        if (rowData[0].ccyPair.includes('XAU')) {
          defaultAmount = 100
          hand = '100'
        }
        if (rowData[0].ccyPair.includes('XAG')) {
          defaultAmount = 5000
          hand = '5,000'
        }
      return (
        <div className="-list" key={rowID}>
          <div className="-first">
            <div className="-one">
                <h4>
                  <FormattedMessage id={helper.splitString(rowData[0].ccyPair)[0]}/>
                  <span>/</span>
                  <FormattedMessage id={helper.splitString(rowData[0].ccyPair)[1]}/>
                </h4>
                <span>
                  <div className={`in ${rowData[0].bsCls == 0 ? 'sell' : 'buy'}`}>
                    {rowData[0].bsCls == 0 ? <FormattedMessage id="sell"/> : <FormattedMessage id="buy"/>}
                  </div>
                </span>
                <span>
                  {helper.accDiv(rowData[0].orderAmt, defaultAmount)}
                  <span className="icon">
                     x {hand}
                    <FormattedMessage id={helper.splitString(rowData[0].ccyPair)[0]}/>
                  </span>
                </span>
            </div>
            <div className="-two">
              <span>
                <FormattedMessage
                  id='price'
                />
              ：<span className={`-price`}>{rowData[0].orderPrice}</span></span>
              <span>
                <FormattedMessage
                  id='termofvalidity'
                />
              ：<span className={`-time`}>
                  <FormattedMessage id={helper.conrequestTime(rowData[0].orderTermCls)}/>
                </span>
              </span>
              <span>
                  <FormattedMessage
                      id='type'
                    />
               <span className="direction">
                 {this.onGuadanType(rowData[0].orderFormDtlCls)}
               </span></span>
            </div>
        </div>
        <div className="-bottom">
            <div className="modify"
              onClick={
                () => {
                  clearTimeout(this.timer1)
                  this.onRelateorder(rowData[0].orderNo);
                  this.setState({
                    visible1: true,
                    data: rowData[0]
                  }, () => {
                    this.onTimerPrice(rowData[0].ccyPair, rowData[0].orderAmt)
                  })
                }
              }
            >
              <FormattedMessage
                id='modifyguadan'
              />
            </div>
            <div
               className="revoke"
               onClick={
                 () => {
                    this.onRevokeCancel(rowData[0].orderNo)
                 }
               }
            >
              <FormattedMessage
                id='revoke'
              />
            </div>
        </div>
      </div>
        )
      } else if (rowData.length == 3) {
      return <div className="-list-all">
        {
          rowData.map((val, index) => {
            let hand = '100,000'
			      let defaultAmount = 100000
            if (val.ccyPair.includes('XAU')) {
              defaultAmount = 100
              hand = '100'
            }
            if (val.ccyPair.includes('XAG')) {
              defaultAmount = 5000
              hand = '5,000'
            }
            return (
              <div className="-list" key={rowID+index}>
                <div className="-first">
                  <div className="-one">
                      <h4>
                        <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
                        <span>/</span>
                        <FormattedMessage id={helper.splitString(val.ccyPair)[1]}/>
                      </h4>
                      <span>
                        <div className={`in ${val.bsCls == 0 ? 'sell' : 'buy'}`}>
                          {val.bsCls == 0 ? <FormattedMessage id="sell"/> : <FormattedMessage id="buy"/>}
                        </div>
                      </span>
                      <span>
                        {helper.accDiv(val.orderAmt, defaultAmount)}
                        <span className="icon">
                           x {hand}
                          <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
                        </span>
                      </span>
                  </div>
                  <div className="-two">
                    <span>
                      <FormattedMessage
                        id='price'
                      />
                    ：<span className={`-price`}>{val.orderPrice}</span></span>
                    <span>
                      <FormattedMessage
                        id='termofvalidity'
                      />
                    ：<span className={`-time`}>
                        <FormattedMessage id={helper.conrequestTime(val.orderTermCls)}/>
                      </span>
                    </span>
                    <span>
                        <FormattedMessage
                            id='type'
                          />
                     <span className="direction">
                       {this.onGuadanType(val.orderFormDtlCls)}
                     </span></span>
                  </div>
              </div>
              <div className="-bottom">
                  <div className="modify"
                    onClick={
                      () => {
                        clearTimeout(this.timer1)
                        this.onRelateorder(val.orderNo);
                        this.setState({
                          visible1: true,
                          data: val
                        }, () => {
                          this.onTimerPrice(val.ccyPair, val.orderAmt)
                        })
                      }
                    }
                  >
                    <FormattedMessage
                      id='modifyguadan'
                    />
                  </div>
                  <div
                     className="revoke"
                     onClick={
                       () => {
                          this.onRevokeCancel(val.orderNo)
                       }
                     }
                  >
                    <FormattedMessage
                      id='revoke'
                    />
                  </div>
              </div>
            </div>
            )
          })
            }
        </div>
      }
  }
  onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      this.setState({ isLoading: true }, () => {
         this.onFetchData(++pageIndex)
      });
     
  }
  onClose = (num, primaryOrderNo, orderno, price) => {

    //console.log(num, 'num')
    clearTimeout(this.timer1)
    if (num == 0) {
      this.setState({
        visible1: false,
        
      }, () => {
      })
    } else if (num == 1) {
      //console.log(orderno, price)
      this.setState({
        visible1: false,
        data: []
      }, () => {
        //console.log(primaryOrderNo)
        //console.log(price, 'rs')
        //console.log(this.dataBlob)
      this.dataBlob[primaryOrderNo] = this.dataBlob[primaryOrderNo].map((val, index) => {
        val = update(val, {$merge: {orderPrice: price[index]}})
         return val
      })
      let dataSource = this.state.dataSource.cloneWithRows(this.dataBlob)
     //console.log(this.state.dataSource.cloneWithRows(this.dataBlob))
     this.setState({
       dataSource
     }, () => {
       //console.log(this.state.dataSource)
       this.manuallyRefresh = true;
      this.setState({ refreshing: true });
     })
      })
    }
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

  scrollingComplete = () => {
    //console.log('scrollingComplete');
  }

  render() {
    //console.log('return')
    // console.log(this.dataBlob,'this.dataBlob')
  //  let test = this.dataBlob == '[]' ? 1 : 2
   //console.log(test,'test')
    let LoadingLoad = this.props.intl.formatMessage(messageString.LoadingLoad)
    let Nopositionstodisplay = this.props.intl.formatMessage(messageString.Nopositionstodisplay)
    let MoreLoad = this.props.intl.formatMessage(messageString.MoreLoad)

    const footer = () => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? LoadingLoad : this.state.hasMore ? Nopositionstodisplay : MoreLoad}
            </div>)
    return (
      <div className="guadan-page cm-scrollable-container">
       <ListView
        ref="lv"
        dataSource={this.state.dataSource}
        renderFooter={ this.dataBlob == '[]' ? footer : ''}
        renderRow={this._RenderRow}
        style={{
           height: document.documentElement.clientHeight - window.htmlFont*3.28,
           overflow: 'auto', 
        }}
        pageSize={4}
        onScroll={this.onScroll}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        
        scrollerOptions={{ scrollbars: false, scrollingComplete: this.scrollingComplete }}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
      />
        <PositionModifyOrder
          visible={this.state.visible1}
          data={this.state.data}
          status={this.state.status}
          onClose={this.onClose}
          arr={this.state.dataArr}
          sellPrice={this.state.sellPrice}
          buyPrice={this.state.buyPrice}
        />
      </div>
    )
  }
}

GuadanList.propType = {
  intl: intlShape.isRequired
}
reactMixin(GuadanList.prototype, TimerMixin)

export default injectIntl(GuadanList)