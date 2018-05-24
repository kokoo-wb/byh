import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile'

import './style.less'

class Commodity extends Component {
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
                <div style={{ borderBottom: '1px solid #e8e8e8' }}>
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
                </div>


                <div className="menu-choose">
                    <div className="menu-choose-content">
                        <a className="active">交易工具</a>
                        <a>会员提升</a>
                        <a>其他</a>
                    </div>
                </div>

                <div className="commodity-weapon">
                    <ul>
                        <li>
                            <div className="weapon-img">
                                <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                            </div>
                            <div className="weapon-msg">
                                <p>武器名称</p>
                                <p>兑换积分：7777</p>
                                <p>所剩数量：809</p>
                                <p>商品条件：这个是文字编辑内容</p>
                                <p>2017/09/09 00:00 到期</p>
                            </div>
                            <a className="use-btn">立即使用</a>
                        </li>

                        <li>
                            <div className="weapon-img">
                                <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                            </div>
                            <div className="weapon-msg">
                                <p>武器名称</p>
                                <p>兑换积分：7777</p>
                                <p>所剩数量：809</p>
                                <p>商品条件：这个是文字编辑内容</p>
                                <p>2017/09/09 00:00 到期</p>
                            </div>
                            <a className="use-btn-disable">立即使用</a>
                        </li>

                        <li>
                            <div className="weapon-img">
                                <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                            </div>
                            <div className="weapon-msg">
                                <p>武器名称</p>
                                <p>兑换积分：7777</p>
                                <p>所剩数量：809</p>
                                <p>商品条件：这个是文字编辑内容</p>
                                <p>2017/09/09 00:00 到期</p>
                            </div>
                            <a className="use-btn">立即使用</a>
                        </li>

                        <li>
                            <div className="weapon-img">
                                <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                            </div>
                            <div className="weapon-msg">
                                <p>武器名称</p>
                                <p>兑换积分：7777</p>
                                <p>所剩数量：809</p>
                                <p>商品条件：这个是文字编辑内容</p>
                                <p>2017/09/09 00:00 到期</p>
                            </div>
                            <a className="use-btn">立即使用</a>
                        </li>
                    </ul>

                    <div className="bonus-point">当前积分：2423</div>
                </div>
            </div>
        )
    }
}

export default Commodity