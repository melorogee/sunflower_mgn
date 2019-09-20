import { crmtList, crmtDetail, addDetail } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'crmtInfo',

  state: {
    crmt: [],
    IncomeDetail: [], 
    expenditureDetail: []
  },

  effects: {
    *getCrmtList({ payload }, { call, put }) {
      const response = yield call(crmtList, payload);
      yield put({
        type: 'getCrmtListSuccess',
        payload: response,
      });
    },
    *getCrmtDetail({ payload }, { call, put }) {
      const response = yield call(crmtDetail, payload);
      yield put({
        type: 'getCrmtDetailSuccess',
        payload: response,
      });
    },
    *addDetail({ payload }, { call, put }) {
      const response = yield call(addDetail, payload);
      yield put({
        type: 'addDetailSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    getCrmtListSuccess(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        crmt: payload,
      };
    },
    getCrmtDetailSuccess(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        IncomeDetail: payload.IncomeDetail, 
        expenditureDetail: payload.expenditureDetail, 
      };
    },
    addDetailSuccess(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        success: payload.success,
      };
    },
  },
};
