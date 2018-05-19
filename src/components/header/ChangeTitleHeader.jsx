import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Icon, Popover } from 'antd-mobile'
import './style.less'
import { helper } from '../utils'

const Item = Popover.Item

export default class ChangeTitleHeader extends Component {
  static defaultProps = {
    onLeftClick: () => {
      hashHistory.goBack()
    }
  }
  state = {
    visible: false
  }
  onSelect = (opt) => {
    this.setState({
      visible: false
    }, () => {
      this.props.topSelected(opt.props.value)
    })
  }
  onOverlay = (data) => {
    //console.log(data)
    if (data == 'undefined') {
      data = []
      return data
    }
    let result = []
    result = data.map((val, index) => {
      return <Item key={index} value={val.ccyPair}>
        <span>
          <FormattedMessage id={helper.splitString(val.ccyPair)[0]}/>
          <span>/</span>
          <FormattedMessage id={helper.splitString(val.ccyPair)[1]}/>
        </span>
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
  render() {
    const { data, onLeftClick } = this.props
    return (
      <header className="rt-change-titleHeader">
        <span
          className="cm-circle"
          onClick={
            () => {
              onLeftClick()
            }
          }
        >
          <Icon type={require('static/svg/icon-34.svg')} />
        </span>
        <span>
          <Popover
            visible={this.state.visible}
            overlay={this.onOverlay(data)}
            overlayClassName="rt-popover-change"
            onVisibleChange={
              this.handleVisibleChange
            }
            placement='bottom'
            popupAlign={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [0, 15],
            }}
            onSelect={this.onSelect}
          >
            <span className="-center">
              <div>
                <FormattedMessage id={helper.splitString(this.props.present)[0]}/>
                <span>/</span>
                <FormattedMessage id={helper.splitString(this.props.present)[1]}/>
              </div>
              <span>
                <Icon type={require('static/svg/icon_54.svg')}/>
              </span>
            </span>
          </Popover>
        </span>

        <span
          className="cm-circle"
        >
          <Icon type={require('static/svg/icon_33.svg')} />
        </span>
      </header>
    )
  }
}
