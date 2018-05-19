import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd-mobile'

export default class ThreeItem extends Component {

	render() {
		const { left, right, onClick, className } = this.props
		return (
			<div className={`rt-three-item ${className ? className : ''}`}>
				<div className={`-left`}>
					{left}
				</div>
				<div className="-right">
					<span>
						{right}
					</span>
					<span
						onClick={
							() => {
								onClick()
							}
						}
					>
						<Icon type="right"/>
					</span>
				</div>
			</div>
			)
	}
}

ThreeItem.propTypes = {
	left: PropTypes.node.isRequired,
	right: PropTypes.node.isRequired,
	onClick: PropTypes.func,
}