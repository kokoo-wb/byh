import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { createForm } from 'rc-form'
import { Icon, InputItem } from 'antd-mobile'
import { helper } from '../utils'
const iconFlag = {
	'USD' : <Icon type={require('static/svg/p_usd.svg')}/>,
	'EUR' : <Icon type={require('static/svg/p_eur.svg')}/>,
	'CAD' : <Icon type={require('static/svg/p_cad.svg')}/>,
	'JPY' : <Icon type={require('static/svg/p_jpy.svg')}/>,
	'NZD' : <Icon type={require('static/svg/p_nzd.svg')}/>,
	'AUD' : <Icon type={require('static/svg/p_aud.svg')}/>,
	'CHF' : <Icon type={require('static/svg/p_chf.svg')}/>,
	'GBP' : <Icon type={require('static/svg/p_gbp.svg')}/>,
	'XAU' : <Icon type={require('static/svg/p_xau.svg')}/>,
	'XAG' : <Icon type={require('static/svg/p_xag.svg')}/>
}
class NewGoodsAndNum extends Component {
	state = {
		value: this.props.defaultNum ? String(this.props.defaultNum) : localStorage.volumn ? localStorage.volumn : '0.1' 
	}
	onChange = (value) => {
		//console.log(value, 'value')
		/*if (value < 0.1) {
			value = 0.1
		}*/
		this.setState({value}, () => {
			//console.log(value)
			this.props.numValue(value)
		})
	}
	render() {
		//console.log(typeof this.props.defaultNum)
		const { getFieldProps } = this.props.form
		const { present } = this.props
		//console.log(present, 'present123')
		
		let hand = '100,000'
    if (present.includes('XAU')) {
      hand = '100'
    }
    if (present.includes('XAG')) {
      hand = '5,000'
    }
		return (
			<div className="rt-new-goodsandnum">
				<div className="-left">
					<span className="-left-top">
						<FormattedMessage id="currency"/>
					</span>
					<div className="-left-bottom">
						<div className="-img-container">
							<span className="-under">
								{iconFlag[helper.splitString(present)[0]]}
							</span>
							<span className="-above">
								{iconFlag[helper.splitString(present)[1]]}
							</span>
						</div>
						<div className="-text">
							<span>
								<FormattedMessage id={helper.splitString(present)[0]}/>
								<span>/</span>
								<FormattedMessage id={helper.splitString(present)[1]}/>
							</span>
							<span>{present}</span>
						</div>
					</div>
				</div>
				<div className="-right">
					<div className="-right-top">
						<span><FormattedMessage id='numberHand'/></span>
						<span><span className="-mul">✖️</span><em>{hand}</em></span>
					</div>
					<div>
						<InputItem
						  {
							...getFieldProps('num')
						  }
						  type="money"
						  onFocus={() => {
							document.querySelector('.cm-scrollable-container').style.overflow = 'hidden'
						  }}
						  onBlur={() => {
							document.querySelector('.cm-scrollable-container').style.overflow = 'auto'
						  }}
						  className="-input-number"
						  onChange={this.onChange}
						  value={this.state.value}
						 />
					</div>
				</div>
			</div>
			)
	}
}

export default createForm()(NewGoodsAndNum)