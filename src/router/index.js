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
        path: '/good',
        meta:{
            title: '商品详情'
        },
        component: (resolve) => require(['../views/Good.vue'], resolve),
    }
];
export default routers;
