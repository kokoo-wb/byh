"use strict"

import React from "react"
import { scaleTime } from "d3-scale"
import { ChartCanvas, Chart, series, axes, helper } from "react-stockcharts"
import moment from 'moment'
import { myFetch, config } from '../utils'
import { ChartSimple } from './'

var { fitWidth, TypeChooser } = helper

export default class ChartSimpleWrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wrapper: <div></div>
    }
  }

  static defaultProps = {
    PAIR: 'USD/CAD'
  }
  
  componentDidMount() {
    this.getChartData();
  }

  /**
   * 获取K线图数据
   * @return {[type]} [description]
   */
  getChartData() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PAIR: this.props.PAIR,
        CHKS: 1
      })
    }
    myFetch(`${config.rootApi}/mChart`, options)
     .then((rs) => {
        if (rs && rs.dataInfoChart && rs.dataInfoChart.dtaListCharts) {
          let data = rs.dataInfoChart.dtaListCharts
          data = data.map((d) => {
            d.date = moment(d.dateTime, "YYYYMMDDHHmmss").toDate()
            return d
          });
          let decimal = 4
          if (this.props.PAIR.includes('JPY')) {
            decimal = 2
          }
          if (this.props.PAIR.includes('XAU')) {
            decimal = 2
          }
          if (this.props.PAIR.includes('XAG')) {
            decimal = 2
          }
          this.setState({
            wrapper: <div className="rt-simple-chart-wrapper"><ChartSimple data={data} type='svg' loadData={this.loadChartData.bind(this)} decimal={decimal}/></div>
          })
        }
     })
  }

  /**
   * 加载更多图表数据
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  loadChartData(date) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        PAIR: this.props.PAIR,
        DIDT: moment(date).subtract(200, 'minutes').format('YYYYMMDDHHmmss'),
        CHKS: 1
      })
    }
    return myFetch(`${config.rootApi}/mChart`, options).then((rs) => {
        if (rs && rs.dataInfoChart && rs.dataInfoChart.dtaListCharts) {
          let data = rs.dataInfoChart.dtaListCharts
          data = data.map((d) => {
            d.date = moment(d.dateTime, "YYYYMMDDHHmmss").toDate()
            return d
          });
          return data
        }
      })
  }

  render() {
    return <div className="rt-bg-white">{this.state.wrapper}</div>
  }
}