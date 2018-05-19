import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Tabs } from 'antd-mobile'

const TabPane = Tabs.TabPane

export default class Classification extends Component {
  render() {
    const { className, handleTabClick, activeIndex, rooms } = this.props

    return (
      <Tabs
        className={className}
        activeKey={activeIndex}
        onTabClick={(key) => { handleTabClick(key)}}
      >
        {
          rooms.map((room) => {
            return <TabPane tab={room.title} key={room._id} />
          })
        }
      </Tabs>
    )
  }
}

Classification.defaultProps = {
  className: 'rt-tab-nav'
}

Classification.propTypes = {
  className: PropTypes.string,
  activeIndex: PropTypes.string,
  handleTabClick: PropTypes.func
}

