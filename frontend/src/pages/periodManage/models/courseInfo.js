import { getStudentCourse, addClass ,getDetailList,getClassListLite,getStudentListLite,addStudentClass} from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'courseInfo',

  state: {
    courseList: [],
    success:false,
    classList: [],
    studentList: []
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
    *getDetailList({ payload }, { call, put }) {
      const response = yield call(getDetailList, payload);
      yield put({
        type: 'getDetailListSuccess',
        payload: response,
      });
    },
    
    *getClassListLite({ payload }, { call, put }) {
      const response = yield call(getClassListLite, payload);
      yield put({
        type: 'getClassListLiteSuccess',
        payload: response,
      });
    },


    *getStudentListLite({ payload }, { call, put }) {
      const response = yield call(getStudentListLite, payload);
      yield put({
        type: 'getStudentListLiteSuccess',
        payload: response,
      });
    },


    
    *addStudentClass({ payload }, { call, put }) {
      const response = yield call(addStudentClass, payload);
      yield put({
        type: 'addStudentClassSuccess',
        payload: response,
      });
    },

  },

  reducers: {
    getStudentCourseSuccess(state, { payload }) {
      // console.log(payload);
      // for(let i=0;i<payload.length;i++){
      //   for(let j=0;j<payload[i].data.length;j++){
      //     payload[i].data[j].courseId = payload[i].courseId
      //   }
      // }
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
    getDetailListSuccess(state, { payload }) {
     
      return {
        ...state,
        detailList: payload,
      };
    },

    getClassListLiteSuccess(state, { payload }) {
      
      const list = []
    
      // for(var key in payload){ 
      //     list.push(<Option value={key}>{payload[key]}</Option>);
      // }
      // for(let i=0;i<payload.length;i++){
      //     list.push(<Option value={payload[i]['id']}>{payload[i]['name']}</Option>);
      // }

      return {
        ...state,
        classList: payload.map(({id,name})=><Option value={id}>{name}</Option>),
      };
    },

    getStudentListLiteSuccess(state, { payload }) {
     
      const list = []
    
      // for(var key in payload){ 
      //     list.push(<Option value={key}>{payload[key]}</Option>);
      // }

      // for(let i=0;i<payload.length;i++){
      //   list.push(<Option value={payload[i]['id']}>{payload[i]['name']}</Option>);
      //  }
       

      return {
        ...state,
        studentList: payload.map(({id,name})=><Option value={id}>{name}</Option>),
      };
    },


    addStudentClassSuccess(state, { payload }) {
      return {
        ...state,
        success: payload.success,
      };
    },
  },
};
