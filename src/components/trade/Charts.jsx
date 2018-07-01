"use strict"

import React from "react"
import { scaleTime } from "d3-scale"
import { format } from "d3-format"
import { timeFormat } from "d3-time-format"

import { myFetch, config } from '../utils'
import moment from 'moment'

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  AreaSeries,
  CandlestickSeries,
  LineSeries,
  MACDSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProviderBuilder } from "react-stockcharts/lib/scale"
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale"
import { OHLCTooltip, MovingAverageTooltip, MACDTooltip } from "react-stockcharts/lib/tooltip"
import { ema, sma, macd } from "react-stockcharts/lib/indicator"
import { fitWidth } from "react-stockcharts/lib/helper"
import { last } from "react-stockcharts/lib/utils"


function getMaxUndefined(calculators) {
  return calculators.map(each => each.undefinedLength()).reduce((a, b) => Math.max(a, b))
}
const LENGTH_TO_SHOW = 50

class Charts extends React.Component {
  constructor(props) {
    super(props)
    // this.getData()
  }

  getData() {
    const { data: initialData } = this.props
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date)
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData)

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 20)])
    const xExtents = [start, end]

    this.state = {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
      xExtents
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getData()
  }

  /**
   * 加载更多图表数据
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  loadChartData() {

  }

  render() {
    //console.log(this.props.PAIR,558)
    // console.log(this.state.data)
    //console.log(this.props.data, '123')
    const { data: initialData, decimal } = this.props
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date)
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData)

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 20)])
    const xExtents = [start, end]


    const { width, ratio, type } = this.props
    // const { data, xScale, xAccessor, displayXAccessor, xExtents } = this.state
    const height = window.htmlFont * 5.1
    const fontSize = window.htmlFont * 0.24
    const lineWidth = 0.01 * window.htmlFont
    const margin = { left: 0, right: 1 * window.htmlFont, top: 20, bottom: 0.5 * window.htmlFont };
    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 , tickStrokeWidth: 1} : {};
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

    //console.log(xAccessor)
    //console.log(displayXAccessor)
    //
    let chartType
    //console.log(type)
    switch(type) {
      case 'candlestick':
        chartType = <CandlestickSeries />
        break
      case 'line':
        chartType = <LineSeries yAccessor={(d) => d.closePriceAsk} />
        break
      case 'bar':
        chartType = <BarSeries strokeWidth={lineWidth} yAccessor={(d) => d.closePriceAsk} />
        break
      case 'area':
        chartType = <AreaSeries yAccessor={(d) => d.closePriceAsk} />
        break
    }

    return (
      <ChartCanvas
        ratio={1/ratio}
        width={width}
        height={height}
        data={data}
        seriesName="MSFT"
        xScale={xScale}
        xExtents={xExtents}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        mouseMoveEvent={true}
        margin={margin}
      >
        <Chart
          id={1}
          yExtents={d => [d.high, d.low]}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            fontSize={fontSize}
            ticks={5}
            tickStroke="#95989A" 
          />
          <YAxis
            axisAt="right"
            orient="right"
            fontSize={fontSize}
            showTicks={true}
            {...yGrid}
            ticks={5}
            inverted={true}
            tickStroke="#95989A"
            tickFormat={format('.' + decimal + 'f')}
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            fontSize={fontSize}
            arrowWidth={0.2 * window.htmlFont}
            rectHeight={0.48 * window.htmlFont}
            rectWidth={0.8 * window.htmlFont}
            yAccessor={d => d.close}
            fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}displayFormat={format('.' + decimal + 'f')}/>
          }
          {chartType}
        </Chart>
      </ChartCanvas>
    )
  }
}

Charts.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  ratio: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  timeType: React.PropTypes.number.isRequired,
  loadData: React.PropTypes.func
}

Charts.defaultProps = {
  type: 1,
  timeType: 1
}
Charts = fitWidth(Charts)

export default Charts