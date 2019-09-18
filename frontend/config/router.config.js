export default [
  {
    path: '/login',
    component: './User/Login',
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/student-info' },
      { path: '/404', redirect: '/student-info' },
      {
        path: '/student-info',
        name: 'studentInfo',
        icon: 'form',
        component: './studentInfo/index',
      },
      {
        path: '/period-manage',
        name: 'periodManage',
        icon: 'form',
        component: './periodManage/index',
      },
      {
        component: '404',
      },
    ],
  },
];
