
export const linechart = function(id, data) {
    const echarts = require('echarts/lib/echarts');

    require('echarts/lib/chart/line');
    
    const myChart = echarts.init(document.getElementById(id));

    const dataIncomeRate = data.map(item => item.incomeRate);
    const dataRewardRate = data.map(item => item.rewardRate);
    const dataAxis = [7, 6, 5, 4, 3, 2, 1]

    myChart.setOption({
        grid: {
            top: '30',
            left: '40',
            right: '50',
            bottom: '15',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,

            axisLabel: {
                fontSize: 28,
                color: '#7a8489',
                formatter: function(value) {
                    const datenow = new Date();
                    const oneday = 1000 * 60 * 60 * 24;
                    const day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                    const dateValue = new Date(datenow - value * oneday);
                    const dateAxisValue = dateValue.getMonth() + 1 + '-' + dateValue.getDate()
                    return dateAxisValue + '\n' + day[dateValue.getDay()];
                }
            },
            axisLine: {
                show: true
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
                fontSize: 28,
                formatter: '{value}',
                color: '#7a8489'
            },
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisPointer: {
                snap: true
            }
        },
        series: [
            {
                name: '收益率',
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
                name: '回报率',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbolSize: 0,
                data: dataRewardRate,
                lineStyle: {
                    width: 4,
                    color: '#38aae0'
                }
            }
        ]
    });
}