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
        icon: 'team',
        component: './studentInfo/index',
      },
      {
        path: '/period-manage',
        name: 'periodManage',
        icon: 'calendar',
        component: './periodManage/index',
      },
      {
        path: '/crmt',
        name: 'crmt',
        icon: 'account-book',
        component: './crmt/index',
      },
      {
        component: '404',
      },
    ],
  },
];
