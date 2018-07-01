import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'
import './side.less'

export default class TopNavBar extends Component {
  state = {
    active: 1
  }
  render() {
    const { oneformat,threeNode, fourNode, onClick } = this.props
    const { active } = this.state
    return (
      <ul className="rt-top-navBar">
        <li
          className={`${active == 1 ? 'active' :''}`}
          onClick={
            () => {
              if (active == 1) {
                return
              }
              this.setState({
                active: 1
              }, () => {
                onClick(1)
              })
            }
          }
        >
          <span>
          {
            active == 1 ? <Icon type={require('static/svg/m1_5.svg')}/> :
            <Icon type={require('static/svg/icon_55.svg')}/>
          }
            
          </span>
          <span>
            {
              oneformat ? 
              oneformat : 
              (
                <FormattedMessage
                  id="position"
                />
              )

            }
            
          </span>
        </li>
        <li
          className={`${active == 2 ? 'active' :''}`}
          onClick={
            () => {
              if (active == 2) {
                return
              }
              this.setState({
                active: 2
              }, () => {
                onClick(2)
              })
            }
          }
        >
          <span>
            {
              active == 2 ? <Icon type={require('static/svg/m1_4.svg')}/> : 
              <Icon type={require('static/svg/icon_56.svg')}/>
            }
          </span>
          <span>
            <FormattedMessage
              id="post"
            />
          </span>
        </li>
        {
          threeNode ?
          (
            <li
              className={`${active == 3 ? 'active' :''}`}
              onClick={
                () => {
                  if (active == 3) {
                    return
                  }
                  this.setState({
                    active: 3
                  }, () => {
                    onClick(3)
                  })
                }
              }
            >
              <span>
              {
                active == 3 ? threeNode.topIcon : 
                threeNode.topIconactive
              }
              </span>
              <span>
                {threeNode.name}
              </span>
            </li>
          ) : null
        }
        {
          fourNode ?
          (
            <li
              className={`${active == 4 ? 'active' :''}`}
              onClick={
                () => {
                  if (active == 4) {
                    return
                  }
                  this.setState({
                    active: 4
                  }, () => {
                    onClick(4)
                  })
                }
              }
            >
              <span>
                {
                active == 4 ? fourNode.topIcon : 
                fourNode.topIconactive
              }
              </span>
              <span>
                {fourNode.name}
              </span>
            </li>
          ) : null
        }
      </ul>
    )
  }
}

TopNavBar.propTypes = {
  threeNode: PropTypes.object,
  fourNode: PropTypes.object,
  onClick: PropTypes.func
}