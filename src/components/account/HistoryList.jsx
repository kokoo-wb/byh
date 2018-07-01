import React, { Component } from 'react'
import { Icon, ListView } from  'antd-mobile'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { HistoryDetail, messagex } from './'
import { config, myFetch, helper } from '../utils'
import moment from 'moment'

let pageIndex = 1;
//console.log(pageIndex, 'pageIndex')
class HistoryList extends Component {
	constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.dataBlob = []
    this.totalPage = 1
      // new object ref
    this.state = {
      dataSource: dataSource.cloneWithRows(this.dataBlob),
      isLoading: true,
      hasMore: false,
      visible: false,
      data: {}
    };
  }
  onFetchData = (page = 1) => {
    //console.log(page, 'onFetchData')
  	const options = {
  		method: 'POST',
  		body: JSON.stringify({
  			PGNO: page
  		})
  	}
  	if (pageIndex > this.totalPage) {
      this.setState({ hasMore: true, isLoading: false })
      return
    }
  	myFetch(`${config.rootApi}/mTraderireki`, options, true)
	  	.then((rs) => {
	  		//console.log(rs)
	  		this.totalPage = rs.totalPage
	  		let arr = rs.dataInfoExec.dataListExecs
	  		//console.log(pageIndex, rs.totalPage)
        this.dataBlob = this.dataBlob.concat(arr)
        //console.log(this.dataBlob)
        setTimeout(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
            isLoading: false,
          })
        })
	  	})
	  }
	componentDidMount() {
    	// you can scroll to the specified position
    	// setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

    	// simulate initial Ajax
    	//console.log(1)
      //console.log(pageIndex, 1)
    	this.onFetchData()
  	}
  	_RenderRow = (rowData= {}, sectionID, rowID) => {
			//console.log(rowData.execAmt)
			let results = ''
			if (String(rowData.execAmt).length < 4) {
				results = rowData.execAmt
			} else if (String(rowData.execAmt).length >= 4 && String(rowData.execAmt).length < 7) {
				results = helper.accDiv(rowData.execAmt, 1000) + 'K'
			} else if (String(rowData.execAmt).length >= 7) {
				results = helper.accDiv(rowData.execAmt, 1000000) + 'M'
			}
  	  return (
        <div key={rowID} className="-item">
			<span className="-first">{moment(rowData.execDt, "YYYY-MM-DD hh:mm:ss").format('YY/MM/DD')}</span>
			<span className="-second">
			  <FormattedMessage id={helper.splitString(rowData.ccyPair)[0]}/>
              <span>/</span>
              <FormattedMessage id={helper.splitString(rowData.ccyPair)[1]}/>
			</span>
			<span className="-third">{results}</span>
			<span className="-four">
				<em className={`-bgCls ${rowData.bsCls == 0 ? '' : '-green'}`}>
					<FormattedMessage id={rowData.bsCls == 0 ? 'sell' : 'buy'}/>
				</em>
			</span>
			<span className="-five">{rowData.totalPl ? rowData.totalPl : 0}</span>
			<span
				className="-last"
				onClick={
					() => {
            let obj = Object.assign({}, rowData)
						this.setState({
							visible: true,
              data: obj
						})
					}
				}
			>
				<span className="-operation">
					<Icon type="right"/>
				</span>
			</span>
		</div>
      )
  	}
    onEndReached = (event) => {
	    // load new data
	    //console.log(2)
	    // hasMore: from backend data, indicates whether it is the last page, here is false
      //console.log(pageIndex, 'onEndReached')
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }
	    //console.log('reach end', event);
	    this.setState({ isLoading: true });
	    this.onFetchData(++pageIndex)
	 }
	 componentWillUnmount() {
	  	pageIndex = 1
	 }
	render() {
		const { visible } = this.state
		const formatMessage = this.props.intl.formatMessage
		const footer = () => (<div style={{ padding: 30, textAlign: 'center' }}>
		          {this.state.isLoading ? formatMessage(messagex.LoadingLoad) : this.state.hasMore ? formatMessage(messagex.Nopositionstodisplay) : formatMessage(messagex.MoreLoad)}
		        </div>)
		return (
			<div>
				<h3 className="rt-h3-title">
					<FormattedMessage id="recentrecord"/>
				</h3>
				<div className="rt-history-list">
					<div className="-item -title">
						<span className="-first">
              <FormattedMessage id="transactiondate"/>        
            </span>
						<span className="-second">
              <FormattedMessage id="goods"/>      
            </span>
						<span className="-third">
              <FormattedMessage id="number"/>       
            </span>
						<span>
              <FormattedMessage id="direction"/>        
            </span>
						<span className="-five">
              <FormattedMessage id="profitandloss"/>
            </span>
						<span></span>
					</div>
					<div className="cm-scrollable-container">
						<ListView ref="lv"
				        dataSource={this.state.dataSource}
				        renderFooter={footer}
				        renderRow={this._RenderRow}
				        style={{
				           height: document.documentElement.clientHeight - window.htmlFont*2.36,
				           overflow: 'auto', 
				        }}
				        pageSize={6}
				        onScroll={() => { console.log('scroll'); }}
				        scrollRenderAheadDistance={10}
				        scrollEventThrottle={10}
				        onEndReached={this.onEndReached}
				        onEndReachedThreshold={20}
				      />
					</div>
					
					
				</div>
				<HistoryDetail
					visible={visible}
          data={this.state.data}
					onClose={
						() => {
							this.setState({
								visible: false,
							}, () => {
                this.setState({
                  data: {}
                })
              })
						}
					}
				/>
			</div>
			)
	}
}

export default injectIntl(HistoryList)