import { getStudentList,addStudent } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'studentInfo',

  state: {
    studentList: [],
    success:false

  },

  effects: {
    *getStudentList({ payload }, { call, put }) {
      const response = yield call(getStudentList, payload);
      yield put({
        type: 'getStudentListSuccess',
        payload: response,
      });
    },
    *addStudent({ payload }, { call, put }) {
      const response = yield call(addStudent, payload);
      yield put({
        type: 'addStudentSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    getStudentListSuccess(state, { payload }) {
      return {
        ...state,
        // studentList
        studentList: payload,
      };
    },
    addStudentSuccess(state, { payload }) {
      return {
        ...state,
        success: payload.success,
      };
    },
  },
};
