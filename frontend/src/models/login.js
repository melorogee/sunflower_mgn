import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getBaseInfo } from '@/services/api';
import { getPageQuery } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';

export default {
  namespace: 'login',

  state: {
    //用户名
    user_name: '',
    status: undefined,
    isShowLogin: true,
  },

  effects: {
    *login({ payload }, { call, put }) {
      if (payload.user_name) {
        const user_name = payload.user_name;
        yield put({
          type: 'updateUserName',
          payload: {
            user_name,
          },
        });
        yield put(routerRedux.push('/'));
      } else {
        isShowLogin = true;
        yield put({
          type: 'updateIsShowLogin',
          payload: { isShowLogin },
        });
      }
    },
    *logout(_, { put }) {
      if (document.cookie) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let eqPos = cookie.indexOf('=');
          let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
        if (cookies.length > 0) {
          for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            let domain = window.location.host.substr(window.location.host.indexOf('.'));
            document.cookie =
              name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + domain;
          }
        }
        localStorage.setItem('environment', 'production');
      } else {
        localStorage.setItem('environment', 'development');
      }
      sessionStorage.removeItem('user_name');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/login'));
    },
    *getALLinfo({ payload }, { call, put }) {
      console.log(payload, 'getALLinfo');
      const response = yield call(getBaseInfo, payload);
      yield put({
        type: 'getALLinfoSuccess',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    updateIsShowLogin(state, { payload }) {
      return {
        ...state,
        isShowLogin: payload.isShowLogin,
      };
    },
    updateUserName(state, { payload }) {
      sessionStorage.setItem('user_name', payload.user_name);
      return {
        ...state,
        time_user_name: payload.user_name,
      };
    },
    getALLinfoSuccess(state, { payload }) {
      console.log(payload, 'getALLinfoSuccess');
      const current_authority = payload.data.current_authority;
      const user_name = payload.data.user_name;
      sessionStorage.setItem('user_name', user_name);
      sessionStorage.setItem('time_user_name', user_name);
      sessionStorage.setItem('current_authority', current_authority);

      setAuthority(current_authority);

      return {
        user_name,
        current_authority,
      };
    },
  },
};
