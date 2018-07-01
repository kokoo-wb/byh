import { ApiBaseName } from "./server"
import { callApi } from './callApi'

export const getUserInfo = (data) => callApi(ApiBaseName + '/waihui/api/user/getUserInfo?token=' + data.token, 'GET', data);

export const login = (data) => callApi(ApiBaseName + '/waihui/api/user/login', 'POST', data);