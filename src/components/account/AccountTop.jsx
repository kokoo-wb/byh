import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { CommonHeader } from 'component/header'


export default class AccountTop extends Component {
  state = {
    active: 0,
    getInfo: {}
  }

  render() {
    const { active, getInfo } = this.state
    return (
      <div className="rt-deposit-top">
        <div className="-topassets">
          <div className="item">
            <div>
              <FormattedMessage id="totalassets"/>
            </div>
            <div className="-num">
              <span>
                 <FormattedMessage id="deposit"/>
              </span>
             <div className={`-color`}>1223455</div>
            </div>
          </div>
          <div className="item">
            <div>
              <FormattedMessage id="availablefunds"/>
            </div>
            <div className={`-color`}>1223455</div>
          </div>
          <div className="item">
            <div>
              <FormattedMessage id="bond"/>
            </div>
            <div className={`-color`}>1223455</div>
          </div>
        </div>
        <div className="-banckCord">
          <span className="-left">
            <FormattedMessage id="bankcard"/>
          </span>
          <span className="-right">
            <span>3</span>
            <FormattedMessage id="zhang"/>
            <Icon type="right"/>
          </span>
        </div>
        
      </div>
    )
  }
}