import React, { Component } from 'react'
import { ListView } from 'antd-mobile'
import { config, myFetch, helper } from '../utils'

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 5;
const NUM_ROWS = 5;
let pageIndex = 0;

export default class MessageList extends Component {
	constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.dataBlob = {};
    this.genData = (pIndex = 0) => {
    	//console.log(pIndex, 1)

      for (let i = 0; i < NUM_SECTIONS; i++) {
      	const ii = (pIndex * NUM_SECTIONS) + i;
          const rowName = `R${ii}`;
          this.dataBlob[rowName] = rowName;
      }
      //console.log(this.dataBlob)
    }
      // new object ref
    this.state = {
      dataSource: dataSource.cloneWithRows(this.dataBlob),
      isLoading: true,
      hasMore: false,
    };
  }
  onFetchData = (page = 1) => {
  	const options = {
  		method: 'POST',
  		body: JSON.stringify({
  			PGNO: page,
  			IPFL: 0
  		})
  	}
  	myFetch(`${config.rootApi}/mInfolistcust`, options, true)
  	.then((rs) => {
  		//console.log(rs)
  	})
  }
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

    // simulate initial Ajax
    //console.log(1)
    this.onFetchData()
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
        isLoading: false,
      });
    }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }
  	_RenderRow = (rowData= {}, sectionID, rowID) => {
  		//console.log(rowData)
  	  return (
        <div key={rowID} className="-item">
			<h3>建仓确认</h3>
			<p>您的订单号20161011054:外汇交易建仓，成本1.10170，数量100,000，方向买
账户：116804783@mail.com</p>
			<div>2016-10-17 13:21</div>
		</div>
      )
  	}
    onEndReached = (event) => {
	    // load new data
	    //console.log(2)
	    // hasMore: from backend data, indicates whether it is the last page, here is false
	    if (this.state.isLoading && !this.state.hasMore) {
	      return;
	    }
	    //console.log('reach end', event);
	    this.setState({ isLoading: true });
	    setTimeout(() => {
	      this.genData(++pageIndex);
	      this.setState({
	        dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
	        isLoading: false,
	      });
	    }, 1000);
	 }
	render() {
		const footer = () => (<div style={{ padding: 30, textAlign: 'center' }}>
		          {this.state.isLoading ? '正在加载...' : this.state.hasMore ? '没有更多' : '加载更多'}
		        </div>)
		return (
			<div className="rt-log-list cm-scrollable-container">
				<ListView ref="lv"
			        dataSource={this.state.dataSource}
			        renderFooter={footer}
			        renderRow={this._RenderRow}
			        style={{
			           height: document.documentElement.clientHeight - window.htmlFont*1.5,
			           overflow: 'auto', 
			        }}
			        pageSize={4}
			        onScroll={() => { console.log('scroll'); }}
			        scrollRenderAheadDistance={500}
			        scrollEventThrottle={200}
			        onEndReached={this.onEndReached}
			        onEndReachedThreshold={10}
			      />
				
			</div>
			)
	}
}