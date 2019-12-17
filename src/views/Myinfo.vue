<template>
  <div class="myinfo">
    <div class="header">
      <van-row type="flex">
        <van-col span="5" style="margin-left:8px;">
          <van-image round width="4rem" height="4rem" src="../assets/hime.jpg" />
        </van-col>
        <van-col span="8" v-if="modify">
          <div>
            <van-icon
              name="edit"
              size="1.5em"
              color="blue"
              style="float:right;"
              v-on:click="edit"
            />
            <h3>{{name}}</h3>
          </div>
        </van-col>
        <van-col span="15" v-else>
          <div style="75px;">
            <van-field v-model="name" center clearable>
              <van-button slot="button" size="small" @click="modifyName">确认</van-button>
            </van-field>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="orders">
      <van-row type="flex" justify="space-between">
        <van-col span="8">我的订单</van-col>
        <van-col span="8" style="color:gray">查看全部订单></van-col>
      </van-row>
      <van-grid :column-num="3">
        <van-grid-item icon="send-gift-o" text="代发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="comment-o" text="评价" />
      </van-grid>
    </div>
    <div class="goods">
      <van-row type="flex" justify="space-between">
        <van-col span="8">我的商品</van-col>
      </van-row>
      <van-cell value="我发布的" icon="goods-collect-o" size="large" is-link />
      <van-cell value="我卖出的" icon="after-sale" size="large" is-link />
    </div>
    <van-cell value="地址管理" icon="records" size="large" is-link to="/addressList" />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="修改密码" name="1">
        <van-field type="password" label="原始密码" placeholder="请输入原始密码" error-message="原始密码错误" />
        <van-field type="password" label="新密码" placeholder="请输入新密码" />
        <van-field type="password" label="确认密码" placeholder="请输入手机号" error-message="两次密码不同" />
      </van-collapse-item>
    </van-collapse>
    <br />
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
      modify: true,
      active_tag: 2,
      judge: true,
      name: "小明传器",
      activeNames: ["1"]
    };
  },
  mounted: {},
  methods: {
    edit: function() {
      this.modify = false;
    },
    async modifyName(){
      var that = this
      let data = await this.api.put('/user', {
        name: that.name
      })
      console.log(data)
      // this.$store.getter
      this.modify = true
    }
  }
};
</script>

<style scoped>
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
