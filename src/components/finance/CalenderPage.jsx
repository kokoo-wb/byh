import React, { Component } from 'react'
import { Calendar, messages } from './'
import 'whatwg-fetch'
import moment from 'moment'
import { Icon, Result } from 'antd-mobile'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'

class CalenderPage extends Component {
  onFetchData = (date) => {
  	let lang = 'en-us'
    if (this.props.lang == 'zh') {
       lang = 'zh-cn'
    } else {
    	lang = 'en-us'
    }
    fetch(`https://news.byfx.r0.vc/calendar?date=${date}&culture=${lang}`)
      .then((rs) => {
        return rs.json()
      }).then((rs) => {
        //console.log(rs, 12)
        this.setState({
          data: rs
        })
    })
  }
  onGetFlag = (flag) => {
    let result = flag.toLowerCase()
    return result
  }
  onGetStar = (num) => {
    let data = []
    //console.log(length)
    for (let star = 0; star < num;  star++) {
      //console.log(star)
      let node = <Icon type={require('static/svg/star-y.svg')} key={star}/>
      data.push(node)
    }
    for (let star = 0; star < 3 - num; star++) {
      let node = <Icon type={require('static/svg/star-g.svg')} key={star+num+1}/>
      data.push(node)
    }
    return data
  }
	state= {
		date: moment().utc().format(),
		data: []
	}
	onChange = (date) => {
		//console.log(date, 'date123')
		this.setState({
			date: moment(moment(date).format('YYYY-MM-DD')).utc().format()
		}, () => {
			//console.log(this.state.date)
			this.onFetchData(this.state.date)
		})
	}
	render() {
		const formatMessage = this.props.intl.formatMessage
		return (
			<div className="cm-scrollable-container">
				<Calendar onChange={this.onChange}/>
				 <ul className="rt-calender-thing ">
		        {
		          this.state.data.length < 1
		              ?
		          <Result
		            imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
		            message={formatMessage(messages.ChangeFiniceNodata)}
		          /> :
		          this.state.data.map((val, index) => {
		            return (
		              <li className="-items" key={index}>
		               <div className="-left">{moment.utc(val.DateTime).local().format('HH:mm')}</div>
		               <div className="-right">
		                 <div className="-topper">
		                   <div className="-img">
                         <Icon type={require(`static/svg/${this.onGetFlag(val.InternationalCode)}.svg`)} />
		                   </div>
		                   <div className="-star">
		                    {this.onGetStar(val.Volatility).map((val, index) => val)}
		                  </div>
		                 </div>
		                 <div className= {this.active ? '-center' : '-active'}>{val.Name}</div>
		                 <div className="-bottom">
		                   <div className="-one">
		                     <div className="-inner-one">{formatMessage(messages.ChangeFrontData)}：<span className="-price">{val.DisplayPrevious}</span></div>
		                     <div className="-inner-two">{formatMessage(messages.ChangeNowData)}：<span className="-price">{val.DisplayActual}</span></div>
		                   </div>
		                   <div className="-two">{formatMessage(messages.ChangeForecastData)}：<span className="-price">{val.DisplayRevised}</span></div>
		                 </div>
		               </div>
		             </li>
		              )
		          })
		        }
		      </ul>
			</div>
		)
	}
}
export default injectIntl(CalenderPage)