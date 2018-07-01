import { hashHistory } from 'react-router'
import 'whatwg-fetch'
import fetchJsonp from 'fetch-jsonp'
import { Toast } from 'antd-mobile'
import errorJson from './errorJson'

export function callApi(endpoint, method = 'POST', data = {}, jsonp = false) {

    const header = getHeader();

    let authToken = localStorage.token
    if (!authToken) {
        // Toast.hide()
        // // 请先登录
        // Toast.fail('请先登录', 2, () => {
        //     hashHistory.push('/')
        // })
    } else {
        data = Object.assign({ SESN: authToken }, data)
    }

    const bodySteam = encodeURI(new URLSearchParams(Object.entries(data)).toString());

    const myFetch = jsonp ? fetchJsonp : fetch

    let params = {
        method: method,
        headers: header
    }

    if (method != 'GET') {
        params = {
            ...params,
            body: bodySteam != '' ? bodySteam : undefined
        }
    }

    var promise = new Promise((resolve, reject) => {
        myFetch(endpoint, params).then((res) => {
            return res.json()
        }).then((json) => {
            if (json === undefined) {
                resolve({});
            }
            if (json.code == '200') {
                resolve(json);
            } else {
                let error = json.errorInfo
                if (error && error.errorList) {
                    const { errorCode, errorMessageList } = error.errorList[0];
                    if (errorCode == 'st-ml1era2103') {
                        Toast.fail(errorMessageList[0], 2, () => {
                            hashHistory.push('/')
                        })
                    }

                    let lang = localStorage.getItem("language")
                    error.errorList.map((item) => {
                        let errMsg = errorJson[item.errorCode] && errorJson[item.errorCode][lang]
                        if (item.errorParamList) {
                            let replacestr1 = item.errorParamList[0]
                            let replacestr2 = item.errorParamList[1]
                            let newStr1 = errMsg.replace(/\{0\}/g, replacestr1)
                            let newStr2 = newStr1.replace(/\{1\}/g, replacestr2)
                            Toast.fail(newStr2)
                        } else {
                            Toast.fail(errMsg)
                        }
                    })

                    reject(json);
                }
            }
        }).catch((err) => {
            reject(err)
        })
    })

    return promise

}



function getHeader() {
    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (localStorage.getItem('token')) {
        // header.Authorization = `Basic ${localStorage.getItem('token')}`
    }

    console.log(header)
    return new Headers(header)
}
