<template>
  <div class="myinfo">
    <!-- 第一栏：用户头像，昵称，修改按钮:跳转修改昵称或者密码 -->
    <div class="header">
      <van-row type="flex">
        <van-col span="5" style="margin-left:8px;">
          <van-image round width="4rem" height="4rem" src="../assets/hime.jpg" />
        </van-col>
        <van-col span="9">
          <van-icon
            name="edit"
            size="1.5em"
            color="gray"
            @click="goto_editMess()"
            style="float:right;margin-top:18.72px"
          />
          <h3>{{username}}</h3>
        </van-col>
      </van-row>
    </div>

    <!-- 用户的订单情况，购买的商品状态 -->
    <div class="orders">
      <van-row type="flex" justify="space-between">
        <van-col span="8">我的订单</van-col>
        <van-col span="8" style="color:gray;margin-right:10px;">查看全部订单></van-col>
      </van-row>
      <van-grid class="order-icon-color" :column-num="3">
        <van-grid-item icon="send-gift-o" text="代发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="comment-o" text="评价" />
      </van-grid>
    </div>

    <!-- 用户自己上传发布的商品 -->
    <div class="goods">
      <van-row type="flex" justify="space-between">
        <van-col span="8">我的商品</van-col>
      </van-row>
      <van-cell class="goods-icon-color" value="我发布的" icon="goods-collect-o" size="large" is-link />
      <van-cell class="goods-icon-color" value="我卖出的" icon="after-sale" size="large" is-link />
    </div>
    <van-cell
      class="address-icon-color"
      value="地址管理"
      icon="records"
      size="large"
      is-link
      to="/addressList"
    />
    <br />

    <!-- 根据是否登陆，显示登陆按钮或者登出按钮 -->
    <van-button
      v-if="judge"
      type="danger"
      round
      style="width:90%;margin:5px"
      @click="()=>{this.judge = false}"
    >退出当前账号</van-button>
    <van-button
      v-else
      type="info"
      round
      style="width:90%;margin:5px"
      @click="()=>{this.$router.push('/login')}"
    >登陆</van-button>
    <van-tabbar v-model="active_tag" style="position: fixed; bottom: 0px;">
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/myinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Myinfo",
  data() {
    return {
      judge: true
    };
  },
  mounted() {},
  computed: {
    username() {
      return this.$store.getters.UserName;
    }
  },
  methods: {}
};
</script>

<style scoped>
.order-icon-color {
  color: orange;
}
.goods-icon-color {
  color: greenyellow;
}
.address-icon-color {
  color: #186be7;
}
.header {
  margin-top: 13px;
}
.orders {
  margin: 12px;
  font-weight: bold;
  margin-top: 20px;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  padding-bottom: 12px;
}
.goods {
  margin: 12px;
  margin-top: 20px;
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  padding-bottom: 10px;
}
</style>
