import { getStudentCourse, addClass } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'courseInfo',

  state: {
    courseList: [],
    success:false
  },

  effects: {
    *getStudentCourse({ payload }, { call, put }) {
      const response = yield call(getStudentCourse, payload);
      yield put({
        type: 'getStudentCourseSuccess',
        payload: response,
      });
    },
    *addClass({ payload }, { call, put }) {
      const response = yield call(addClass, payload);
      yield put({
        type: 'addClassSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    getStudentCourseSuccess(state, { payload }) {
      console.log(payload);
      for(let i=0;i<payload.length;i++){
        for(let j=0;j<payload[i].data.length;j++){
          payload[i].data[j].courseId = payload[i].courseId
        }
      }
      return {
        ...state,
        courseList: payload,
      };
    },
    addClassSuccess(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        success: payload.success,
      };
    },
  },
};
