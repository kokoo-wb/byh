import React, { Component } from 'react'
import { defineMessages, intlShape, injectIntl, FormattedMessage } from 'react-intl'
import { hashHistory } from 'react-router'
import { Icon, Grid, Modal } from 'antd-mobile'
import { messagex } from './'



const dataArr = [
  {
    icon: <Icon type={require('static/svg/icon_47.svg')}/>,
    name: <span>
            <FormattedMessage id="ChangeDeposit"/>
          </span>,
    deposit:true,
    link: '/account/depositdraw'
  },
  {
    icon: <Icon type={require('static/svg/icon_46.svg')}/>,
    name: <FormattedMessage id="clientAgreement"/>,
    link: '/client/agreement'
  },
  {
    icon: <Icon type={require('static/svg/icon_45.svg')}/>,
    name: <FormattedMessage id="clientService"/>,
    link: '/'
  },
  {
    icon: <Icon type={require('static/svg/icon_48.svg')}/>,
  name: <span>
            <FormattedMessage id="notice"/>
          </span>,
    link: '/account/message'
  },
  {
    icon: <Icon type={require('static/svg/icon_49.svg')}/>,
    name: <span>
            <FormattedMessage id="ChangeTradeHistory"/>
          </span>,
    link: '/account/history'
  },
  {
    icon: <Icon type={require('static/svg/icon_50.svg')}/>,
    name: <FormattedMessage id="aboutUs"/>,
    link: '/'
  }
]

  const onFetchLink = function (val,formatMessage) {
    
    if (val.deposit) {
      const alert = Modal.alert
      let close  = alert(<div className="rt-deposit-withdraw-tips">
        <span>{formatMessage(messagex.prompts)}</span>
        <span
          className="-cross"
          onClick={
            () => {
              close.close()
            }
          }
        >
          <Icon type="cross"/>
        </span>
      </div>, <div className="alert-tip">
        <p>{formatMessage(messagex.AccountIsDemo)}</p>
        <p>{formatMessage(messagex.DepositIsDemoAction)}</p>
        <p>{formatMessage(messagex.ifDepositToOppen)}</p>
      </div>, [
        { text: formatMessage(messagex.OpenAccountRightNow), onPress: () => {hashHistory.push('/openaccount')} },
        { text: formatMessage(messagex.EnjoyDepositFirst), onPress: () => {hashHistory.push(`${val.link}`)} },
      ])
      return
    }else{
      hashHistory.push(val.link)
    }
    
  }
class AccountItemAll extends Component {
  
  render() {
    return (
      <div className="rt-account-itemall">
        <Grid data={dataArr}
          columnNum={3}
          hasLine={false}
          renderItem={(val, index) => (
            <div
              key={index}
              className="-item"
              onClick={
                () => {
                  onFetchLink(val,this.props.intl.formatMessage)
                }
              }
            >
              <span className="-left">{val.icon}</span>
              <span>
                {
                  val.name
                }
              </span>
              
            </div>
          )}
        />
      </div>
    )
  }
}
// const AccountItemAll = function() {
//   const formatMessage = this.props.intl.formatMessage
//   return (
//     <div className="rt-account-itemall">
//       <Grid data={dataArr}
//         columnNum={3}
//         hasLine={false}
//         renderItem={(val, index) => (
//           <div
//             key={index}
//             className="-item"
//             onClick={
//               () => {
//                 onFetchLink(val,formatMessage)
//               }
//             }
//           >
//             <span className="-left">{val.icon}</span>
//             <span>
//               {
//                 val.name
//               }
//             </span>
            
//           </div>
//         )}
//       />
//     </div>
//   )
// }

export default injectIntl(AccountItemAll)
