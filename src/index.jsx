import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import {
    applyRouterMiddleware,
    Route,
    IndexRoute,
    Router,
    hashHistory,
    withRouter,
} from 'react-router'
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl'
import { Toast, Button } from 'antd-mobile'
import App from './App'
import { HomePage, RealLogin, RealAccount, NewUserRegister } from 'component/user'

import { PositionPage, PositionDetails } from 'component/position'
import { FinancePage } from 'component/finance'
import {
    TradePage,
    InterfaceSetting,
    TradeSearch,
    News,
    // NewMarketOrder,
    SettingOrder
} from 'component/trade'
import {
    AccountPage,
    AccountCondition,
    HistoryAndLogList,
    InoutList,
    LoginSetting,
    MessageAndNotice,
    NoticeDetail,
    DepositDraw,
    DepositResult,
    BankCard,
    AddBankCard,
    ModifyNickname,
    UploadAvatar,
    ModifyPassword,
    ClientAgreement
} from 'component/account'
import { ChatPage } from 'component/chat'


import { Attention, DealAttention, DealDetail, Fans } from 'component/personal/society'

import {
    AceRanking,
    AceSearch,
    DealerDetail,
    DealerRecord,
    DealerRecordDetail,
    DealMatch,
    DealMatchRanking
} from 'component/personal/ranking'

import {
    Commodity,
    MyWeapon,
    WeaponDetail,
    WeaponRecord,
    WeaponRecordDetail
} from 'component/personal/commodity'

import {
    ActivityDetail,
    ActivityList,
    ActivityRecord,
    DealMatchDetail,
    DealMatchJoin,
    DealMatchList,
    DealMatchRules,
    LotteryDrawRecord,
    TaskDetail,
    TaskList,
    TaskRecord,
    TaskRules,
    NewActivity
} from 'component/personal/activity'

import PersonalIndex from 'component/personal/index'

import {
    HelpCenter,
    HelpCenterDetail,
    Service,
    Faq
} from 'component/personal/services'

import {
    PushSetting,
    BindThirdParty,
    About
} from 'component/personal/setting'

import {
    MyDeal,
    DealHistory,
    HistoryRecord
} from 'component/personal/deal'

import {
    InviteFriends,
    InviteShare,
    InviteExplain
} from 'component/personal/invite'

import {
    MessageCenter,
    MessageDetail
} from 'component/personal/message'

import {
    MyPoints,
    MyLevel,
    PointsInstro,
    LevelInstro
} from 'component/personal/bonusPoints'

import 'appRoot/statics/less/app.less'

const routes = (
    <Route path="/" component={App}>
        {/* 首页 */}
        <IndexRoute component={HomePage} />
        <Route path="/trade" component={TradePage} />
        {/* <Route path="/trade/order" component={NewMarketOrder} /> */}
        <Route path="/trade/settingorder" component={SettingOrder} />
        <Route path="/position" component={PositionPage} />
        <Route path="/position/details" component={PositionDetails} />
        <Route path="/reallogin" component={RealAccount} />
        <Route path="/simulation" component={RealLogin} />
        <Route path="/openaccount" component={NewUserRegister} />
        <Route path="/account" component={AccountPage} />
        <Route path="/account/condition" component={AccountCondition} />
        <Route path="/account/history" component={HistoryAndLogList} />
        <Route path="/account/inout" component={InoutList} />
        <Route path="/account/loginsetting" component={LoginSetting} />
        <Route path="/account/message" component={MessageAndNotice} />
        <Route path="/account/depositresult" component={DepositResult} />
        <Route path="/account/depositdraw" component={DepositDraw} />
        <Route path="/account/bankcard" component={BankCard} />
        <Route path="/account/addbankcard" component={AddBankCard} />
        <Route path="/account/modifynickname" component={ModifyNickname} />
        <Route path="/account/uploadavatar" component={UploadAvatar} />
        <Route path="/account/modifypassword" component={ModifyPassword} />
        <Route path="/client/agreement" component={ClientAgreement} />
        <Route path="/setting" component={InterfaceSetting} />
        <Route path="/trade/search" component={TradeSearch} />
        <Route path="/news" component={News} />
        <Route path="/notice/detail" component={NoticeDetail} />
        <Route path="/finance" component={FinancePage} />
        <Route path="/chat" component={ChatPage} />

        <Route path="/personal/attention" component={Attention} />
        <Route path="/personal/dealattention" component={DealAttention} />
        <Route path="/personal/dealdetail" component={DealDetail} />
        <Route path="/personal/fans" component={Fans} />

        <Route path="/personal/aceranking" component={AceRanking} />
        <Route path="/personal/acesearch" component={AceSearch} />
        <Route path="/personal/dealerdetail" component={DealerDetail} />
        <Route path="/personal/dealerrecord" component={DealerRecord} />
        <Route path="/personal/dealerrecorddetail" component={DealerRecordDetail} />
        <Route path="/personal/dealmatch" component={DealMatch} />
        <Route path="/personal/dealmatchranking" component={DealMatchRanking} />

        <Route path="/personal/commodity" component={Commodity} />
        <Route path="/personal/myweapon" component={MyWeapon} />
        <Route path="/personal/weapondetail" component={WeaponDetail} />
        <Route path="/personal/weaponrecord" component={WeaponRecord} />
        <Route path="/personal/weaponrecorddetail" component={WeaponRecordDetail} />

        <Route path="/personal/activitydetail" component={ActivityDetail} />
        <Route path="/personal/activitylist" component={ActivityList} />
        <Route path="/personal/activityrecord" component={ActivityRecord} />
        <Route path="/personal/dealmatchdetail" component={DealMatchDetail} />
        <Route path="/personal/dealmatchjoin" component={DealMatchJoin} />
        <Route path="/personal/dealmatchlist" component={DealMatchList} />
        <Route path="/personal/dealmatchrules" component={DealMatchRules} />
        <Route path="/personal/lotterydrawrecord" component={LotteryDrawRecord} />
        <Route path="/personal/taskdetail" component={TaskDetail} />
        <Route path="/personal/tasklist" component={TaskList} />
        <Route path="/personal/taskrecord" component={TaskRecord} />
        <Route path="/personal/taskrules" component={TaskRules} />
        <Route path="/personal/newactivity" component={NewActivity} />

        <Route path="/personal" component={PersonalIndex} />
        <Route path="/personal/helpcenter" component={HelpCenter} />
        <Route path="/personal/helpcenterdetail" component={HelpCenterDetail} />
        <Route path="/personal/service" component={Service} />
        <Route path="/personal/faq" component={Faq} />

        <Route path="/personal/pushsetting" component={PushSetting} />
        <Route path="/personal/bindthirdparty" component={BindThirdParty} />
        <Route path="/personal/about" component={About} />
        <Route path="/personal/mydeal" component={MyDeal} />
        <Route path="/personal/dealhistory" component={DealHistory} />
        <Route path="/personal/historyrecord" component={HistoryRecord} />

        <Route path="/personal/invitefriends" component={InviteFriends} />
        <Route path="/personal/inviteshare" component={InviteShare} />
        <Route path="/personal/inviteexplain" component={InviteExplain} />

        <Route path="/personal/messagecenter" component={MessageCenter} />
        <Route path="/personal/messagedetail" component={MessageDetail} />

        <Route path="/personal/mypoints" component={MyPoints} />
        <Route path="/personal/mylevel" component={MyLevel} />
        <Route path="/personal/pointsinstro" component={PointsInstro} />
        <Route path="/personal/levelinstro" component={LevelInstro} />
    </Route>
)

render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('app')
)
