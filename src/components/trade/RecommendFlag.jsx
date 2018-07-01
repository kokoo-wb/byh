import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'
import './RecommendFlag.less'

export default class RecommendFlag extends Component {
  render() {
    const { onClick } = this.props
    return (
      <div className="rt-recommend-flag">
        <h3 className="rt-h3">
          <FormattedMessage
            id="recommend"
          />
        </h3>
        <div className="-flag-all">
          <div className="-item">
            <span
              data-ccy="USD"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_usd.svg')}/>
            </span>
            <span
              data-ccy="AUD"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_aud.svg')}/>
            </span>
            <span
              data-ccy="CAD"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_cad.svg')}/>
            </span>
            <span
              data-ccy="CHF"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_chf.svg')}/>
            </span>
          </div>
          <div className="-item">
            <span
              data-ccy="EUR"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_eur.svg')}/>
            </span>
            <span
              data-ccy="GBP"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_gbp.svg')}/>
            </span>
            <span
              data-ccy="JPY"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_jpy.svg')}/>
            </span>
            <span
              data-ccy="NZD"
              onClick={
                (event) => {
                  let ccy = event.currentTarget.dataset.ccy
                  onClick(ccy)
                }
              }
            >
              <Icon type={require('static/svg/p_nzd.svg')}/>
            </span>
          </div>
        </div>
      </div>
    )
  }
}