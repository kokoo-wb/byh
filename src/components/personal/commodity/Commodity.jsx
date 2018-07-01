import React, { Component } from 'react'
import { Carousel, WingBlank, Modal, Icon } from 'antd-mobile'

import './style.less'

class Commodity extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
            visible: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    showModal = () => {
        this.setState(Object.assign({}, this.state, { visible: true }));
    }

    hideModal = () => {
        this.setState(Object.assign({}, this.state, { visible: false }));
    }

    render() {

        return (
            <div className="commodity-container">
                <div className="swiper-box">
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
                        <li onClick={this.showModal}>
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

                    <Modal
                        className="commodity-modal"
                        visible={this.state.visible}
                    >
                        <div className="commodity-box">
                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                            <p className="weapon-name">武器名称</p>
                            <p className="endtime">2017/09/09 00:00 到期</p>
                            <div className="commodity-msg">
                                <p>兑换积分：7777</p>
                                <p>所剩数量：809</p>
                                <p>商品条件：叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗</p>
                            </div>
                            <a>立即兑换</a>
                            <div className="close-btn" onClick={this.hideModal}>
                                <Icon type="cross" className="close-ico" />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Commodity