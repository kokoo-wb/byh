import React, { Component } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { myFetch, config, helper } from '../utils'
import Reflux from 'reflux'
import { AccountAction } from '../../actions'
import { AccountStore } from '../../stores'

let TimerMixin = require('react-timer-mixin')
let reactMixin = require('react-mixin')


class TopAccount extends Reflux.Component {
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

  render() {
    const data = this.state.accountData
    return (
      <div className="top-account">
        <span>
          <span>
            <FormattedMessage
              id="totalAssets"
            />
            {
              localStorage.live == 'true' ? null :
              <span className="rt-mo">
                <FormattedMessage
                  id="simulation"
                />
              </span>
            }
          </span>
          <span>
            <FormattedNumber
              value={data ? data.netEquity : 0}
            />
          </span>
        </span>
        <span>
          <span>
            <FormattedMessage
                 id="availableFunds"
              />
          </span>
          <span>
            <FormattedNumber
              value={data ? data.marginAvailable : 0}
            />
          </span>
        </span>
        <span>
          <span>
            <FormattedMessage
                 id="bond"
              />
          </span>
          <span>
            <FormattedNumber
              value={data ? data.maintenanceMargin : 0}
            />
          </span>
        </span>
        <span>
          <span>
            <FormattedMessage
                 id="floating"
              />
          </span>
          <span className={`${data ? data.floatingPl > 0 ? '-green' : '': ''}`}>
            <FormattedNumber
              value={data ? data.floatingPl : 0}
            />
          </span>
        </span>
      </div>
    )
  }
}

reactMixin(TopAccount.prototype, TimerMixin)
export default TopAccount