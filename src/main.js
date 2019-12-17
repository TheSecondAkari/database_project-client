import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vant from 'vant';
import 'vant/lib/index.css';
import Routers from './router/index.js'
import axios from 'axios';


Vue.use(Vant);
Vue.use(VueRouter);
Vue.config.productionTip = false

const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);


const request = axios.create({
    timeout: 5000,
    baseURL: process.env.NODE_ENV === 'production' ? '' : '/api'
});

request.interceptors.response.use(undefined, error => {
    if (error.response.status >= 400) {
        Vue.prototype.$notify({
            type: 'danger',
            message: error.response.data.errmsg
        });
        try {
            if (error.response.status == 401)
                router.push("/login");
        } catch (err) {
            console.log(err);
        }
    }
    return Promise.reject(error.response);
});

const api = {
    async get(url, data = {}, options = {}) {
        try {
            let res = await request.get(url, {
                params: data,
                headers: {
                    Authorization: sessionStorage.getItem('Authorization'),
                    ...options
                }
            })
            return new Promise((resolve, reject) => {
                if (res.status >= 200 && res.status < 300) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        } catch (err) {
            console.log(err);
        }
    },

    async post(url, data = {}, options = {}) {
        try {
            let res = await request.post(url, data, {
                headers: {
                    Authorization: sessionStorage.getItem('Authorization'),
                    ...options
                }
            });
            // .then(val => {
            //     if(val.status < 300 && val.status >= 200) {
            //         resolve(val);
            //     } else {
            //         alert(val.data.errmsg);
            //         resolve(val);
            //     }
            // })
            return new Promise((resolve, reject) => {
                if (res.status >= 200 && res.status < 300) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        } catch (err) {
            console.log(err);
            console.log('err');
        }
    },

    async put(url, data = {}, options = {}) {
        try {
            let res = await request.put(url, data, {
                headers: {
                    Authorization: sessionStorage.getItem('Authorization'),
                    ...options
                }
            });
            return new Promise((resolve, reject) => {
                if (res.status >= 200 && res.status < 300) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}

Vue.prototype.api = api;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
