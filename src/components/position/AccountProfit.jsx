import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { InputItem, NoticeBar ,Icon} from 'antd-mobile'
import math from 'mathjs'
import Reflux from 'reflux'
import { AccountAction } from '../../actions'
import { AccountStore } from '../../stores'
import { myFetch, config, helper } from 'component/utils'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')

class AccountProfit extends  Reflux.Component {
  constructor(props) {
    super(props)
    this.store = AccountStore
  }
  onAccountInfor = () => {
     AccountAction.accountInfo()
      this.setTimeout(() => {
        this.onAccountInfor()
      }, config.timeTick.account)
  }
  componentDidMount() {
    this.onAccountInfor();
  }
  ifWidth = (num) => {
    let result = 0
    if (num > 1) {
      result = 1
    } else {
      result = num
    }
    result = math.chain(result)
                 .multiply(100)
                 .done()
    return result
  }
  render() {
    const data = this.state.accountData
    return (
      <div className="accoutn-profit-loss">
        <ul>
          <li className="profit-one">
            <div className="account-left">
              <span>
                <FormattedMessage
                  id='totalAssets'
                />
              </span>
              <span className="-number">
              <FormattedNumber
                value={data ? data.netEquity : 0}
              />
              </span>
            </div>
            <div className="account-left account-right">
              <span>
                <FormattedMessage
                  id='accountbalance'
                />
              </span>
              <span className="-number">
              <FormattedNumber
                value={data ? data.endingBalance : 0}
              />
              </span>
            </div>
          </li>
          <li className="profit-one">
            <div className="account-left">
              <span>
                <FormattedMessage
                  id='availableFunds'
                />
              </span>
              <span className="-number">
              <FormattedNumber
                value={data ? data.marginAvailable : 0}
              />
                
              </span>
            </div>
            <div className="account-left account-right">
              <span>
                <FormattedMessage
                  id='depositused'
                />
              </span>
              <span className="-number">
              <FormattedNumber
                value={data ? data.maintenanceMargin : 0}
              />
                
              </span>
            </div>
          </li>
          <li className="profit-one">
            <div className="account-left">
              <span>
                <FormattedMessage
                  id='achieveprofitandloss'
                />
              </span>
              <span className={`-number -green`}>
              <FormattedNumber
                value={data ? data.realizedPl : 0}
              />
              </span>
            </div>
            <div className="account-left account-right">
              <span>
                <FormattedMessage
                  id='floating'
                />
              </span>
              <span className="-red -number">
              <FormattedNumber
                value={data ? data.floatingPl : 0}
              />
                
              </span>
            </div>
          </li>
          <li className="-last">
            <div>
              <span>
                <FormattedMessage
                  id='marginratio'
                />
              </span>
              <span>
                <div className="-out">
                  <div
                    className="-inner"
                    style={{width: `${this.ifWidth(data.marginRatio)}%`}}
                  ></div>
                </div>
              </span>
            </div>
            <div>
              {data ? math.chain(data.marginRatio)
                          .multiply(100)
                          .done().toFixed(2) : 0
              }%
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

reactMixin(AccountProfit.prototype, TimerMixin)

export default AccountProfit

