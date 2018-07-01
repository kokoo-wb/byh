import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl'
import { SearchBar } from 'antd-mobile'
import _ from 'lodash'
import { CommonHeader } from 'component/header'
import { FunctionSetting, CommoditySort } from './'

const messages = defineMessages({
    placeholderSearch: {
      id: 'placeholderSearch',
      defaultMessage: '搜索或添加外汇产品'
    }
})

class InterfaceSetting extends Component {
  onComplete = (data) => {
    //console.log(data, 'data')
    let arr = []
    data.forEach((val, index) => {
      let obj = {}
      obj.id = val.id
      obj.ccyPair = val.ccyPair
      arr.push(obj)
    })
    //console.log(arr)
    this.setState({
      arr
    })
  }
  onChartChange = (name, checked) => {
    //console.log(name, checked)
    let result = {}
    switch(name)
    {
      case 'chat':
        result['chat'] = checked;
        break;
      case 'charts':
        result['charts'] = checked;
        break;
      case 'quicktrade':
        result['quicktrade'] = checked;
        break;
      case 'volumn':
        result['volumn'] = checked
      default: 
        result['chat'] = checked;
    }
    let all = Object.assign({}, this.state.funsetting, result)
    this.setState({
      funsetting: all
    })
  }
  state = {
    arr : JSON.parse(localStorage.ccy),
    switch1: 0,
    funsetting: {}
  }
  render() {
    const placeholderSearch = this.props.intl.formatMessage(messages.placeholderSearch)
    return (
      <div className="rt-interface-setting">
        <CommonHeader
          title={
            <FormattedMessage
              id="set"
            />
          }
          right={
            <FormattedMessage
              id="complete"
            />
          }
          onLeftClick={
            () => {
                hashHistory.push('/trade')
            }
          }
          onRightClick={
            () => {
              //console.log(1)
              localStorage.setItem('ccy', JSON.stringify(this.state.arr))
              //console.log(localStorage.ccy, 123)
              let key
              for ( key in this.state.funsetting ) {
                //console.log(key, this.state.funsetting)
                localStorage.setItem(key, this.state.funsetting[key])
              }
              hashHistory.push('/trade')
            }
          }
        />
        <SearchBar
          placeholder={placeholderSearch}
          cancelText=""
          onFocus={
            () => {
              hashHistory.push('/trade/search')
            }
          }
        />
        <div className="cm-scrollable-container -inner-bg">
          <FunctionSetting onChange={this.onChartChange}/>
          <CommoditySort onComplete={this.onComplete}/>
        </div>
      </div>
    )
  }
}

InterfaceSetting.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(InterfaceSetting)