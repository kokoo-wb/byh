const config = {
  root: 'https://v3.sjctm.com',
  rootApi: 'http://139.224.13.169:8080/ffx_caligulaWebApi',
  rtApi: 'https://kh.rootant.com/api',
  pattern: {
    mobile: /^1[34578]\d{9}$/,
    email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  },
  payment: {
    default: 'ipspaycard'
  },
  timeTick: {
    kchart: 30 * 1000,          // K线刷新
    price: 1 * 1000,            // 当前报价
    account: 10 * 1000, // 账户余额
  }
}

export default config