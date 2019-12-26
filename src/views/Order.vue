<template>
  <div style="background: ghostwhite">
    <van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="Back" />
    <div style="padding: 2.5%;">
      <van-panel title="收货地址" style="border-radius: 15px; overflow: hidden;">
        <van-cell icon="location-o" is-link center @click="changeAddress" style="height:75px;">
          <div style="margin-left: 2.5%;">
            <div>
              <strong style="font-size: 18px;">{{address.name}}</strong>
              {{address.tel}}
            </div>
            <div>{{address.address}}</div>
          </div>
        </van-cell>
      </van-panel>
    </div>
    <van-list style="padding-bottom:18%;">
      <van-list class="order-css" v-for="item in list" :key="item.name">
        <div v-for="good in item.goods" :key="good.id">
          <div class="shop" v-if="good.add">
            <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div style="width:70%">
              <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.name}}</div>
            </div>
          </div>
          <van-card
            class="card"
            :num="1"
            :price="good.price"
            :desc="good.detail"
            :title="good.name"
            :thumb="good.img"
            v-if="good.add"
          />
        </div>
      </van-list>
    </van-list>
    <div>
      <van-submit-bar :price="price" button-text="提交订单" @submit="submit" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: undefined,
      list: [],
      goods: []
    };
  },
  computed: {
    address() {
      if (this.index == undefined) {
        return this.$store.getters.AddressList[0];
      } else {
        return this.$store.getters.AddressList[this.index];
      }
    },
    price() {
      var price = 0;
      this.list.forEach(v => {
        v.goods.forEach(good => {
          if (good.add) {
            price += good.price * 100;
          }
        });
      });
      return price;
    }
  },
  async mounted() {
    await this.Judge();
    var type = this.$route.query.type;
    switch (type) {
      case 0:
        this.list = this.$store.state.cartList;
        this.goods = this.$route.query.goods;
        break;
      case 1:
        this.index = this.$route.query.index;
        break;
      case 2:
        this.list = JSON.parse(this.$route.query.goods);
        this.goods = this.list[0].goods;
        break;
    }
  },
  methods: {
    Judge() {
      var user = this.$store.getters.User;
      if (user.id < 1) {
        this.$notify({
          type: "danger",
          message: "未登录，请先登陆。"
        });
        this.$router.push("/login");
      } else if (this.$store.getters.AddressList.length == 0) {
        this.$notify({
          type: "danger",
          message: "地址为空，请先添加地址。"
        });
        this.$router.push("/addressList");
      }
    },
    Back() {
      this.$router.push("/");
    },
    changeAddress() {
      this.$router.push({
        path: "/addressList",
        query: {
          change: true
        }
      });
    },
    async submit() {
      var data = undefined;
      var list = this.list;
      var address_id = this.address.id;
      for (var i = 0; i < list.length; i++) {
        var goods_id = [];
        this.goods.forEach(good => {
          if (good.vendor.name == list[i].name) {
            goods_id.push(good.id);
          }
        });
        if (goods_id.length != 0) {
          data = await this.api.post("/orders", {
            address_id: address_id,
            goods_id: goods_id
          });
        }
      }
      if (data.status == 200) {
        this.$toast(data.data.errmsg);
        this.$store.commit("getNotSent");
        this.$store.commit("cleanCartAdd");
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.card {
  text-align: left;
}
.order-css {
  overflow: hidden;
  border-radius: 10px;
  margin: 5px 2.5%;
  background-color: white;
}
.shop {
  width: 95%;
  margin-top: 3px;
  margin-left: 2.5%;
  display: flex;
  flex-direction: row;
}
</style>