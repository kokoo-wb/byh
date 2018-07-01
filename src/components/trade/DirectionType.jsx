import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Checkbox, Radio } from 'antd-mobile'

export default class DirectionType extends Component {
	state = {
		value: 1
	}
	onChange = (value) => {
		this.setState({
			value: value
		}, () => {
			this.props.onChange(value)
		})
	}
	render() {
		const data = [
			{ value: 1, label: 'purchase', classname: '-left' }, 
			{ value: 0, label: 'sellout' , classname: '-right'}
		]
		return (
			<div className="rt-direction-type">
			   {
			   	data.map(i => {
			   		return (
			   			<div className={i.classname} key={i.value}>
							<Radio
							  checked={this.state.value === i.value}
							  onChange={
							  	() => {
							  		this.onChange(i.value)
							  	}
							  }
							/>
							<FormattedMessage id={i.label}/>
						</div>
			   			)
			   	})
			   }
			</div>
			)
	}
}