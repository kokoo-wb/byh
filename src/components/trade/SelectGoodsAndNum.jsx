import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { Popover, Icon, InputItem } from 'antd-mobile'
import { helper, config, myFetch } from '../utils'
import { PriceAction } from '../../actions'
import { messages } from './'

const Item = Popover.Item

class SelectGoodsAndNum extends Component {
  state = {
    visible: false,
    visible1: false,
    value: this.props.defaultNum ? String(this.props.defaultNum) : '1',
    present: this.props.present
  }
  onSelect = (opt) => {
    let one = messages[helper.splitString(opt.props.value)[0]]
    let two = messages[helper.splitString(opt.props.value)[1]]
    let present = this.props.formatMessage(one) + '/' + this.props.formatMessage(two)
    this.setState({
      visible: false,
      present: present
    }, () => {
      this.props.topSelected(opt.props.value)
    })
  }
  onSelect1 = (opt) => {
    this.setState({
      visible1: false,
      value: opt.props.value
    }, () => {
      this.props.numValue(opt.props.value)
    })
  }
  onOverlay = (data) => {
    if (data == 'undefined') {
      data = []
      return data
    }
    let result = []
    result = data.map((val, index) => {
      return <Item key={index} value={val.ccyPair}>
        {val.name}
      </Item>
    })
    return result
  }
  handleVisibleChange = (visible) => {
    if (this.onOverlay(this.props.data).length < 1) {
      return
    }
    this.setState({visible})
  }
  handleVisibleChange1 = (visible) => {
    this.setState({
      visible1: visible
    })
  }
  onChange = (val) => {
    this.setState({
      value: val
    }, () => {
      this.props.numValue(val)
    })
  }
  render() {
    const { data } = this.props
    const { getFieldProps } = this.props.form
    let present = this.state.present
    let hand = '100,000'
    if (present.includes('XAU')) {
      hand = '100'
    }
    if (present.includes('XAG')) {
      hand = '5,000'
    }
    return (
      <div className="rt-select-goodsandnum-alert">
        <div className="rt-selectone">
          <span className="-left">
            {this.props.goods}
          </span>
          <Popover
            visible={this.state.visible}
            overlay={this.onOverlay(data)}
            overlayClassName="rt-popover-change"
            onVisibleChange={
              this.handleVisibleChange
            }
            placement='bottom'
            onSelect={this.onSelect}
          >
            <div>
              <span className="-center">
                {this.state.present}
              </span>
              <span className="-right">
                <Icon type={require('static/svg/icon_54.svg')}/>
              </span>
            </div>
            
          </Popover>
        </div>
        <div className="rt-selectone">
          <span className="-left">
            {this.props.num}
          </span>
          <span className="rt-select-inner">
            <InputItem
              {
                ...getFieldProps('number',{
                  initialValue: '',
                })
              }
              type="number"
              onChange={this.onChange}
              value={this.state.value}
            />
          <span className="-num-bottom">
            <Icon type={require('static/svg/mul.svg')}/>
            {hand}{helper.splitString(this.state.present)[0]}
          </span>
          </span>
          <Popover
             visible={this.state.visible1}
             overlay={[
               (<Item key="1" value={'0.1'}>0.1</Item>),
               (<Item key="2" value={'0.5'}>0.5</Item>),
               (<Item key="3" value={'1'}>1</Item>),
               (<Item key="4" value={'3'}>3</Item>),
             ]}
             onVisibleChange={
               this.handleVisibleChange1
             }
             onSelect={
               this.onSelect1
             }
           >
             <span className="-right">
                <Icon type={require('static/svg/icon_54.svg')}/>
             </span>
           </Popover>
        </div>
      </div>
    )
  }
}

export default createForm()(SelectGoodsAndNum)
