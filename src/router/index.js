const routers = [
    {
      path: '/',
      meta: {
        title: '主页面'
      },
      component: (resolve) => require(['../components/Home.vue'], resolve),
    }
  ];
  export default routers;
  