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
        category: [],
        myselling: [],
        myselling_has_next: false,
        myselling_next_num: null,
        mysold: [],
        cartList: [],
    },
    getters: {
        UserName: state => {
            return state.user.name;
        },
        AddressList: state => {
            return state.addressList;
        },
        MySelling: state => {
            return state.myselling;
        },
        MySold: state => {
            return state.mysold;
        },
        Category: state => {
            return state.category;
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
            state.myselling = [];
            state.mysold = [];
        },
        addCart(state, good) {
            var list = [];
            console.log(state.cartList)
            if (state.cartList.length == 0) {
                console.log(state.cartList)
                list["name"] = good.vendor.name;
                list["goods"] = [];
                good["add"] = false;
                list["goods"].push(good);
                state.cartList.push(list);
                return;
            } else {
                var mask = 1
                state.cartList.forEach(v => {
                    if (v.name == good.vendor.name) {
                        mask = 0;
                        var shit = 1;
                        v.goods.forEach(item => {
                            if (item.id == good.id) {
                                shit = 0;
                            }
                        })
                        if (shit) {
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
                    console.log(state.cartList)
                }
            }
        },
        cleanCartList(state) {
            state.cartList.length = 0;
        },
        setCartList(state, list){
            state.cartList = list
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
                state.addressList = tempList;
            }
        },
        async getCategory(state) {
            let data = await api.get("/categories");
            if (data.status >= 200 && data.status < 300) {
                data = data.data;
                var tempList = [];
                for (var i = 0; i < data.length; i++)
                    tempList.push(
                        data[i].name
                    );
                state.category = tempList;
            }
        },
        async getMySelling(state) {
            let data = await api.get("/my_goods");
            if (data.status >= 200 && data.status < 300) {
                state.myselling_has_next = data.data.has_next;
                state.myselling_next_num = data.data.next_num;
                data = data.data.items;
                var tempList = [];
                for (var i = 0; i < data.length; i++)
                    tempList.push({
                        id: data[i].id,
                        name: data[i].name,
                        price: data[i].price,
                        created_at: data[i].created_at,
                        detail: data[i].detail,
                        img: data[i].img,
                        imgs: data[i].imgs,
                        category: data[i].category
                    });
                state.myselling = tempList;
            }
        }
    },
    //   strict: debug,
});

export default store;