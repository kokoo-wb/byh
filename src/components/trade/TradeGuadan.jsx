import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Button } from 'antd-mobile'
import { NewGoodsAndNum, SelectType, SelectValid } from './'

class TradeGuadan extends Component {
  state = {
    value: localStorage.volumn ? localStorage.volumn : '0.1',
    type: 'direct',
    validity: 'dayvalid'
  }
  numValue = (val) => {
    this.setState({
      value: val
    }, () => {
      this.props.number(val)
    })
  }
  onSelectType = (val) => {
    this.setState({
      type: val
    })
  }
  onSelectValid = (val) => {
    this.setState({
      validity: val
    })
  }
  render() {
    const { type, validity, value  } = this.state
    return (
      <div className="rt-padding-24 rt-bg-white rt-padding-bottom10">
        <NewGoodsAndNum
          present={this.props.present}
          numValue={this.numValue}
        />
        <SelectType
          onClick={this.onSelectType}
          defaultType={type}
        />
        <SelectValid
          onClick={this.onSelectValid}
          defaultValid={validity}
        />
        <Button
          className={`cm-main-button rt-margin30`}
          onClick={
            () => {
              hashHistory.push({
                pathname: '/trade/settingorder',
                query: {
                  type: type,
                  validity: validity,
                  numValue: value,
                  ccy: this.props.present
                }
              })
            }
          }
        >
          <FormattedMessage id="TradeSettingPending"/>
          {/* <FormattedMessage id="post"/> */}
        </Button>
        {/*<OrderIFO />*/}
        {/*
        <NewGuadanWay/>

        <ChoseButton/>
        */}
      </div>
    )
  }
}

export default TradeGuadan


{/*
  <NewGuadanWay/>  新建挂单  单向
  <NewGuadanTwoWay/>   新建挂单  双向
  <MainAndSubsidiaryList/>   新建挂单  if then
*/}
