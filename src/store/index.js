import Vue from 'vue';
import Vuex from 'vuex';
import api from '../main.js'
Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
    state: {
        user: {
            id: 0,
            name: "未登录",
            username: "",
        },
        addressList: [],
        cartList: [],
    },
    getters: {
        UserName: state => {
            return state.user.name;
        },
        AddressList: state => {
            return state.addressList;
        },
        CartList: state => {
            return state.cartList;
        },
    },
    mutations: {
        logout(state) { //登出按钮触发，还需继续补全，登出后，所有的状态都要初始化，购物车，自己的商品，订单等等
            state.user = {
                id: 0,
                name: "未登录",
                username: ""
            };
            state.addressList = [];
        },
        addCart(state, good) {
            var list = [];
            if (state.cartList.length == 0) {
                list["name"] = good.vendor.name;
                list["goods"] = [];
                good["add"] = false;
                list["goods"].push(good);
                state.cartList.push(list);
                console.log(state.cartList)
                return;
            } else {
                var mask = 1
                state.cartList.forEach(v => {
                    if (v.name == good.vendor.name) {
                        mask = 0;
                        if (v.goods.id != good.id) {
                            good["add"] = false;
                            v.goods.push(good);
                        }
                    }
                })
                if (mask) {
                    list["name"] = good.vendor.name;
                    list["goods"] = [];
                    good["add"] = false;
                    list["goods"].push(good);
                    state.cartList.push(list);
                }
            }
            console.log("!!!!!!!!!!!!")
            console.log(state.cartList)
        },
        async getMyInfo(state) {
            let data = await api.get('/user');
            state.user = data.data;
        },
        async getAddresses(state) {
            let data = await api.get("/addresses");
            if (data.status >= 200 && data.status < 300) {
                data = data.data;
                var tempList = [];
                for (var i = 0; i < data.length; i++) {
                    var address = '';
                    if (data[i].province == data[i].city)  //如果省份和城市是一样的，例如上海市，北京市，address避免重复
                        address = data[i].province + ' ' + data[i].county + ' ' + data[i].detail;
                    else
                        address = data[i].province + ' ' + data[i].city + ' ' + data[i].county + ' ' + data[i].detail;
                    tempList.push({
                        id: data[i].id,
                        name: data[i].name,
                        tel: data[i].phone,
                        province: data[i].province,
                        city: data[i].city,
                        county: data[i].county,
                        addressDetail: data[i].detail,
                        areaCode: data[i].code,
                        address: address
                    });
                }
            }
            state.addressList = tempList;
        }
    },
    //   strict: debug,
});

export default store;