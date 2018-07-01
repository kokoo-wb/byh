import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { InputItem, NoticeBar ,Icon} from 'antd-mobile'
import { AccountProfit } from './'



class PositionProfit extends Component {
  render() {
    return (
      <div className="cm-scrollable-container -background">
        <AccountProfit/>
      </div>
    )
  }
}

export default PositionProfit

