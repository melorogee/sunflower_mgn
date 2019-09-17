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
            { path: '/', redirect: '/customer-create' },
            { path: '/404', redirect: '/customer-create' },
            // {
            //     path: '/index',
            //     name: 'home',
            //     icon: 'home',
            //     component: './Index/index',
            // },
            {
                path: '/customer-create',
                name: 'customerCreate',
                icon: 'form',
                component: './customer-create/index',
            },
            {
                path: '/customer',
                name: 'customerPortrait',
                icon: 'bar-chart',
                routes: [
                    {
                        path: '/customer/customer-portrait',
                        name: 'customerPortraitIndex',
                        component: './customer-portrait/index'
                    },
                    {
                        path: '/customer/customer-manage',
                        name: 'customerManageIndex',
                        component: './customer-manage/index'
                    },
                ]
            },
            {
                component: '404',
            },
        ],
    },
];
