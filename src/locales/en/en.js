
import { position } from './position'
import { trade, setting, currencyPair, time } from './trade'
import { account } from './account'
import { chart } from './chart'
const en_US = {
          en: 'English',
          zh: 'Simplified Chinese',
          placeholder: 'Please enter{name}',
          placeholderSearch: 'search foreign',
          visitor: 'visitor login',
          realAccount: 'real account',
          tipsLogin: 'Visitors for simulated accounts, operations are non real transactions, for real transactions, please open a real account',
          login:'Sign in',
          forgotPassWord:'Forgot password',
          openAccount:'Open an account',
          cancel:'cancel',
          consult: 'Consulting online customer service',
          trade: 'trade',
          position: 'position',
          chat: 'chat',
          finance: 'finance',
          account: 'account',
          set: 'setting',
          message: 'message',
          totalAssets:'total assets',
          availableFunds:'Available funds',
          bond:'Bond',
          floating:'Floating P/L',
          simulation:'simulation',
          chatRoom:'chat room',
          say:'Say a few words',
          name:'Daniel',
          time:'1 minutes ago',
          content:'Good afternoon, everyone. I wish you all a good harvestGood afternoon, everyone. I wish you all a good harvestGood afternoon, everyone. I wish you all a good harvest',
          placeholderTwo: '输入{name}',
          extra:'Please select a bank card',
          ex:'Choose a bank',
          yuan:'Yuan',
          mobile: 'Yuan',
          email: 'Email',
          inputmobile: 'Please enter mobile number',
          inputemail: 'Please enter email number',
          inputVerify: 'Please enter verification code',
          sendout: 'Send verification code',
          secondSendou: 'Resend after ( ) secounds',
          mobilenull: 'Mobile number cannot be empty',
          mobilevalid: 'Mobile number cannot be empty',
          emailnull: 'Email address cannot be empty',
          emailvalid: 'Please enter a valid email address'
        }
  const zh_CN = Object.assign(en_US, trade, setting, position, currencyPair, account, chart, time)

export default en_US;