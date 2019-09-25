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
  });
}

//加减课时
export async function addClass(params) {
  return request(baseApi + '/api/student/addClass', {
    method: 'POST',
    body: params,
  });
}


//查询学生上课详情
export async function getDetailList(params) {
  return request(baseApi + '/api/student/getStudentCourseDetailList', {
    method: 'POST',
    body: params,
  });
}
//收支管理
export async function crmtList(params) {
  console.log(params);
  return request(baseApi + '/api/student/crmtList?type='+params.type+'&date='+params.date, {
    method: 'GET',
  });
}
//收入明细和支出明细
export async function crmtDetail(params) {
  return request(baseApi + '/api/student/crmtDetail?date='+params.date, {
    method: 'GET',
  });
}
//新增明细
export async function addDetail(params) {
  return request(baseApi + '/api/student/addDetail', {
    method: 'POST',
    body: params,
  });
}

//加减课时
export async function addStudent(params) {
  return request(baseApi + '/api/student/addStudent', {
    method: 'POST',
    body: params,
  });
}

//获取班级信息 轻量级
export async function getClassListLite(params) {
  return request(baseApi + '/api/student/getClassListLite', {
    method: 'GET',
  });
}

//获取班级信息 轻量级
export async function getStudentListLite(params) {
  return request(baseApi + '/api/student/getStudentListLite', {
    method: 'GET',
  });
}


//排课
export async function addStudentClass(params) {
  return request(baseApi + '/api/student/addStudentClass', {
    method: 'POST',
    body: params,
  });
}







