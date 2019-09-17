import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getFeature } from '@/services/api';
import { getPageQuery } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';

export default {
    namespace: 'featureQuery',
    state: {
        featureArr: []
    },
    effects: {
        *getFeature({ payload }, { call, put }) {
            const response = yield call(getFeature, payload);
            yield put({
              type: 'getFeatureSuccess',
              payload: response,
            });
        },
    },
    reducers: {
        getFeatureSuccess(state, { payload }) {
            return {
                ...state,
                featureArr: payload
            }
        }
    },
};
