import React, { Component } from 'react'
import { Carousel, WingBlank, Modal, Icon, Toast } from 'antd-mobile'

import './style.less'

import * as Api from '../../../services';

class Commodity extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
            visible: false,
            weaponList: [],
            myPoint: 0,
            weaponDetail: {},
            isHasWeapon: 0
        }
    }
    componentWillMount() {
        Api.weaponList({
            token: localStorage.getItem('token'),
            pageSize: 10,
            pageNum: 1
        }).then((res) => {
            if(res.data){
                this.setState({
                    weaponList: res.data.weaponDtoList,
                    myPoint: res.data.myPoint,
                    isHasWeapon: res.data.isHasWeapon
                })
            }
        })
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    showModal = (weaponId) => () => {
        if(this.state.isHasWeapon==1){
            Toast.info('存在未使用武器')
            return false;
        }
        this.setState(Object.assign({}, this.state, { visible: true }),()=>{
            Api.weaponInfo({
                token: localStorage.getItem('token'),
                weaponId: weaponId
            }).then((res) => {
                if(res.data){
                    this.setState({
                        weaponDetail: res.data
                    })
                }
            })
        });
    }

    hideModal = () => {
        this.setState(Object.assign({}, this.state, { visible: false }));
    }

    obtainWeapon = (weaponId) => () => {
        Api.obtainWeapon({
            token: localStorage.getItem('token'),
            weaponId: weaponId
        }).then((res) => {
            if(res.data){
                Toast.info(res.msg)
            }
        })
    }

    render() {
        const { weaponList, myPoint, weaponDetail } = this.state

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
                    {
                        weaponList.length>0?(<ul>
                            {
                                weaponList.map(item=>{
                                    return (
                                        <li>
                                            <div className="weapon-img">
                                                <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                                            </div>
                                            <div className="weapon-msg">
                                                <p>{item.weaponName}</p>
                                                <p>兑换积分：{item.needPoints}</p>
                                                <p>所剩数量：{item.num}</p>
                                                <p>商品条件：{item.Info}</p>
                                                <p>{item.endTime} 到期</p>
                                            </div>
                                            <a className="use-btn" onClick={this.showModal(item.id)}>立即兑换</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>):(<div style={{textAlign: 'center', marginTop: 100}}>暂无内容^_^!!</div>)
                    }

                    <div className="bonus-point" onClick={this.showModal(2)}>当前积分：{myPoint}</div>

                    <Modal
                        className="commodity-modal"
                        visible={this.state.visible}
                    >
                        <div className="commodity-box">
                            <img src="http://img1.imgtn.bdimg.com/it/u=2511394165,1594141098&fm=27&gp=0.jpg" />
                            <p className="weapon-name">{weaponDetail.weaponName}</p>
                            <p className="endtime">{weaponDetail.endTime} 到期</p>
                            <div className="commodity-msg">
                                <p>兑换积分：{weaponDetail.needPoints}</p>
                                <p>所剩数量：{weaponDetail.num}</p>
                                <p>商品条件：{weaponDetail.info}</p>
                            </div>
                            <a onClick={this.obtainWeapon(weaponDetail.id)}>立即兑换</a>
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