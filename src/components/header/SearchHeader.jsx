import React, { Component } from 'react'
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl'
import { hashHistory } from 'react-router'
import { SearchBar, Icon } from 'antd-mobile'

const messages = defineMessages({
    placeholderSearch: {
      id: 'placeholderSearch',
      defaultMessage: '搜索外汇'
    }
})

class SearchHeader extends Component {
  render() {
    const placeholderSearch = this.props.intl.formatMessage(messages.placeholderSearch)
    return (
      <header className="cm-search-header">
        <div className="-left">
          <span
            className="cm-circle"
            onClick={
              () => {
                hashHistory.push('/setting')
              }
            }
          >
            <Icon type={require('static/svg/icon-36.svg')} />
          </span>
        </div>
        <div className="-center">
          <SearchBar
            placeholder={placeholderSearch}
            onFocus={
              () => {
                hashHistory.push('/trade/search')
              }
            }
          />
        </div>
        <div className="-right">
          <span 
            className="cm-circle"
            onClick={
              () => {
                hashHistory.push('/account/message')
              }
            }
          >
            <Icon type={require('static/svg/icon-35.svg')} />
          </span>
        </div>
      </header>
    )
  }
}

SearchHeader.propType = {
  intl: intlShape.isRequired
}

export default injectIntl(SearchHeader)