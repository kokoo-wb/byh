import { ApiBaseName } from "./server"
import { callApi } from './callApi'

export const getUserInfo = (data) => callApi(ApiBaseName + '/api/user/getUserInfo', 'GET');