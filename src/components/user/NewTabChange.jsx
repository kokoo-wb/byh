import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class NewTabChange extends Component {
	render() {
		const { activeIndex } = this.props
		return (
			<div className="rt-new-tab-change">
				 {/*<div
					className={`${activeIndex == 1 ? '-active' : ''}`}
          onClick={
            () => {
              this.props.onClick(1)
            }
          }
       >
					<FormattedMessage id="mobile"/>
				</div>*/}
				<div
          className={`${activeIndex == 2 ? '-active' : ''}`}
          onClick={
            () => {
              this.props.onClick(2)
            }
          }
        >
					<FormattedMessage id="email"/>
				</div>
			</div>
			)
	}
}