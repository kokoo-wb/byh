import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Icon, Popover } from 'antd-mobile'
import { helper } from '../utils'

const Item = Popover.Item

export default class SelectTypeAndValid extends Component {
  state = {
    visible: false,
    visible1: false,
    validity: this.props.defaultValid || 'dayvalid',
    type: this.props.defaultType || 'direct'
  }
  handleVisibleChange = (visible) => {
    this.setState({visible})
  }
  handleVisibleChange1 = (visible) => {
    this.setState({visible1: visible})
  }
  onSelect = (opt) => {
    this.setState({
      visible: false,
      type: opt.props.value
    }, () => {
      this.props.onType(opt.props.value)
    })
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
            <FormattedMessage id="type"/>
          </span>
          <span className="rt-type-center">
            <span>
              <FormattedMessage id={type} />
            </span>
            <span className="-type-bottom">
              {
                type == 'direct' ? 'Direct' : type == 'oco' ? 'OCO' : type == 'ifd' ?
                'If then' : 'If then OCO'
              }
            </span>
          </span>
          <Popover
            visible={visible}
            overlay={[
              (<Item key="1" value="direct">
                <FormattedMessage id="direct" />
              </Item>),
              (<Item key="2" value="oco">
                <FormattedMessage id="oco" />
              </Item>),
              (<Item key="3" value="ifd">
                <FormattedMessage id="ifd" />
              </Item>),
              (<Item key="4" value="ifo">
                <FormattedMessage id="ifo" />
              </Item>)
            ]}
            onVisibleChange={
              this.handleVisibleChange
            }
            onSelect={this.onSelect}
          >
            <span className="-right">
              <Icon type="down"/>
            </span>
          </Popover>
        </div>
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
