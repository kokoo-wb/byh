import React, { Component } from 'react'
import { WingBlank, Carousel } from 'antd-mobile'

import './style.less'

class NewActivity extends Component {
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
            <div className="new-activity">
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                className="swiper-item"
                                style={{ height: this.state.imgHeight }}
                            >
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                    alt=""
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                                <span>【活动】200元任性拿</span>
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

export default NewActivity