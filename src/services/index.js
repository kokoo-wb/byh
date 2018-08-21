import { ApiBaseName } from "./server"
import { callApi } from './callApi'

export const getUserInfo = (data) => callApi(ApiBaseName + '/api/user/getUserInfo', 'GET', data);

export const login = (data) => callApi(ApiBaseName + '/api/user/login', 'POST', data);

export const getQuestionsList = (data) => callApi(ApiBaseName + '/api/artcle/getQuestionsList', 'POST', data);

export const getHelpersList = (data) => callApi(ApiBaseName + '/api/artcle/getHelpersList', 'POST', data);

export const getHelpersById = (data) => callApi(ApiBaseName + '/api/artcle/getHelpersById', 'POST', data);

export const getMyInviteCode = (data) => callApi(ApiBaseName + '/api/user/getMyInviteCode', 'POST', data);

export const myFocusList = (data) => callApi(ApiBaseName + '/api/user/myFocusList', 'GET', data);