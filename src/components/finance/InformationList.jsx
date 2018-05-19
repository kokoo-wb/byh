import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { InputItem, NoticeBar ,Icon, Button, ListView, Toast} from 'antd-mobile'
import { myFetch, config, helper } from '../utils'
import 'whatwg-fetch'
import moment from 'moment'
import { InformationDetail } from './'

const NUM_ROW = 20;

let pageIndex = 1;

class InformationList extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.dataBlob = [];
    this.genData = (pIndex = 0) => {
      //console.log(pIndex, 1)

      for (let i = 0; i < NUM_ROW; i++) {
        const ii = (pIndex *NUM_ROW) + i;
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
      visible: false,
      detailData: {}
    };
  }
  componentDidMount() {
    //console.log(1)
    this.onFetchData()
  }
  onFetchData = (page = 1) => {
    let lang = 'en-us'
    if (this.props.lang == 'zh') {
       lang = 'zh-cn'
    } else {
      lang = 'en-us'
    }
    fetch(`http://47.75.10.124/news/list?page=${page}&limit=${NUM_ROW}&culture=${lang}`)
      .then((rs) => {
        return rs.json()
      }).then((rs) => {
        if(rs.length < NUM_ROW) {
          this.setState({ hasMore: true, isLoading: false })
          return
        }
        this.dataBlob = this.dataBlob.concat(rs)
         this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.dataBlob),
          isLoading: false,
        });
    })
  }
  onFetchDetail = (id) => {
    fetch(`http://47.75.10.124/news/detail?id=${id}`)
      .then((rs) => {
        return rs.json()
      }).then((rs) => {
        this.setState({
          detailData: rs
        })
    })
  }
  _RenderRow = (rowData= {}, sectionID, rowID) => {
      //console.log(rowData, 10)
      return (
        <div
          className="infomation-list"
          key={rowID}
          onClick={
            () => {
              this.onFetchDetail(rowData.Id)
              this.setState({
                visible: true
              })
            }
          }
        >
          <div className="-top">
           {rowData.Tags ? rowData.Tags[0][0] ? 
            <span className="-left">
              {rowData.Tags[0][0].Name}
            </span> : null : null
          }
            <span className="-title">{rowData.Title}</span>
          </div>
          {/*<p className="-center" dangerouslySetInnerHTML={{ __html: rowData.Summary }}></p>*/}
          <div className="-bottom">
            <span className="-time">{moment.utc(rowData.PublicationDate).local().format('YYYY-MM-DD HH:mm:ss')}</span>
            <span className="-from">{rowData.Author ? rowData.Author.Name : ''}</span>
          </div>
        </div>
      )
    }
  onEndReached = (event) => {
    // load new data
    console.log(event, 'event')
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    //console.log('reach end', event);
    this.setState({ isLoading: true });
    this.onFetchData(++pageIndex)
  }
  componentWillUnmount() {
    pageIndex = 0
  }
  onScroll() {
    //console.log(e, 'e')
    let scrollTop = this.refs.lv.scrollTo
    //console.log(scrollTop, 'scrollTop')
  }
  render() {
    const footer = () => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? '正在加载...' : this.state.hasMore ? '没有更多' : '加载更多'}
            </div>)
    return (
      <div className="infomation-page cm-scrollable-container">
        <ListView ref="lv"
          dataSource={this.state.dataSource}
          renderFooter={footer}
          renderRow={this._RenderRow}
          style={{
             height: document.documentElement.clientHeight - window.htmlFont*3.62,
             overflow: 'auto', 
          }}
          pageSize={4}
          onScroll={() => { this.onScroll()}}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={200}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
        <InformationDetail
          visible={
            this.state.visible
          }
          data={this.state.detailData}
          onClose={
            () => {
              this.setState({
                visible: false
              })
            }
          }
        />
        <div
          className="rt-return-top"
          onClick={
            () => {
              this.refs.lv.scrollTo(0)
            }
          }
        >
          <div className="-icon">
            <Icon type={require('static/svg/arrow.svg')}/>
          </div>
        </div>
      </div>
    )
  }
}

export default InformationList