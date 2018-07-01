import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon, Popover } from 'antd-mobile'
import { helper } from '../utils'

const Item = Popover.Item

export default class SelectPopValid extends Component {
  state = {
    visible1: false,
    validity: this.props.defaultValid || 'dayvalid',
  }
  handleVisibleChange1 = (visible) => {
    this.setState({visible1: visible})
  }
  onSelect1 = (opt) => {
    //console.log(opt.props.value)
    this.setState({
      visible1: false,
      validity: opt.props.value
    }, () => {
      this.props.onValidity(opt.props.value)
    })
  }
  render() {
    const { validity, visible, visible1, type } = this.state
    return (
      <div className="rt-select-goodsandnum">
        <div className="rt-selectone">
          <span className="-left">
            <FormattedMessage id="termofvalidity"/>
          </span>
          <span className="-center">
            <FormattedMessage id={validity} />
          </span>
          <Popover
            visible={visible1}
            overlay={[
              (<Item key="1" value="weekvalid">
                <FormattedMessage id="weekvalid"/>
              </Item>),
              (<Item key="2" value="validcancel">
                <FormattedMessage id="validcancel"/>
              </Item>),
              (<Item key="3" value="dayvalid">
                <FormattedMessage id="dayvalid"/>
              </Item>)
            ]}
            onVisibleChange={
              this.handleVisibleChange1
            }
            onSelect={this.onSelect1}
          >
            <span className="-right">
              <Icon type="down"/>
            </span>
          </Popover>
        </div>
      </div>
    )
  }
}
