import { stringify } from 'qs';
import request from '@/utils/request';

let baseApi = '';

// export async function fakeAccountLogin(params) {
//     return request(baseApi + '/api/trust/login_user_info', {
//         method: 'POST',
//         body: params,
//     });
// }

// export async function getBaseInfo(params) {
//     return request(baseApi + '/api/trust/login_basic_info', {
//         method: 'POST',
//         body: params,
//     });
// }

//获取学生信息列表
export async function getStudentList(params) {
  return request(baseApi + '/api/student/getStudentList', {
    method: 'POST',
    body: params,
  });
}

//获取学生课时列表
export async function getStudentCourse(params) {
  return request(baseApi + '/api/student/getStudentCourse', {
    method: 'GET',
    // body: params,
  });
}

//加减课时
export async function addClass(params) {
  return request(baseApi + '/api/student/addClass', {
    method: 'POST',
    body: params,
  });
}
