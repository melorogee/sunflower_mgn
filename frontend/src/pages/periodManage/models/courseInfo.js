import { getStudentCourse } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'courseInfo',

  state: {
    courseList: [],
  },

  effects: {
    *getCourseList({ payload }, { call, put }) {
      const response = yield call(getStudentCourse, payload);
      yield put({
        type: 'getCourseListSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    getCourseList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        courseList: payload,
      };
    },
  },
};
