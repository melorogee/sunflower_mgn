import { getStudentList } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'studentInfo',

  state: {
    studentList: [],
  },

  effects: {
    *getStudentList({ payload }, { call, put }) {
      const response = yield call(getStudentList, payload);
      yield put({
        type: 'getStudentListSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    getStudentListSuccess(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        // studentList
        studentList: payload,
      };
    },
  },
};
