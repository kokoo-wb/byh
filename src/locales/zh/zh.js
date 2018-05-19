import { position } from './position'
import { trade, setting, currencyPair, time } from './trade'
import { account } from './account'
import { chart } from './chart'

const zh = {
  en: 'English',
  zh: '简体中文',
  login:'登录',
  forgotPassWord:'忘记密码',
  openAccount:'开户',
  cancel:'取消',
  placeholder: '请输入{name}',
  placeholderTwo: '输入{name}',
  extra:'请选择银行卡',
  ex:'选择银行',
  yuan:'元',
  mobile: '手机',
  email: '邮箱',
  inputmobile: '请输入手机号码',
  inputemail: '请输入邮箱',
  inputVerify: '请输入收到的验证码',
  sendout: '发送验证码',
  secondSendou: '秒后重发',
  mobilenull: '手机号码不能为空',
  mobilevalid: '不是有效的手机号码',
  emailnull: '邮箱不能为空',
  emailvalid: '请输入正确的邮箱格式'
}

const zh_CN = Object.assign(zh, trade, setting, position, currencyPair, account, chart, time)


export default zh_CN;
