const routers = [
    {
        path: '/',
        meta: {
            title: '主页面'
        },
        component: (resolve) => require(['../views/Home.vue'], resolve),
    },
    {
        path: '/login',
        meta: {
            title: '登陆'
        },
        component: (resolve) => require(['../views/Login.vue'], resolve),
    },
    {
        path: '/register',
        meta: {
            title: '注册'
        },
        component: (resolve) => require(['../views/Register.vue'], resolve),
    },
    {
        path: '/myinfo',
        meta: {
            title: '我的信息'
        },
        component: (resolve) => require(['../views/Myinfo.vue'], resolve),
    },
    {
        path: '/addressList',
        meta: {
            title: '地址管理'
        },
        component: (resolve) => require(['../views/AddressList.vue'], resolve),
    },
    {
        path: '/myselling',
        meta: {
            title: '我发布的'
        },
        component: (resolve) => require(['../views/Myselling.vue'], resolve),
    },
    {
        path: '/mysold',
        meta: {
            title: '我卖出的'
        },
        component: (resolve) => require(['../views/Mysold.vue'], resolve),
    },
    {
        path: '/seller',
        meta: {
            title: '商家'
        },
        component: (resolve) => require(['../views/Seller.vue'], resolve),
    },
    {
        path: '/notsent',
        meta: {
            title: '未发货'
        },
        component: (resolve) => require(['../views/Notsent.vue'], resolve),
    },
    {
        path: '/good',
        meta: {
            title: '商品详情'
        },
        component: (resolve) => require(['../views/Good.vue'], resolve),
    }
];
export default routers;
