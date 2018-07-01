import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'

export default class SelectValid extends Component {
  state = {
    time: this.props.defaultValid || 'dayvalid'
  }
  render() {
    const { onClick } = this.props
    const { time } = this.state
    return (
      <div className="rt-select-type">
        <p className="-title">
          <FormattedMessage id="termofvalidity"/>
        </p>
        <ul>
          <li className="-item">
            <div
              className={`${time == 'dayvalid' ? '-public -margin-right active' : '-public -margin-right'}`}
              onClick={
                () => {
                  if (time == 'dayvalid') {
                    return
                  }
                  this.setState({
                    time: 'dayvalid'
                  }, () => {
                    onClick('dayvalid')
                  })
                }
              }
            >
              <FormattedMessage id="dayvalid"/>
              <Icon type="check"/>
            </div>
            <div
              className={`${time == 'weekvalid' ? '-public -margin-right active' : '-public -margin-right'}`}
              onClick={
                () => {
                  if (time == 'weekvalid') {
                    return
                  }
                  this.setState({
                    time: 'weekvalid'
                  }, () => {
                    onClick('weekvalid')
                  })
                }
              }
            >
              <FormattedMessage id="weekvalid"/>
              <Icon type="check"/>
            </div>
            <div
              className={`${time == 'validcancel' ? '-public active' : '-public'}`}
              onClick={
                () => {
                  if (time == 'validcancel') {
                    return
                  }
                  this.setState({
                    time: 'validcancel'
                  }, () => {
                    onClick('validcancel')
                  })
                }
              }
            >
              <FormattedMessage id="validcancel"/>
              <Icon type="check"/>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

SelectValid.propTypes = {
  defaultValid: PropTypes.string,
  onClick: PropTypes.func
}
