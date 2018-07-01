import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './side.less'

export default class SimpleSwitchBtn extends Component {
	state = {
		active : 0
	}
	render() {
		const { left, right, onClick } = this.props
		return (
			<div className="rt-simple-switch">
				<div
					className={`-left ${this.state.active == 0 ? '-active' : ''}`}
					onClick={
						() => {
							if (this.state.active == 0) {
								return
							}
							this.setState({
								active: 0
							}, () => {
								onClick(0)
							})
						}
					}
				>
				 { left }
				</div>
				<div
					className={`-right ${this.state.active == 1 ? '-active' : ''}`}
					onClick={
						() => {
                          if (this.state.active == 1) {
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
					{ right }
				</div>
			</div>
			)
	}
}