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
        cartList: [],
        mainMeau: [],

        myselling: [],
        myselling_has_next: false,
        myselling_next_num: null,

        mysold: [],
        mysold_has_next: false,
        mysold_next_num: null,

        notsent: [],
        notsent_has_next: false,
        notsent_next_num: null,

        untake: [],
        untake_has_next: false,
        untake_next_num: null,

        taken: [],
        taken_has_next: false,
        taken_next_num: null,

        myGoodsLoading: false,
        mysoldLoading: false,
        notsentLoading: false,
        untakeLoading: false,
        takenLoading: false,

    },
    getters: {
        UserName: state => {
            return state.user.name;
        },
        AddressList: state => {
            return state.addressList;
        },
        MainMeau: state => {
            return state.mainMeau;
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
        NotSent: state => {
            return state.notsent;
        },
        UnTake: state => {
            return state.untake;
        },
        Taken: state => {
            return state.taken;
        },
        MyGoodsLoading: state => {
            return state.myGoodsLoading;
        },
        NotSentLoading: state => {
            return state.notsentLoading;
        },
        UnTakeLoading: state => {
            return state.untakeLoading;
        },
        TakensLoading: state => {
            return state.takenLoading;
        },
        MySoldLoading: state => {
            return state.mysoldLoading;
        },

    },
    mutations: {
        setCartAdd(state, data) {
            data = data.split('-')
            console.log(data);
            state.cartList.forEach(v => {
                if (v.name == data[0]) {
                    let temp = v.goods[parseInt(data[1])];
                    temp.add = !temp.add;
                    v.goods[parseInt(data[1])] = temp;
                    console.log(v.goods[parseInt(data[1])].add);
                }
            });
            console.log("购物车");
            state.cartList = state.cartList.slice(0);
        },
        replaceCart(state, data) {
            state.cartList = data;
        },
        setMainMeau(state, data) {
            state.mainMeau = data;
        },
        logout(state) { //登出按钮触发，还需继续补全，登出后，所有的状态都要初始化，购物车，自己的商品，订单等等
            state.user = {
                id: 0,
                name: "未登录",
                username: ""
            };
            state.addressList = [];
            state.category = [];
            state.myselling = [];
            state.mysold = [];
            state.cartList = [];
            state.notsent = [];
            state.untake = [];
            state.taken = [];

            state.myselling_has_next = false;
            state.myselling_next_num = null;
            state.notsent_has_next = false;
            state.notsent_next_num = null;
            state.untake_has_next = false;
            state.untake_next_num = null;
            state.taken_has_next = false;
            state.taken_next_num = null;

            state.myGoodsLoading = false;
            state.notsentLoading = false;
            state.untakeLoading = false;
            state.takenLoading = false;
        },
        addCart(state, good) {
            var list = {};
            if (state.cartList.length == 0) {
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
                }
            }
        },
        cleanCartAdd(state) {
            for (var i = 0; i < state.cartList.length; i++) {
                for (var j = 0; j < state.cartList[i].goods.length; j++) {
                    if (state.cartList[i].goods[j].add == true) {
                        state.cartList[i].goods.splice(j, 1);
                        j--;
                    }
                }
                if(state.cartList[i].goods.length == 0){
                    state.cartList.splice(i,1);
                    i--;
                }
            }
        },
        setCartList(state, list) {
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
        },
        async getMoreMySelling(state) {
            if (state.myselling_has_next == true) {
                let data = await api.get("/my_goods", {
                    page: state.myselling_next_num
                });
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
                    state.myselling = state.myselling.concat(tempList);
                }
            }
            state.myGoodsLoading = false;
        },
        async getMySold(state) {
            let data = await api.get("/sold/orders");
            if (data.status >= 200 && data.status < 300) {
                state.mysold_has_next = data.data.has_next;
                state.mysold_next_num = data.data.next_num;
                data = data.data.items;
                var tempList = [];
                for (var i = 0; i < data.length; i++) {
                    var itemList = [];
                    for (var j = 0; j < data[i].item.length; j++) {

                        itemList.push({
                            goodId: data[i].item[j].id,
                            goodName: data[i].item[j].goods.name,
                            price: data[i].item[j].goods.price,
                            detail: data[i].item[j].goods.detail,
                            img: data[i].item[j].goods.img,
                            category: data[i].item[j].goods.category,

                        });

                    }
                    tempList.push({
                        orderId: data[i].id,
                        status: data[i].state,
                        receive: data[i].address,
                        goodsList:itemList,
                        comment:data[i].comment,
                        date:data[i].created_at,
                        userName:data[i].user.name,
                    })

                }

                state.mysold = tempList;

            }
        },
        async getMoreMySold(state) {
            if (state.mysold_has_next == true) {
                let data = await api.get("/sold/orders", {
                    page: state.mysold_next_num
                });
                if (data.status >= 200 && data.status < 300) {
                    state.mysold_has_next = data.data.has_next;
                    state.mysold_next_num = data.data.next_num;
                    data = data.data.items;
                    var tempList = [];
                    for (var i = 0; i < data.length; i++) {
                        var itemList = [];
                        for (var j = 0; j < data[i].item.length; j++) {
                            itemList.push({
                                goodId: data[i].item[j].id,
                                goodName: data[i].item[j].goods.name,
                                price: data[i].item[j].goods.price,
                                detail: data[i].item[j].goods.detail,
                                img: data[i].item[j].goods.img,
                                category: data[i].item[j].goods.category,
                            });
                        }
                        tempList.push({
                            orderId: data[i].id,
                            status: data[i].state,
                            receive: data[i].address,
                            goodsList: itemList
                        })
                    }
                    state.mysold = state.mysold.concat(tempList);
                }
            }
            state.mysoldLoading = false;
        },
        async getNotSent(state) {
            let data = await api.get("/purchases", {
                state: 1
            });
            if (data.status >= 200 && data.status < 300) {
                state.notsent_has_next = data.data.has_next;
                state.notsent_next_num = data.data.next_num;
                data = data.data.items;
                var tempList = [];
                var tempListpart = []
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].item.length; j++) {
                        tempListpart.push({
                            id: data[i].item[j].goods.id,
                            num: "1",
                            price: data[i].item[j].goods.price,
                            category: data[i].item[j].goods.category,
                            desc: data[i].item[j].goods.detail,
                            name: data[i].item[j].goods.name,
                            img: data[i].item[j].goods.img,
                            imgs: data[i].item[j].goods.imgs,
                            sale: data[i].item[j].goods.sale
                        });
                    }
                    if (data[i].address.city == data[i].address.province)
                        data[i].address.desc = (data[i].address.city + data[i].address.county + data[i].address.detail);
                    else
                        data[i].address.desc = (data[i].address.province + data[i].address.city + data[i].address.county + data[i].address.detail);
                    tempList.push({
                        id: data[i].id,
                        created_at: data[i].created_at,
                        order_number: data[i].order_number,
                        address: data[i].address,
                        vendor: data[i].item[0].goods.vendor,
                        goods: tempListpart
                    });
                    tempListpart = [];
                }
                state.notsent = tempList;
            }
        },
        async getMoreNotSent(state) {
            if (state.notsent_has_next == true) {
                let data = await api.get("/purchases", {
                    state: 1,
                    page: state.notsent_next_num
                });
                if (data.status >= 200 && data.status < 300) {
                    state.notsent_has_next = data.data.has_next;
                    state.notsent_next_num = data.data.next_num;
                    data = data.data.items;
                    var tempList = [];
                    var tempListpart = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].item.length; j++) {
                            tempListpart.push({
                                id: data[i].item[j].goods.id,
                                num: "1",
                                price: data[i].item[j].goods.price,
                                category: data[i].item[j].goods.category,
                                desc: data[i].item[j].goods.detail,
                                name: data[i].item[j].goods.name,
                                img: data[i].item[j].goods.img,
                                imgs: data[i].item[j].goods.imgs,
                                sale: data[i].item[j].goods.sale
                            });
                        }
                        if (data[i].address.city == data[i].address.province)
                            data[i].address.desc = (data[i].address.city + data[i].address.county + data[i].address.detail);
                        else
                            data[i].address.desc = (data[i].address.province + data[i].address.city + data[i].address.county + data[i].address.detail);
                        tempList.push({
                            id: data[i].id,
                            created_at: data[i].created_at,
                            order_number: data[i].order_number,
                            address: data[i].address,
                            vendor: data[i].item[0].goods.vendor,
                            goods: tempListpart
                        });
                        tempListpart = [];
                    }
                    state.notsent = state.notsent.concat(tempList);
                }

            }
            state.notsentLoading = false;
        },
        async getUnTake(state) {
            let data = await api.get("/purchases", {
                state: 2
            });
            if (data.status >= 200 && data.status < 300) {
                state.untake_has_next = data.data.has_next;
                state.untake_next_num = data.data.next_num;
                data = data.data.items;
                var tempList = [];
                var tempListpart = []
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].item.length; j++) {
                        tempListpart.push({
                            id: data[i].item[j].goods.id,
                            num: "1",
                            price: data[i].item[j].goods.price,
                            category: data[i].item[j].goods.category,
                            desc: data[i].item[j].goods.detail,
                            name: data[i].item[j].goods.name,
                            img: data[i].item[j].goods.img,
                            imgs: data[i].item[j].goods.imgs,
                            sale: data[i].item[j].goods.sale
                        });
                    }
                    if (data[i].address.city == data[i].address.province)
                        data[i].address.desc = (data[i].address.city + data[i].address.county + data[i].address.detail);
                    else
                        data[i].address.desc = (data[i].address.province + data[i].address.city + data[i].address.county + data[i].address.detail);
                    tempList.push({
                        id: data[i].id,
                        created_at: data[i].created_at,
                        order_number: data[i].order_number,
                        address: data[i].address,
                        vendor: data[i].item[0].goods.vendor,
                        goods: tempListpart
                    });
                    tempListpart = [];
                }
                state.untake = tempList;
            }
        },
        async getMoreUnTake(state) {
            if (state.untake_has_next == true) {
                let data = await api.get("/purchases", {
                    state: 2,
                    page: state.untake_next_num
                });
                if (data.status >= 200 && data.status < 300) {
                    state.untake_has_next = data.data.has_next;
                    state.untake_next_num = data.data.next_num;
                    data = data.data.items;
                    var tempList = [];
                    var tempListpart = []
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].item.length; j++) {
                            tempListpart.push({
                                id: data[i].item[j].goods.id,
                                num: "1",
                                price: data[i].item[j].goods.price,
                                category: data[i].item[j].goods.category,
                                desc: data[i].item[j].goods.detail,
                                name: data[i].item[j].goods.name,
                                img: data[i].item[j].goods.img,
                                imgs: data[i].item[j].goods.imgs,
                                sale: data[i].item[j].goods.sale
                            });
                        }
                        if (data[i].address.city == data[i].address.province)
                            data[i].address.desc = (data[i].address.city + data[i].address.county + data[i].address.detail);
                        else
                            data[i].address.desc = (data[i].address.province + data[i].address.city + data[i].address.county + data[i].address.detail);
                        tempList.push({
                            id: data[i].id,
                            created_at: data[i].created_at,
                            order_number: data[i].order_number,
                            address: data[i].address,
                            vendor: data[i].item[0].goods.vendor,
                            goods: tempListpart
                        });
                        tempListpart = [];
                    }
                    state.untake = state.untake.concat(tempList);
                }

            }
            state.untakeLoading = false;
        },
        async getTaken(state) {
            let data = await api.get("/purchases", {
                state: 3
            });
            if (data.status >= 200 && data.status < 300) {
                state.taken_has_next = data.data.has_next;
                state.taken_next_num = data.data.next_num;
                data = data.data.items;
                var tempList = [];
                var tempListpart = []
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].item.length; j++) {
                        tempListpart.push({
                            id: data[i].item[j].goods.id,
                            num: "1",
                            price: data[i].item[j].goods.price,
                            category: data[i].item[j].goods.category,
                            desc: data[i].item[j].goods.detail,
                            name: data[i].item[j].goods.name,
                            img: data[i].item[j].goods.img,
                            imgs: data[i].item[j].goods.imgs,
                            sale: data[i].item[j].goods.sale
                        });
                    }
                    if (data[i].address.city == data[i].address.province)
                        data[i].address.desc = (data[i].address.city + data[i].address.county + data[i].address.detail);
                    else
                        data[i].address.desc = (data[i].address.province + data[i].address.city + data[i].address.county + data[i].address.detail);
                    tempList.push({
                        id: data[i].id,
                        created_at: data[i].created_at,
                        order_number: data[i].order_number,
                        comment: data[i].comment,
                        address: data[i].address,
                        vendor: data[i].item[0].goods.vendor,
                        goods: tempListpart
                    });
                    tempListpart = [];
                }
                state.taken = tempList;
            }
        },
        async getMoreTaken(state) {
            if (state.taken_has_next == true) {
                let data = await api.get("/purchases", {
                    state: 3,
                    page: state.taken_next_num
                });
                if (data.status >= 200 && data.status < 300) {
                    state.taken_has_next = data.data.has_next;
                    state.taken_next_num = data.data.next_num;
                    data = data.data.items;
                    var tempList = [];
                    var tempListpart = []
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < data[i].item.length; j++) {
                            tempListpart.push({
                                id: data[i].item[j].goods.id,
                                num: "1",
                                price: data[i].item[j].goods.price,
                                category: data[i].item[j].goods.category,
                                desc: data[i].item[j].goods.detail,
                                name: data[i].item[j].goods.name,
                                img: data[i].item[j].goods.img,
                                imgs: data[i].item[j].goods.imgs,
                                sale: data[i].item[j].goods.sale
                            });
                        }
                        if (data[i].address.city == data[i].address.province)
                            data[i].address.desc = (data[i].address.city + data[i].address.county + data[i].address.detail);
                        else
                            data[i].address.desc = (data[i].address.province + data[i].address.city + data[i].address.county + data[i].address.detail);
                        tempList.push({
                            id: data[i].id,
                            created_at: data[i].created_at,
                            order_number: data[i].order_number,
                            comment: data[i].comment,
                            address: data[i].address,
                            vendor: data[i].item[0].goods.vendor,
                            goods: tempListpart
                        });
                        tempListpart = [];
                    }
                    state.taken = state.taken.concat(tempList);
                }

            }
            state.takenLoading = false;
        },
        closeMyGoodsLoading(state, val) {
            state.myGoodsLoading = val;
        },
        closeMySoldLoading(state, val) {
            state.mysoldLoading = val;
        },
        closeNotSentLoading(state, val) {
            state.notsentLoading = val;
        },
        closeUnTakeLoading(state, val) {
            state.untakeLoading = val;
        },
        closeTakenLoading(state, val) {
            state.takenLoading = val;
        },

    },
    //   strict: debug,
});

export default store;