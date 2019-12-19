<template>
  <div>
    <div style="background-color: orange">
      <van-nav-bar title="购物车" />
      <van-list style="padding-bottom:30%;">
        <van-list class="order-css" v-for="item in list" :key="item.name">
          <div class="shop">
            <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div style="width:70%">
              <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.name}}</div>
            </div>
          </div>
          <van-card
            class="card"
            v-for="good in item.goods"
            :key="good.id"
            :num="1"
            :price="good.price"
            :desc="good.detail"
            :title="good.name"
            :thumb="good.img"
          >
            <van-checkbox
              v-model="good.add"
              slot="footer"
              style="position: relative; left: 95%;"
              @click="refresh"
            ></van-checkbox>
          </van-card>
        </van-list>
      </van-list>
    </div>
    <div>
      <div class="footer">
        <div style="display: flex; flex-direction: row; margin-left: 42%;">
          <div style="height: 30px; line-height: 35px; margin-top: 5px; font-size: 18px">
            合计：
            <strong style="font-size: 14px; color: red">￥{{total.toFixed(2)}}</strong>
          </div>
          <van-button
            round
            color="orange"
            style="margin-left: 4%; height: 30px; line-height: 30px; margin-top: 5px;"
            @click="submit"
          >结算</van-button>
        </div>
      </div>
      <van-tabbar v-model="active_tag" style="position: fixed; bottom: 0px;">
        <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/myinfo">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active_tag: 1,
      list: []
    };
  },
  mounted() {
    this.list = this.$store.getters.CartList;
  },
  computed: {
    total() {
      var total = 0;
      this.list.forEach(v => {
        v.goods.forEach(good => {
          if (good.add) {
            total += Number(good.price);
          }
        });
      });
      return total;
    }
  },
  methods: {
    refresh() {
      this.list.splice(0, 0);
    },
    submit() {
      var item = [];
      this.list.forEach(v => {
        v.goods.forEach(good => {
          if(good.add){
            item.push(good)
          }
        })
      })
      this.$router.push({
        path: "/order",
        query: {
          type: 0,
          goods: item,
        }
      })
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
.footer {
  height: 40px;
  width: 100%;
  position: fixed;
  bottom: 50px;
  background-color: white;
}
</style>