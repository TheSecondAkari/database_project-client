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
    goods_id() {
      var goods_id = [];
      console.log(this.goods);
      this.goods.forEach(v => {
        goods_id.push(v.id);
      });
      return goods_id;
    },
    price() {
      var price = 0;
      this.$store.state.cartList.forEach(v => {
        v.goods.forEach(good => {
          if (good.add) {
            price += good.price * 100;
          }
        });
      });
      return price;
    }
  },
  mounted() {
    var type = this.$route.query.index;
    console.log(JSON.parse(this.$route.query.goods))
    switch (type) {
      case 0:
        this.list = this.$store.state.cartList;
        this.goods = this.$route.query.goods;
        break;
      case 1:
        this.index = this.$route.query.index;
        break;
      case 2:
        this.goods = JSON.parse(this.$route.query.goods);
        break;
    }
  },
  methods: {
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
      console.log("!!!!!!!");
      var address_id = this.address.id;
      var goods_id = this.goods_id;
      let data = await this.api.post("/orders", {
        address_id: address_id,
        goods_id: goods_id
      });
      console.log(data);
      this.$toast(data.data.errmsg);
      this.$store.commit("getNotSent");
      this.$router.push("/");
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