import { stringify } from 'qs';
import request from '@/utils/request';

console.log('环境：', process.env.NODE_ENV);
let baseApi = '';
if (process.env.NODE_ENV != 'development') {
    console.log('href地址：', window.location.href);
    if (window.location.href.indexOf('htsc') > -1) {
        console.log('生产环境');
        baseApi = '/';
    } else {
        console.log('测试环境');
        baseApi = '';
    }
}

export async function fakeAccountLogin(params) {
    return request(baseApi + '/api/trust/login_user_info', {
        method: 'POST',
        body: params,
    });
}

export async function getBaseInfo(params) {
    return request(baseApi + '/api/trust/login_basic_info', {
        method: 'POST',
        body: params,
    });
}

// 获取关系图谱数据
export async function getGraph(params) {
    return request(baseApi + '/api/graph', {
        method: 'POST',
        body: params,
    });
}

// 查询特征页
export async function getFeature(params) {
    return request(baseApi + '/api/predict', {
        method: 'POST',
        body: params,
    });
}