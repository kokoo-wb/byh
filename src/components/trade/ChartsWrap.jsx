"use strict"

import React from "react"
import { FormattedMessage } from 'react-intl'
import { scaleTime } from "d3-scale"
import { ChartCanvas, Chart, series, axes, helper } from "react-stockcharts"
import { Popover, Icon } from 'antd-mobile'
import moment from 'moment'
import { myFetch, config } from '../utils'
import { Charts, ChartsShowItem } from './'

const Item = Popover.Item

const data = ['1min', '5min', '10min', '30min', '1hour', '1day', '1week', '1month']

const data1 = ['candlestick', 'line', 'bar', 'area']

var { fitWidth, TypeChooser } = helper

export default class ChartsWrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wrapper: <div></div>,
      visible: false,
      timeval: '1min',
      timeType: '1',
      chartType: 'candlestick',
      data: []
    }
  }

  static defaultProps = {
    PAIR: 'USD/CAD',
  }
  
  componentDidMount() {
    this.getChartData(this.props.PAIR);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.PAIR != this.props.PAIR) {
      this.getChartData(nextProps.PAIR);
    }  
  }
  /**
   * 图标时间类型
   */
  onOverlay = (data) => {
    //console.log(data)
    let result = []
    result = data.map((val, index) => {
      return <Item key={index+1} value={val}>
          <FormattedMessage id={val}/>
      </Item>
    })
    return result
  }
  handleVisibleChange = (visible) => {
    this.setState({visible})
  }
  onSelect = (val) => {

    let timeType = val.key
    let timeval = val.props.value
    this.setState({
      visible: false,
      timeType,
      timeval
    }, () => {
      this.getChartData(this.props.PAIR);
    })
  }
  /**
   * 图表类型
   */
  onOverlay1 = (data) => {
    //console.log(data)
    let result = []
    result = data.map((val, index) => {
      return <Item key={index+1} value={val}>
          <FormattedMessage id={val}/>
      </Item>
    })
    return result
  }
  handleVisibleChange1 = (visible) => {
    this.setState({visible1: visible})
  }
  onSelect1 = (val) => {
    this.setState({
      visible1: false,
      chartType: val.props.value,
      wrapper: <div className="rt-chart-wrapper">
        <Charts
          data={this.state.data}
          type={val.props.value}
          decimal={this.props.decimal}
        />
      </div>
    })
  }
  /**
   * 获取K线图数据
   * @return {[type]} [description]
   */
  getChartData(PAIR) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PAIR: PAIR,
        // DIDT: moment().format('YYYYMMDDHHmmss'),
        CHKS: this.state.timeType // 图标时间类型
      })
    }
    myFetch(`${config.rootApi}/mChart`, options).then((rs) => {
      if (rs && rs.dataInfoChart && rs.dataInfoChart.dtaListCharts) {
        let data = this.processData(rs.dataInfoChart.dtaListCharts, 1)
        
        this.setState({
          data,
          wrapper: <div className="rt-chart-wrapper">
            <Charts
              data={data}
              type={this.state.chartType}
              decimal={this.props.decimal}
            />
          </div>
        })
      }
    })
  }

  processData(data, type) {
    // let data = rs.dataInfoChart.dtaListCharts
    data = data.map((d) => {
      if (type == 1) {
        d.date = moment(d.dateTime, 'YYYYMMDDHHmmss').toDate()
        d.open = +d.openPriceAsk
        d.high = +d.highPriceAsk
        d.low = +d.lowPriceAsk
        d.close = +d.closePriceAsk
      } else {
        d.date = moment(d.dateTime, 'YYYYMMDDHHmmss').toDate()
      }
      return d
    })

    return data
  }

  /**
   * 加载更多图表数据
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  loadChartData() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PAIR: this.props.PAIR,
        DIDT: moment().format('YYYYMMDDHHmmss'),
        CHKS: this.props.timeType
      })
    }
    return myFetch(`${config.rootApi}/mChart`, options)
  }
  chartTypeIcon = (type) => {
    let result = <Icon type={require('static/svg/g_2-04.svg')}/>
    switch(type) {
      case 'candlestick':
        result = <Icon type={require('static/svg/g_2-04.svg')}/>
        break;
      case 'line':
        result = <Icon type={require('static/svg/g_2-01.svg')}/>
        break
      case 'bar':
        result = <Icon type={require('static/svg/g_2-02.svg')}/>
        break;
      case 'area':
        result = <Icon type={require('static/svg/g_2-03.svg')}/>
        break;
      default:
        result = <Icon type={require('static/svg/g_2-04.svg')}/>
    }
    return result
  }
  render() {
    //console.log(this.props, 12)
    //console.log(this.state.chartType, 12)
    return (
      <div className="rt-bg-white">
        <ChartsShowItem
          pair={this.props.PAIR}
        />
        <div className="rt-charts-btn">
          <div className="-left">
            <Popover
              visible={this.state.visible1}
              overlay={this.onOverlay(data1)}
              onVisibleChange={
                this.handleVisibleChange1
              }
              onSelect={this.onSelect1}
            >
              <div className="-one">
                {this.chartTypeIcon(this.state.chartType)}
                <FormattedMessage id={this.state.chartType}/>
                <Icon type={require('static/svg/icon_54.svg')}/>
              </div>
            </Popover>
              {/*<div className="-two">
                <span>指标</span>
                <Icon type={require('static/svg/icon_54.svg')}/>
              </div>*/}
          </div>
          <Popover
            visible={this.state.visible}
            overlay={this.onOverlay(data)}
            overlayClassName="rt-popover-change"
            onVisibleChange={
              this.handleVisibleChange
            }
            placement='bottomRight'
            onSelect={this.onSelect}
          >
            <div className="-right">
               <FormattedMessage id={this.state.timeval} />
               <Icon type={require('static/svg/icon_54.svg')}/>
            </div>
          </Popover>
        </div>
        {this.state.wrapper}
      </div>
    )
  }
}