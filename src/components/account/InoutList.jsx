import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { InOutDetail } from './'
import { CommonHeader } from 'component/header'
import { Icon, ListView } from 'antd-mobile'

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 5;
const NUM_ROWS = 5;
let pageIndex = 0;


export default class InoutList extends Component {
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
      visible: false
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.refs.lv.scrollTo(0, 120), 800); // recommend usage

    // simulate initial Ajax
    //console.log(1)
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
        <div key={rowID} className="-items">
			<div className="-left">
				<span className="-font">+12</span>
				<span>04-11 15:01</span>
			</div>
			<div className="-right">
				<div className="-one">
					<span className="-paddingBottom">
					<FormattedMessage id="balance" />：2312元</span>
					<span>平仓</span>
				</div>
				<div
					className="-two"
					onClick={
						() => {
							onClick()
						}
					}
				>
					<Icon type="right" />
				</div>
			</div>
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
			<div className="rt-inout-list">
				<CommonHeader title={
					<FormattedMessage id="incomeDetail"/>
					}
				/>
				<h3 className="rt-recentday">
					<FormattedMessage id="recentday"/>
				</h3>
				<div className="cm-scrollable-container">
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
				<InOutDetail
					visible={this.state.visible}
					onClose={
						() => {
							this.setState({
								visible: false
							})
						}
					}
				/>
			</div>
			)
	}
}