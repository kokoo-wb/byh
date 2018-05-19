import React, { Component } from 'react'
import { Modal, Button } from 'antd-mobile'
import { CommonHeader } from 'component/header'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

export default class InformationDetail extends Component {
	render() {
		const { visible, onClose, data } = this.props
		return (
			<Modal
				visible={visible}
				onClose={() => {console.log(1)}}
				animate={false}
				className="rt-notice-detail"
			 >
			 	<CommonHeader
					title={
						<FormattedMessage id="news"/>
					}
					onLeftClick={
						() => {onClose()}
					}
				/>
				<div className="cm-scrollable-container">
					<div className="detail-top">
			        <h3 className="-title">{data.Title}</h3>
		            <p className="-time">
		          	  {moment.utc(data.PublicationDate).local().format('YYYY-MM-DD HH:mm:ss')}
		            </p>
	        </div>
	        <article dangerouslySetInnerHTML={{ __html: data.HTML }}></article>
				</div>
				
		        {/*<div className="rt-padding-lr">
		          <Button className="cm-main-button -blue">
		                确定
		          </Button>
		        </div>*/}
			 </Modal>
			)
	}
}