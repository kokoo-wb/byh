import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { hashHistory } from 'react-router'
import { InputItem, NoticeBar ,Icon} from 'antd-mobile'
import { FooterBar } from 'component/footer'
import { CommonHeader } from 'component/header'
import { TopAccount } from 'component/trade'
import { TopNavBar } from 'component/common'
import { messageString } from 'component/user'
import { 
  PositionDetails,
  MarketList,
  PositionProfit,
  GuadanList,
  OrderDirection,
  ChoseButton,
  AccountBond
} from './'

class PositionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(i) {
    this.setState({
      active : i
    })

  }
  render() {
    let AccountPL = this.props.intl.formatMessage(messageString.AccountPL)
    return (
      <div>
        {
          localStorage.live ? null : sessionStorage.notice ? 
          <NoticeBar
            mode="closable"
            icon={null}
            className="rt-notice-bar"
            onClick={
              () => {
                localStorage.removeItem('notice')
              }
            }
          >
            <FormattedMessage
              id='notice_noChange'
            />
            <span
              className="-notice_change"
              onClick={
                () => {
                  //hashHistory.push('/openaccount')
                }
              }
            >
              <FormattedMessage
                id='notice_change'
              />
            </span>
          </NoticeBar> : null
        }
          <AccountBond />
          <TopAccount/>
          <TopNavBar
            onClick={(i) => {
              this.onClick(i)
            }
          }
            threeNode={{
              topIcon: <Icon type={require('static/svg/m1_3.svg')} />,
              topIconactive: <Icon type={require('static/svg/icon_59.svg')} />,
              name:AccountPL
            }}
            
          />
          {
            this.state.active == 1 ? 
            <MarketList/> :
            ( this.state.active == 2 ? <GuadanList/> : <PositionProfit/>)
          }
        <FooterBar activeIndex={1}/>
      </div>
    )
  }
}


PositionPage.propType = {
  intl: intlShape.isRequired
}

export default injectIntl(PositionPage)