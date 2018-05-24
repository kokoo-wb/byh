import React, { Component } from 'react'
import { Button } from 'antd-mobile'

import './style.less'

class ActivityDetail extends Component {
    render() {

        const detail = '<div><p>叙利亚局势紧张，乌克兰也不忘凑凑热闹，先是威胁炸掉俄罗斯刚刚修建的克里米亚大桥，接着为精英部队配发北约军服。据悉近期乌克兰还试射了刚刚从美国引进的标枪反坦克导弹示威俄罗斯。种种迹象表明乌克兰这是要配合美国军事围堵。</p><p><img src="http://p3.pstatp.com/large/pgc-image/15271525818363e41e859cd" img_width="640" img_height="426" alt="俄数万正规军进入乌克兰？美指责违反国际法，俄军回应很有味道" inline="0"></p><p>乌克兰虽然在帮助美国出力，但是内部问题确实一直没有很好的解决。据乌克兰媒体指出，乌克兰东部的混战近日不断升级，大量俄罗斯正规军出现在乌克兰境内。乌克兰政府军军官称，这些武装人员军事素质非常专业，火力异常强悍，绝对不是乌克兰东部民间武装。</p><p><img src="http://p3.pstatp.com/large/pgc-image/1527152581877935e14865a" img_width="1000" img_height="669" alt="俄数万正规军进入乌克兰？美指责违反国际法，俄军回应很有味道" inline="0"></p><p>美国军方声援乌克兰指责俄罗斯军队进入乌克兰明显违背国际法。美联社援引军方的消息称，美军方认为，俄罗斯正规军进入乌克兰东部地区是对乌克兰主权的干涉，违背了相关法规，希望俄罗斯军队快速撤离，不要引起过多冲突造成更坏的国际影响。</p><p><img src="http://p3.pstatp.com/large/pgc-image/1527152581830a6d7254f64" img_width="522" img_height="343" alt="俄数万正规军进入乌克兰？美指责违反国际法，俄军回应很有味道" inline="0"></p><p><strong> </strong> 面对来自美国和乌克兰方面的指控，俄罗斯西部军区司令称，俄罗斯正规军并没有参与乌克兰的内战，但是俄罗斯“民间武装”及乌克兰“民间武装”自发的浪潮俄罗斯方面是无法干预的。俄媒指出，乌克兰仅仅凭借当地武装军事素质过硬就认为是俄罗斯武装，显然是太牵强，这只能说明乌克兰军队战斗力太弱了。</p></div>';

        return (
            <div className="activity-detail">
                <h1>这是个活动名称</h1>
                <p>2018/09/09</p>
                <div className="detail-container" dangerouslySetInnerHTML={{ __html: detail }}></div>
                <div className="footer">
                    <a>抽奖记录</a>
                </div>
            </div>
        )
    }
}

export default ActivityDetail