import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { Icon, Result } from 'antd-mobile'
import { SideLeftRight } from 'component/common'
import { helper } from '../utils'
import { messages } from './'

class SearchResult extends Component {
  render() {
    const formatMessage = this.props.intl.formatMessage
    const { data, onClick, onAllClick } = this.props
    return (
      <div className="rt-result-choice">
        <div className="rt-hot-h3">
          <FormattedMessage
            id="result"
          />
          <span
            className="-add-all"
            onClick={
              () => {
                onAllClick(data)
                /*console.log(1)
                if (data.length > 0) {
                  console.log(2)
                  localStorage.setItem('ccy', JSON.stringify(this.state.data))
                  this.setState({
                    data : []
                  })
                } else {
                  //console.log(3)
                  Toast.fail('相关产品已经全部添加', 1.2)
                }*/
                
              }
            }
          >
            <FormattedMessage
              id="addAll"
            />
          </span>
        </div>
        {
          data.length <= 0 ?
          <Result
            imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
            message={formatMessage(messages.ChangeMatchingResultFound)}
          /> :
          data.map((val,index) => {
            return (
              <SideLeftRight
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
            )
          })
        }
      </div>
      )
  }
}

export default injectIntl(SearchResult)