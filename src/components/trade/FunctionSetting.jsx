import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { createForm } from 'rc-form'
import { Popover, Icon, Switch, Stepper } from 'antd-mobile'

const Item = Popover.Item

const dataArr = [
  {
    one: <FormattedMessage
           id="defaultHand"
        />,
    two: <FormattedMessage
       id="defaultHandTips"
    />,
    flag: true,
    name: 'volumn'
  },
  {
    one: <FormattedMessage
       id="chartShow"
    />,
    two: <FormattedMessage
       id="chartShowTips"
    />,
    switch: 'switch1',
    name: 'charts'
  },
  {
    one: <FormattedMessage
       id="fastTrading"
    />,
    two: <FormattedMessage
       id="fastTradingTips"
    />,
    switch2: true,
    name: 'quicktrade'
  },
  {
    one: <FormattedMessage
       id="chatFunction"
    />,
    two: <FormattedMessage
       id="chatFunctionTips"
    />,
    switch: 'switch3',
    name: 'chat'
  }
]

class FunctionSetting extends Component {
  state = {
    visible: false,
    number: localStorage.volumn ? parseFloat(localStorage.volumn) : 0.1,
    val: 0.1
  }
  onSelect = (val) => {
    //console.log(val)
    const value = val.props.value
    this.setState({
      number : value,
      visible: false
    }, () => {
      this.props.onChange('volumn', value)
    })
  }
  onChange = (val) => {
    //console.log(val)
    this.setState({
      val
    })
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }
  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className="rt-function-setting">
        <h3 className="rt-h3">
          <FormattedMessage
            id="functionSetting"
          />
        </h3>
        {
          dataArr.map((val, index) => {
            return (
              <div className="-items" key={index}>
                <span className="-one">
                  {val.one}
                </span>
                <span className="-two">
                  {val.two}
                </span>
                  {
                    val.flag == true ?
                    (
                      <span className="-three">
                        <Popover
                          visible={this.state.visible}
                          placement='bottomRight'
                          overlay={[
                            (<Item key="1" value={0.1}>0.1</Item>),
                            (<Item key="2" value={0.5}>0.5</Item>),
                            (<Item key="3" value={1}>1</Item>),
                            (<Item key="4" value={3}>3</Item>)
                          ]}
                          onSelect={
                            this.onSelect
                          }
                          onVisibleChange={this.handleVisibleChange}
                        >
                          <div className="rt-setting-num-down">
                            <span>{this.state.number}</span>
                            <Icon type={require('static/svg/icon_54.svg')}/>
                          </div>
                        </Popover>
                      </span>
                    ) : val.switch2 == true ?
                    (
                      <span className="-three">
                        <Switch
                          {
                           ...getFieldProps('switch2', {
                             initialValue: localStorage.quicktrade == 'false' ? false : true,
                             valuePropName: 'checked'
                           })
                          }
                          onClick={
                            (checked) => {
                              this.props.onChange('quicktrade', checked)
                            }
                          }
                        />
                      </span>
                    ) : val.name == 'chat' ? 
                    (
                      <span className="-three">
                        <Switch
                          {
                           ...getFieldProps('switch1', {
                             initialValue: localStorage.chat == 'false' ? false : true,
                             valuePropName: 'checked'
                           })
                          }
                          onClick={
                            (checked) => {
                              this.props.onChange('chat', checked)

                            }
                          }
                        />
                      </span>
                    ) : (
                      <span className="-three">
                        <Switch
                          {
                           ...getFieldProps('switch3', {
                             initialValue:  localStorage.charts == 'false' ? false : true,
                             valuePropName: 'checked'
                           })
                          }
                          onClick={
                            (checked) => {
                              this.props.onChange('charts', checked)

                            }
                          }
                        />
                      </span>
                    )
                  }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default createForm()(FunctionSetting)
