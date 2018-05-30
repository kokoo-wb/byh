
export const linechart = function (id, data) {
    const echarts = require('echarts/lib/echarts')

    require('echarts/lib/chart/line')

    const myChart = echarts.init(document.getElementById(id))

    const dataIncomeRate = data.map(item => item.incomeRate)
    const dataAvgBackRate = data.map(item => item.avgBackRate)
    const dataMaxBackRate = data.map(item => item.maxBackRate)
    const dataAxis = [7, 6, 5, 4, 3, 2, 1]

    myChart.setOption({
        grid: {
            top: '30',
            left: '30',
            right: '30',
            bottom: '15',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,

            axisLabel: {
                fontSize: 20,
                color: '#969696',
                formatter: function (value) {
                    const datenow = new Date();
                    const oneday = 1000 * 60 * 60 * 24;
                    const day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                    const dateValue = new Date(datenow - value * oneday);
                    const dateAxisValue = dateValue.getMonth() + 1 + '-' + dateValue.getDate()
                    return dateAxisValue + '\n\n' + day[dateValue.getDay()];
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#e8e8e8'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: dataAxis
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 24,
                formatter: '{value}',
                color: '#969696',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#e8e8e8'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e8e8e8'
                }
            },
            axisPointer: {
                snap: true
            }
        },
        series: [
            {
                name: '获益率',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                data: dataIncomeRate,
                lineStyle: {
                    width: 4,
                    color: '#ff0000'
                }
            },
            {
                name: '平均回撤率',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                data: dataAvgBackRate,
                lineStyle: {
                    width: 4,
                    color: '#38aae0'
                }
            },
            {
                name: '最大回撤率',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                data: dataMaxBackRate,
                lineStyle: {
                    width: 4,
                    color: '#00d94b'
                }
            }
        ]
    })
}