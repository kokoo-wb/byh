"use strict"

import React from "react"
import { scaleTime } from "d3-scale"
import { format } from "d3-format"

import { ChartCanvas, Chart, series, axes, helper } from "react-stockcharts"
import moment from 'moment'

const { AreaSeries } = series
const { XAxis, YAxis } = axes
const { fitWidth } = helper

class ChartSimple extends React.Component {
  constructor(props) {
    super(props)

    const { data } = props

    this.state = {
      data: data,
      begin: data[0].date,
      end: data[data.length - 1].date,
    }
  }

  handleDownloadMore() {
    this.props.loadData(this.state.begin).then((data) => {
      let newData = Object.assign(data, this.state.data)
      this.setState({
        data: newData,
        begin: newData[0].date
      })
    })
  }

  render() {
    const { type, width, ratio, decimal } = this.props

    const { data } = this.state
    return (
      <ChartCanvas ratio={ratio} width={width} height={400}
          margin={{ right: window.htmlFont * 1, left: 0, top: 30, bottom: 50 }}
          seriesName="MSFT"
          data={data} type={type}
          xAccessor={(d) => {
            return d ? d.date : ''
          }} xScale={scaleTime()}
          onLoadMore={this.handleDownloadMore.bind(this)}
          panEvent={false}
          zoomEvent={false}
          >
        <Chart id={0} yExtents={d => d.closePriceAsk}>
          <XAxis axisAt="bottom" orient="bottom" fontSize={ window.htmlFont * 0.24} ticks={6} tickFormat={d => moment(d).format('HH:mm')}/>
          <YAxis axisAt="right" orient="right" fontSize={ window.htmlFont * 0.24}  ticks={4} innerTickSize={15} tickFormat={format('.' + decimal + 'f')} />
          <AreaSeries yAccessor={(d) => d.closePriceAsk}/>
        </Chart>
      </ChartCanvas>
    );
  }
}

ChartSimple.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  ratio: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
  loadData: React.PropTypes.func
};

ChartSimple.defaultProps = {
  type: "svg",
};
ChartSimple = fitWidth(ChartSimple)

export default ChartSimple