import React, { Component } from 'react'
import { createForm } from 'rc-form'
import { Switch } from 'antd-mobile'
import { messages } from 'component/trade'
import { StringOffsetItem } from './'

class DistanceItem extends Component {
	state = {
		rateCheck: false
	}
	render() {
		const { getFieldProps }  = this.props.form
		return (
			<div>
				<div className="rt-distance-item">
		        <span>{this.props.formatMessage(messages.distance)}</span>
		        <Switch
		          {...getFieldProps('rate', {
		            initialValue: false,
		            valuePropName: 'checked',
		          })}
		          onClick={
		            (checked) => { 
		              //console.log(checked)
		              this.setState({
		                rateCheck: checked
		              }, () => {
		              	this.props.isOffset(checked)
		              }) 
		            }
		          }
		        />
		      </div>
		      {
		      	this.state.rateCheck ? <StringOffsetItem
			        onChange={this.props.onChange}
			        present={this.props.present}
			        num={this.props.num}
			        formatMessage={this.props.formatMessage}
			      /> : null
		      }
			</div>
			)
	}
}

export default createForm()(DistanceItem)