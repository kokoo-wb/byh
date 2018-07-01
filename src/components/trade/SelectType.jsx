import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'

export default class SelectType extends Component {
  state = {
    active: this.props.defaultType || 'direct'
  }
  render() {
    const { active } = this.state
    const { onClick } = this.props
    return (
      <div className="rt-select-type">
        <p className="-title">
          <FormattedMessage id="post"/> <FormattedMessage id="type"/>
        </p>
        <ul>
          <li className="-item">
            <div
              className={`${active == 'direct' ? '-public -margin-right active' : '-public -margin-right'}`}
              onClick={
                () => {
                  if (active == 'direct') {
                    return
                  }
                  this.setState({
                    active: 'direct'
                  }, () => {
                    onClick('direct')
                  })
                }
              }
            >
              <FormattedMessage id="direct" />
              <Icon type="check"/>
            </div>
            <div
              className={`${active == 'oco' ? '-public active' : '-public'}`}
              onClick={
                () => {
                  if (active == 'oco') {
                    return
                  }
                  this.setState({
                    active: 'oco'
                  }, () => {
                    onClick('oco')
                  })
                }
              }
            >
              {/* <FormattedMessage id="oco" /> */}
              <span>OCO</span>
              <Icon type="check"/>
            </div>
          </li>
          <li className="-item">
            {/*<div
              className={`${active == 'ifd' ? '-public -margin-right active' : '-public -margin-right'}`}
              onClick={
                () => {
                  if (active == 'ifd') {
                    return
                  }
                  this.setState({
                    active: 'ifd'
                  }, () => {
                    onClick('ifd')
                  })
                }
              }
            >
              <FormattedMessage id="ifd" />
              <span>If then</span>
              <Icon type="check"/>
            </div>*/}
            <div
              className={`${active == 'ifo' ? '-public active' : '-public'}`}
              onClick={
                () => {
                  if (active == 'ifo') {
                    return
                  }
                  this.setState({
                    active: 'ifo'
                  }, () => {
                    onClick('ifo')
                  })
                }
              }
            >
              <FormattedMessage id="ifo" />
              {/* <span>If then OCO</span> */}
              <Icon type="check"/>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

SelectType.propTypes = {
  defaultType: PropTypes.string,
  onClick: PropTypes.func
}
