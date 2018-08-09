import { ApiBaseName } from "./server"
import { callApi } from './callApi'

export const getUserInfo = (data) => callApi(ApiBaseName + '/api/user/getUserInfo', 'GET', data);

export const login = (data) => callApi(ApiBaseName + '/api/user/login', 'POST', data);

export const getQuestionsList = (data) => callApi(ApiBaseName + '/api/artcle/getQuestionsList', 'POST', data);