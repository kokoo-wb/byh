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
import { News } from 'component/trade'

import { FinancePage } from 'component/finance'

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
import { Attention, DealDetail, Fans } from 'component/personal/society'
import PersonalIndex from 'component/personal/index'

import {
  HelpCenter,
  Service,
  Faq
} from 'component/personal/services'

import 'appRoot/statics/less/app.less'

const routes = (
  <Route path="/" component={App}>
    {/* 首页 */}
    <IndexRoute component={HomePage}/>
    <Route path="/reallogin" component={RealAccount} />
    <Route path="/simulation" component={RealLogin} />
    <Route path="/openaccount" component={NewUserRegister} />
    <Route path="/account" component={AccountPage} />
    <Route path="/account/condition" component={AccountCondition}/>
    <Route path="/account/history" component={HistoryAndLogList}/>
    <Route path="/account/inout" component={InoutList}/>
    <Route path="/account/loginsetting" component={LoginSetting}/>
    <Route path="/account/message" component={MessageAndNotice}/>
    <Route path="/account/depositresult" component={DepositResult}/>
    <Route path="/account/depositdraw" component={DepositDraw}/>
    <Route path="/account/bankcard" component={BankCard}/>
    <Route path="/account/addbankcard" component={AddBankCard}/>
    <Route path="/account/modifynickname" component={ModifyNickname}/>
    <Route path="/account/uploadavatar" component={UploadAvatar}/>
    <Route path="/account/modifypassword" component={ModifyPassword}/>
    <Route path="/client/agreement" component={ClientAgreement}/>
    <Route path="/news" component={News} />
    <Route path="/notice/detail" component={NoticeDetail} />
    <Route path="/finance" component={FinancePage} />
    <Route path="/chat" component={ChatPage} />
    <Route path="/personal/attention" component={Attention} />
    <Route path="/personal/dealdetail" component={DealDetail} />
    <Route path="/personal/fans" component={Fans} />
    <Route path="/personal" component={PersonalIndex} />
    <Route path="/personal/helpcenter" component={HelpCenter} />
    <Route path="/personal/service" component={Service} />
    <Route path="/personal/faq" component={Faq} />
  </Route>
)

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
