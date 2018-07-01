import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { ChangeTitleHeader } from '../header'
import { FooterBar } from '../footer'
import {
  NewGoodsAndNum,
  NewTypeAndDate,
  OrderDirect,
  OrderOco,
  OrderIfo,
  ChangePriceWrap,
} from './'
import { helper, config, myFetch } from '../utils'
import { PriceAction } from '../../actions'
import { PriceStore } from '../../stores'

export default class SettingOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      present: props.location.query.ccy,
      changeType: props.location.query.type,
      changeValid: props.location.query.validity,
      number: props.location.query.numValue
    }
  }
  state = {
    
  }
  onType = (val) => {
    this.setState({
      changeType: val
    })
  }
  onValidity = (val) => {
    this.setState({
      changeValid: val
    })
  }
  async priceCallback() {
    const options = {
      method: 'POST'
    }
    const result = myFetch(`${config.rootApi}/mRatelist`, options, true)
    return result
  }
  topSelected = (ccy) => {
    this.setState({
      present: ccy,
    }, () => {
      PriceAction.changePrice(ccy, helper.accMul(this.state.number, 10000), this.priceCallback())
    })
  }
  numValue = (val) => {
    //console.log(val, 'val')
    this.setState({
      number: val
    }, () => {
      
      PriceAction.changePrice(this.state.present, helper.accMul(val, 10000), this.priceCallback())
      //console.log(val, 'val1')
    })
  }
  componentDidMount() {
    /*const options = {
      method: 'POST'
    }
    myFetch(`${config.rootApi}/mInit`, options, true)
     .then((rs) => {
      console.log(rs)
     })*/
  }
  render() {
    const type = this.props.location.query.type
    const valid = this.props.location.query.validity
    const { present, changeType, changeValid, number } = this.state
    const numValue = this.props.location.query.numValue
    //console.log(this.props.location.query.ccy,present, 123)
    return (
      <div>
        <ChangeTitleHeader
          data={JSON.parse(localStorage.ccy)}
          present={present}
          topSelected={this.topSelected}
        />
        
        <div className="cm-scrollable-container -background">
          <div className="rt-bg-white rt-padding-24 rt-padding-bottom10">
            <NewGoodsAndNum
              present={present}
              numValue={this.numValue}
              defaultNum={number}
            />
            <NewTypeAndDate
              defaultValid={changeValid}
              defaultType={changeType}
              onType={this.onType}
              onValidity={this.onValidity}
            />
          </div>
              { changeType == 'direct' ?
              <OrderDirect
                data={{pair : present, ykk: changeValid, amn: number}}
              />  : changeType == 'oco' ? 
               <OrderOco
                data={{pair : present, ykk: changeValid, amn: number}} /> : <OrderIfo
               data={{pair : present, ykk: changeValid, amn: number}}/> 
              }
          
          </div>
          
        
        <FooterBar activeIndex={0}/>
      </div>
    )
  }
}
