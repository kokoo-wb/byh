import { ApiBaseName } from "./server"
import { callApi } from './callApi'

export const getUserInfo = (data) => callApi(ApiBaseName + '/api/user/getUserInfo', 'GET', data);

export const login = (data) => callApi(ApiBaseName + '/api/user/login', 'POST', data);

//常见问题列表
export const getQuestionsList = (data) => callApi(ApiBaseName + '/api/artcle/getQuestionsList', 'POST', data);

//帮助中心列表
export const getHelpersList = (data) => callApi(ApiBaseName + '/api/artcle/getHelpersList', 'POST', data);

//帮助文章详情
export const getHelpersById = (data) => callApi(ApiBaseName + '/api/artcle/getHelpersById', 'POST', data);

//我的关注
export const myFocusList = (data) => callApi(ApiBaseName + '/api/user/myFocusList', 'GET', data);

//我的粉丝
export const myFansList = (data) => callApi(ApiBaseName + '/api/user/myFansList', 'GET', data);

//我的粉丝申请
export const waitFocusList = (data) => callApi(ApiBaseName + '/api/user/waitFocusList', 'GET', data);

//取消关注
export const cancelFocus = (data) => callApi(ApiBaseName + '/api/user/cancelFocus', 'GET', data);

//用户武器列表
export const getWeaponListByToKen = (data) => callApi(ApiBaseName + '/api/weapon/getWeaponListByToKen', 'POST', data);

//根据武器获取id查看详情
export const GetWeaponByWeaponObatinId = (data) => callApi(ApiBaseName + '/api/weapon/GetWeaponByWeaponObatinId', 'POST', data);

//激活武器
export const activateWeapon = (data) => callApi(ApiBaseName + '/api/weapon/activateWeapon', 'POST', data);

//删除武器
export const deleteWeapon = (data) => callApi(ApiBaseName + '/api/weapon/deleteWeapon', 'POST', data);

//武器列表
export const weaponList = (data) => callApi(ApiBaseName + '/api/weapon/weaponList', 'POST', data);

//武器详情（商品市场）
export const weaponInfo = (data) => callApi(ApiBaseName + '/api/weapon/weaponInfo', 'POST', data);

//兑换武器
export const obtainWeapon = (data) => callApi(ApiBaseName + '/api/weapon/obtainWeapon', 'POST', data);

//历史武器列表
export const historyWeaponList = (data) => callApi(ApiBaseName + '/api/weapon/historyWeaponList', 'POST', data);

//我的推荐码
export const getMyInviteCode = (data) => callApi(ApiBaseName + '/api/user/getMyInviteCode', 'POST', data);

//我的积分中心
export const pointCenter = (data) => callApi(ApiBaseName + '/api/user/pointCenter', 'POST', data);

//积分明细（赚钱记录）
export const pointLog = (data) => callApi(ApiBaseName + '/api/user/log', 'POST', data);

//等级中心
export const MyLevel = (data) => callApi(ApiBaseName + '/api/user/MyLevel', 'POST', data);

//邀请积分列表
export const logInvite = (data) => callApi(ApiBaseName + '/api/user/logInvite', 'POST', data);

//任务列表
export const getTaskListInfo = (data) => callApi(ApiBaseName + '/api/task/getTaskListInfo', 'POST', data);

//任务详情
export const getTaskInfo = (data) => callApi(ApiBaseName + '/api/task/getTaskInfo', 'POST', data);

//任务记录
export const task = (data) => callApi(ApiBaseName + '/api/task/task', 'POST', data);

//参与者列表
export const getPersonListInfo = (data) => callApi(ApiBaseName + '/api/task/getPersonListInfo', 'POST', data);

//参与活动
export const joinTask = (data) => callApi(ApiBaseName + '/api/task/joinTask', 'POST', data);