import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl'
import { SearchBar, Toast } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { RecommendFlag, Hot, SearchResult } from './'
import _ from 'lodash'


const messages = defineMessages({
    placeholderSearch: {
      id: 'placeholderSearch',
      defaultMessage: '搜索外汇'
    },
    TheProductHasAdded: {
      id: 'TheProductHasAdded',
      defaultMessage: 'TheProductHasAdded'
    },
    AddProductHasSuccess: {
      id: 'AddProductHasSuccess',
      defaultMessage: 'AddProductHasSuccess'
    },
    HaveNotProductAdded: {
      id: 'HaveNotProductAdded',
      defaultMessage: 'HaveNotProductAdded'
    },
    Cancel: {
      id: 'Cancel',
      defaultMessage: 'Cancel'
    }
})
function accArr(longArr, shortAll) {
  let newArr

    for (let i = 0; i< shortAll.length; i++) {
    newArr = longArr.filter((value, index) => {
      if (value.id != shortAll[i].id) {
        return value
      }
    })
  }
}
class TradeSearch extends Component {
  state = {
    focused: true,
    value: '',
    focus: false,
    data: []
  }
  componentDidMount() {
    const ccy = JSON.parse(localStorage.ccy)
    //console.log(ccy, 'TradeSearch')
    const all = JSON.parse(localStorage.all)
    let rs = _.differenceWith(all, ccy, _.isEqual)
    this.setState({
      data: rs
    }, () => {
      //console.log(this.state.data)
    })
  }
  onClick = (data) => {
    const formatMessage = this.props.intl.formatMessage
    //console.log(data, 'result')
    let focus = JSON.parse(localStorage.ccy)
    let all = JSON.parse(localStorage.all)
    let flag = focus.some((val, index) => {
      return val.id == data.id
    })
    if (flag) {
      Toast.fail(formatMessage(messages.TheProductHasAdded))
    } else {
      Toast.success(formatMessage(messages.AddProductHasSuccess),1.2, () => {
        focus.push(data)
        localStorage.removeItem('ccy')
        this.setState({
          data: _.differenceWith(all, focus, _.isEqual)
        })
        localStorage.setItem('ccy', JSON.stringify(focus))
      })
    }
  }
  onAllClick = (data) => {
    const formatMessage = this.props.intl.formatMessage
    let focus = JSON.parse(localStorage.ccy)
    let all = JSON.parse(localStorage.all)
    //console.log(data, 'data1')
    if (data.length > 0) {
      Toast.success(formatMessage(messages.AddProductHasSuccess),1.2, () => {
        data.map((val, index) =>{
          focus.push(val)
        })
        //console.log(focus, 'this.state')
        localStorage.removeItem('ccy')
        this.setState({
          data: _.differenceWith(all, focus, _.isEqual)
        }, () => {
          //console.log(this.state.data, 'this.state.data')
        })
        localStorage.setItem('ccy', JSON.stringify(focus))
      })
    } else {
      Toast.fail(formatMessage(messages.HaveNotProductAdded), 1.2)
    }
  }
  onFlagClick = (str) => {
    this.setState({
      value: str
    })
  }
  render() {
    const { focus, value, data } = this.state
    const placeholderSearch = this.props.intl.formatMessage(messages.placeholderSearch)
    const formatMessage = this.props.intl.formatMessage
    const itemFilter = data.filter((val) => {
      return val.ccyPair.indexOf(this.state.value) !== -1
    })
    //console.log(value, data, 1)
    return (
      <div className="rt-trade-search">
        <SearchBar
          placeholder={placeholderSearch}
          focused={this.state.focused}
          onBlur={
            () => {
              this.setState({
                focused: false,
              })
            }
          }
          cancelText={formatMessage(messages.Cancel)}
          showCancelButton
          onCancel={
            () => {
              if (value) {
                this.setState({
                  value: ''
                })
              } else {
                hashHistory.goBack()
              }
            }
          }
          value={this.state.value}
          onChange={
            (val) => {
              //console.log(val)
              this.setState({
                value: val
              })
            }
          }
        />
      {
        value ? <div className="cm-scrollable-container">
           <SearchResult
            data={itemFilter}
            onClick={this.onClick}
            onAllClick={this.onAllClick}
          />
         </div> : <div className="cm-scrollable-container">
           <RecommendFlag onClick={this.onFlagClick}/>
           <Hot
            onClick={this.onClick}
            dataList={this.state.data}
            onAllClick={this.onAllClick}
          />
         </div>
      }
      </div>
    )
  }
}

TradeSearch.propType = {
  intl: intlShape.isRequired
}

export default injectIntl(TradeSearch)
