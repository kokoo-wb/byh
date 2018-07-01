import React, { Component } from 'react'
import { Modal, Button, Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { FooterBar } from 'component/footer'
import { CommonHeader } from 'component/header'
import { hashHistory } from 'react-router'
import { helper, config, myFetch } from '../utils'
import { PositionDetailTop, messages  } from './'
import { LimitOrStop } from '../trade'



class MarketModifyDetails extends Component {
	state = {
	    pric: 0,
	    pric1: 0
	}
	onShowPrice = (data = 0, type, ccy) => {
		//console.log(this.props.data, 123)
		//let ccy = this.props.data ? this.props.data.ccypairCd : 'EUR/USD'
    let length = 10000
    let fixed = 5
    if (ccy && ccy.includes('JPY')) {
      length = 100
      fixed = 3
    }

    if (ccy && ccy.includes('XAU')) {
      length = 100
      fixed = 3
    }

    if (ccy && ccy.includes('XAG')) {
      length = 100
      fixed = 3
    }
    
    let pips, direction
    if (data == 0) {
    	direction = 1
    } else if (data == 1) {
    	direction = 0
    }
    let result = parseFloat(helper.accDiv(3, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    let orderPrice 
    if (direction == 0) {
      orderPrice = parseFloat(helper.accAdd(this.props.sellPrice, pips)).toFixed(fixed)
      //console.log(this.props.sellPrice, pips, orderPrice, 'sellPrice')
    } else if (direction== 1 ) {
      orderPrice = parseFloat(helper.accAdd(this.props.buyPrice, pips)).toFixed(fixed)
      //console.log(this.props.buyPrice, pips, orderPrice, 'buyPrice')
    }
    return orderPrice
	}
  onOrderPrice = (data = 0, type, ccy) => {
    let price = this.onShowPrice(data, type, ccy)
    let length = 10000
    let fixed = 5, strSlice = 4
    if (ccy && ccy.includes('JPY')) {
      length = 100
      fixed = 3
      strSlice = 2
    }
    price = parseFloat(price).toFixed(fixed)
    price = price.slice(0, -1)
    //console.log(price, 'price')
    let pips, direction
    if (data == 0) {
      direction = 1
    } else if (data == 1) {
      direction = 0
    }
    let result = parseFloat(helper.accDiv(1, length))
     if (direction == 0) {
        if (type == 4) {
          pips = -result
        } else if (type == 3) {
          pips = result
        }
      } else if (direction == 1) {
        if (type == 4) {
          pips = result
        } else if (type == 3) {
          pips = -result
        }
      }
    let orderPrice
    orderPrice = parseFloat(helper.accAdd(price, pips)).toFixed(strSlice)
    return orderPrice
  }
	onTimesChange = (e) => {
	    if (e === 'undefined') {
	      return
	    }
	    this.setState({
	      pric: e
	    })
	}
	onTimesChange1 = (e) => {
	    if (e === 'undefined') {
	      return
	    }
	    this.setState({
	      pric1: e
	    })
	}
	onPositionOco = (data) => {
		const formatMessage = this.props.intl.formatMessage
	    let direction
	      if (data.bsCls == 0) {
	        direction = 1
	      } else if (data.bsCls == 1) {
	        direction = 0
	      }
	    const options = {
	      method: 'POST',
	      body: JSON.stringify({
	        PAIR: data.ccypairCd,
	        BSKB: direction,
	        AMNT: data.positionAmt,
	        YKKB: 0,
	        PRI1: this.state.pric ? this.state.pric : this.onOrderPrice(data.bsCls, 3, data.ccypairCd),
	        PRI2: this.state.pric1 ? this.state.pric1 : this.onOrderPrice(data.bsCls, 4, data.ccypairCd),
	        SKJ2: 4,
	        KORD: data.orderNo,
	        OFLG: 1
	      })
	    }
	    myFetch(`${config.rootApi}/mCloseoco`, options, true)
	      .then((rs) => {
	      	if (rs && rs.statusCode == 0) { 
	      		Toast.success(formatMessage(messages.TradeOpenPendingSuccess), 1.2, () => {
	      			this.props.onClose(1)
	      		})
	      	}
	      })
	  }
	onChangeBsCls = (num) => {
		let bsCls = 0
		if (num == 0) {
			bsCls = 1
		} else if (num == 1) {
			bsCls = 0
		}
		return bsCls
	}
	render() {
		const formatMessage = this.props.intl.formatMessage
		const { visible, data, onClose } = this.props
		let ccy = JSON.parse(localStorage.ccy)[0] ? JSON.parse(localStorage.ccy)[0]['ccyPair'] : ''
		//console.log(data, 'data1')
		return (
			<Modal
				className="rt-orderpage"
				visible={visible}
				animate={false}
			>
		         <CommonHeader
		           title={formatMessage(messages.TradeHoldDetail)}
		           onLeftClick={
		           	() => {
		           		onClose()
		           	}
		           }
		        />
		        <PositionDetailTop
		          data={data}
		        />
		        <div className="-background rt-height22"></div>
		        <div className="cm-scrollable-container rt-padding-24">
		          <LimitOrStop
		            className="rt-margin30"
		            defaultCon={3}
                showPrice={this.onShowPrice(data.bsCls, 3, data.ccypairCd)}
		            orderPrice={this.onOrderPrice(data.bsCls, 3, data.ccypairCd)}
		            onTimesChange={this.onTimesChange}
		            direction={this.onChangeBsCls(data.bsCls)}
		            ccy={data.ccypairCd}
		            visible={visible}
		          />
		          <LimitOrStop
		            defaultCon={4}
                showPrice={this.onShowPrice(data.bsCls, 4, data.ccypairCd)}
		            orderPrice={this.onOrderPrice(data.bsCls, 4, data.ccypairCd)}
		            onTimesChange={this.onTimesChange1}
		            direction={this.onChangeBsCls(data.bsCls)}
		            ccy={data.ccypairCd}
		            visible={visible}
		          />
		          <div className="rt-clear-float">
		          	<Button className="btn rt-sure rt-sure-float" type="primary"
			            onClick={
			              () => {
			                this.onPositionOco(data)
			              }
			            }
			          >
			            <FormattedMessage
			              id='confirm'
			             /> 
			          </Button>
			          <Button className="btn rt-sure rt-cancel rt-cancel-float" type="primary"
			            onClick={
			              () => {
			                onClose()
			              }
			            }
			          >
			            <FormattedMessage
			              id='cancel'
			             /> 
			          </Button>
		          </div>
		          
		        </div>
		        <FooterBar activeIndex={1}/>
			</Modal>
			)
	}
}

export default injectIntl(MarketModifyDetails)