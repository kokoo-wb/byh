import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Icon, Toast, Result } from 'antd-mobile'
import { SideLeftRight } from 'component/common'
import { helper } from '../utils'
import _ from 'lodash'
import { messageString } from 'component/user'


class Hot extends Component {
  onFilterData = (data) => {
    const { onClick } = this.props
    let result = data.map((val, index) => {
      let res = {}
      res.id = val.id
      res.result = <SideLeftRight
         className="rt-hot-result"
         key={val.id}
          left={
            <span>
              <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
              <span>/</span>
              <FormattedMessage id={helper.splitString(val.ccyPair)[1]}/>
            </span>
          }
          right={
            <span className="rt-hot-plus">
              <Icon type={require('static/svg/icon_53.svg')}/>
            </span>
            
          }
          onClick={
            () => {
              onClick(val)
            }
          }
        />
      return res
    })
    return result
  }
  componentWillReceiveProps(nextProps) {
    //console.log(2, nextProps)
    if (nextProps.dataList != this.props.dataList) {
      this.setState({data: nextProps.dataList})
    }
  }
  state = {
    data: this.props.dataList
  }
  render() {
    //console.log(this.state.data, '123')
    const formatMessage = this.props.intl.formatMessage
    return (
      <div>
        <div className="rt-hot-h3">
          <FormattedMessage
            id="hot"
          />
          <span
            className="-add-all"
            onClick={
              () => {
                //console.log(1)
                this.props.onAllClick(this.state.data)
              }
            }
          >
            <FormattedMessage
              id="addAll"
            />
          </span>
        </div>
        {
          this.onFilterData(this.state.data).length < 1 ?
          <Result
            imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
            message={formatMessage(messageString.ChangeMatchingResultFound)}
          /> :
          this.onFilterData(this.state.data).map((val, index) => {
            return val.result
          })
        }
      </div>
    )
  }
}

export default injectIntl(Hot)
