import React, { Component } from 'react'
import { WingBlank, Carousel } from 'antd-mobile'

import './style.less'

class ActivityList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    render() {

        return (
            <div className="commodity-container">
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>

                <div className="feature-box">
                    <div>
                        <p>抽奖活动</p>
                        <p>抽奖活动简介</p>
                    </div>
                    <img src={require('../../../statics/images/icon_8.png')} />
                </div>

                <div className="feature-box">
                    <div>
                        <p>交易比赛</p>
                        <p>交易比赛简介</p>
                    </div>
                    <img src={require('../../../statics/images/icon_3.png')} />
                </div>

                <div className="feature-box">
                    <div>
                        <p>推荐好友</p>
                        <p>推荐好友简介</p>
                    </div>
                    <img src={require('../../../statics/images/icon_7.png')} />
                </div>

                <div className="feature-box">
                    <div>
                        <p>任务</p>
                        <p>任务简介</p>
                    </div>
                    <img src={require('../../../statics/images/icon_6.png')} />
                </div>
            </div>
        )
    }
}

export default ActivityList