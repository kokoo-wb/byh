import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'
import './style.less'

const dataArr = [
  {
    icon: <Icon type={require('static/svg/c_1b.svg')}/>,
    iconactive: <Icon type={require('static/svg/c_1a.svg')}/>,
    link: '/account',
    name: <FormattedMessage id="quotation"/>
  },
  {
    icon: <Icon type={require('static/svg/m2b.svg')}/>,
    iconactive: <Icon type={require('static/svg/m2a.svg')}/>,
    link: '/account',
    name: <FormattedMessage id="trade"/>
  },
  {
    icon: <Icon type={require('static/svg/m1b.svg')}/>,
    iconactive: <Icon type={require('static/svg/m1a.svg')}/>,
    link: '/chat',
    name: <FormattedMessage id="chat"/>
  },
  {
    icon: <Icon type={require('static/svg/m3b.svg')}/>,
    iconactive: <Icon type={require('static/svg/m3a.svg')}/>,
    link: '/finance',
    name: <FormattedMessage id="finance"/>
  },
  {
    icon: <Icon type={require('static/svg/m4b.svg')}/>,
    iconactive: <Icon type={require('static/svg/m4a.svg')}/>,
    link: '/account',
    name: <FormattedMessage id="account"/>
  }
]
export default class FooterBar extends Component {
  state = {
    active : this.props.activeIndex || 0
  }
  render() {
    const { active } = this.state
    const { activeIndex } = this.props
    //console.log(active, activeIndex)
    return (
      <ul className={`cm-footer-bar`}>
        {
          dataArr.map((val, index) => {
            return (
              <li
                key={index}
                onClick={
                  () => {
                    if (active == index) {
                      return
                    }
                    this.setState({
                      active: index
                    }, () => {
                      if (val.link) {
                        hashHistory.push(val.link)
                      }
                    })
                  }
                }
                className={`${activeIndex == index ? 'active':''}`}
              >
                <span>{activeIndex == index ? val.iconactive : val.icon}</span>
                <span>{val.name}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}