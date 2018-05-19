import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { InputItem, NoticeBar ,Icon, Button} from 'antd-mobile'
import { FooterBar } from 'component/footer'
import { CommonHeader } from 'component/header'
import { TopAccount } from 'component/trade'
import { SimpleSwitchBtn } from 'component/common'
import { InformationList, CalenderPage } from './'


class FinancePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(i) {
    if( i == this.state.active) {
      return
    }
    this.setState({
      active : i
    })
  }
  render() {
    //console.log(this.props)
    return (
      <div>
        <CommonHeader title="资讯" paly="0"/>
        <SimpleSwitchBtn
          left={
              <FormattedMessage id="news"/>
            }
            right={
              <FormattedMessage id="calender"/>
            }
            onClick={
              this.onClick
            }
          />
        <div className="rt-height4"></div>
        {
          this.state.active == 0 ?
          <InformationList lang={this.props.lang} /> : <CalenderPage lang={this.props.lang}/>
        }
        <FooterBar activeIndex={3}/>
      </div>
    )
  }
}

export default FinancePage