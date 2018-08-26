const version = ''

// 协议
const HTTP = 'http://'
const HTTPS = 'https://'

// 测试环境Server
const TEST_API_SERVER = HTTP + '139.199.175.39:8015'

// 生产环境Server
const PRO_API_SERVER = HTTP + '139.199.175.39:8015'


const ApiBase = {
    'localhost': TEST_API_SERVER,
    '47.104.203.217': TEST_API_SERVER,
    'test-xx.xxx.com': TEST_API_SERVER,
    'xx.xxx.com': PRO_API_SERVER,
}

export const ApiBaseName = ApiBase[window.location.hostname];