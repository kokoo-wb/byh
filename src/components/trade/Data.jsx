import React, { Component } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Button } from 'antd-mobile'
import { DataInfor, DataTitle } from './'



export default class Data extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="rt-databox">
        <DataTitle pair={this.props.present}/>
        <div className="rt-change">
          <p>
            <FormattedMessage
              id='change'
            />
          </p>
          <ul>
            <li className="time-change">
              <div>
                <span className="over">
                  <FormattedMessage
                    id='day'
                  />
                </span>
                <div>+0.19%</div>
              </div>
              <div>
                <span className="over">
                  <FormattedMessage
                    id='week'
                  />
                </span>
                <div>+0.19%</div>
              </div>
              <div>
                <span className="over">
                  <FormattedMessage
                    id='month'
                  />
                </span>
                <div>+0.19%</div>
              </div>
            </li>
            <li className="time-change">
              <div>
                <span className="over">
                  <FormattedMessage
                    id='season'
                  />
                </span>
                <div className="-active">-0.19%</div>
              </div>
              <div>
                <span className="over">
                  <FormattedMessage
                    id='halfayear'
                  />
                </span>
                <div className="-active">-0.19%</div>
              </div>
              <div>
                <span className="over">
                  <FormattedMessage
                    id='year'
                  />
                </span>
                <div className="-active">-0.19%</div>
              </div>
            </li>
          </ul>
          <DataInfor present={this.props.present}/>

        </div>
      </div>
      
    )
  }
}