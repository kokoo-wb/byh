import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd-mobile'
import moment from 'moment'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { messages } from './'

// 空操作
function noop() {}

const today = moment().format('YYYY-MM-DD')
const first = moment(today).subtract('2', 'week').format('YYYY-MM-DD')
const s1 = moment(first).startOf('week').format('D')
const e1 = moment(first).endOf('week').format('D')

const second = moment(today).subtract('1', 'week').format('YYYY-MM-DD')
const s2 = moment(second).startOf('week').format('D')
const e2 = moment(second).endOf('week').format('D')

const third = moment(today).format('YYYY-MM-DD')
const s3 = moment(third).startOf('week').format('D')
const e3 = moment(third).endOf('week').format('D')

const fourth = moment(today).add('1', 'week').format('YYYY-MM-DD')
const s4 = moment(fourth).startOf('week').format('D')
const e4 = moment(fourth).endOf('week').format('D')

const todayIndex = moment().weekday()
//console.log(todayIndex)
const DEFAULT_CAROUSEL_INDEX = 2

const dataArr = [
  {
    arr: generateWeekDay(s1, e1),
    data: moment(first).startOf('week').format('YYYY-MM-DD'),
    dayIndex: 0,
  },
  {
    arr: generateWeekDay(s2, e2),
    data: moment(second).startOf('week').format('YYYY-MM-DD'),
    dayIndex: 0,
  },
  {
    arr: generateWeekDay(s3, e3),
    data: moment(today).format('YYYY-MM-DD'),
    dayIndex: todayIndex,
  },
  {
    arr: generateWeekDay(s4, e4),
    data: moment(fourth).startOf('week').format('YYYY-MM-DD'),
    dayIndex: 0,
  },
]

function generateWeekDay(start, end) {
  start = parseInt(start)
  end = parseInt(end)
  if (end - start > 0) {
    return [start, start + 1, start + 2, start + 3, start + 4, start + 5, end]
  }
  let arr = [start]
  const restArr = []
  const delta = 7 - end

  for (let i = 1; i < delta; i++) {
    arr.push(start + i)
  }
  for (let i = 1; i <= end; i++) {
    restArr.push(i)
  }
  return arr.concat(restArr)
}

function generateWeek(i) {
  switch (i) {
    case 0: return '日'
    case 1: return '一'
    case 2: return '二'
    case 3: return '三'
    case 4: return '四'
    case 5: return '五'
    case 6: return '六'
  }
}

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      dayIndex: todayIndex,
      date: moment().format('YYYY-MM-DD')
    }
  }
  flag = true
  indexNum = DEFAULT_CAROUSEL_INDEX
  date = moment().format('YYYY-MM-DD')
  componentDidMount() {
    this.props.onChange(moment().format('YYYY-MM-DD'))
  }
  render() {
    const formatMessage = this.props.intl.formatMessage
    const { carouselIndex, date } = this.state
    const month = moment(this.date).format('M')
    return (
      <Carousel
        className="rt-calendars-style"
        selectedIndex={DEFAULT_CAROUSEL_INDEX}
        afterChange={
          (num) => {
            //console.log(num, this.indexNum, 100)
            if (num != this.indexNum) {
              this.flag = true
              //console.log(num, 'num')
              this.date = dataArr[num].data
              if (this.state.dayIndex != todayIndex) {
                if (num == DEFAULT_CAROUSEL_INDEX) {
                  this.setState({
                   dayIndex : todayIndex
                  })
                } else{
                  this.setState({
                   dayIndex : 0
                  })
                }
              }
              this.props.onChange(dataArr[num].data)
              this.indexNum = num
            }
            
          }
        }
      >
        {
          dataArr.map((v, i) => {
            //console.log(v, i, 0)
            let symbol = false
            if (moment().format('YYYY-MM-DD') === v.data) {
              symbol = true
            }
            return (
              <div key={i} className={`cm-calendar-box`}>
                <div className={`-month`}>
                  <span>{month}{formatMessage(messages.month)}</span>
                </div>
                <div className={`-week`}>
                  {
                    v.arr.map((vv, ii) => {
                      //console.log(vv, ii, 1)
                      let today = false
                      if (symbol) {
                        if (vv === parseInt(moment().format('D'))) {
                          today = true
                        }
                      }
                      return (
                        <section
                          key={ii}
                          onClick={
                            () => {
                              this.flag = false
                              if (this.state.dayIndex === ii) return
                              let delta
                              delta = ii - v.dayIndex
                            const newDate = moment(v.data).add(delta, 'day').format('YYYY-MM-DD')
                              this.setState({dayIndex : ii, data: newDate}, () => {
                                this.props.onChange(newDate)
                              })
                            }
                          }
                        >
                          <span className={`${v.dayIndex == ii ? '-active' : ''}`}>{today ? formatMessage(messages.ChartRoomToday) : generateWeek(ii)}</span>
                          <span
                            className={`-day ${this.flag ? v.dayIndex == ii ? '-active' : '' : 
                            this.state.dayIndex == ii ? '-active' : ''
                          }`}
                          >
                            {vv}
                          </span>
                        </section>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </Carousel>
    )
  }
}

Calendar.defaultProps = {
  onChange: noop,
}

Calendar.propTypes = {
  onChange: PropTypes.func,
}

export default injectIntl(Calendar)