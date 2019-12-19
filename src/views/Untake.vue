<template>
  <div class="notSentOrders">
    <van-nav-bar
      title="待收货订单"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
    />
    <van-list style="padding-bottom:5px;">
      <van-list class="order-css" v-for="item in list" :key="item.id">
        <div class="shop">
          <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div style="width:70%">
            <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.vendor.name}}</div>
            <!-- <div class="info">我卢本伟真TM没开挂！不信你们可以随便石锤我</div> -->
          </div>
        </div>
        <van-card
          class="card"
          v-for="good in item.goods"
          :key="good.id"
          :num="good.num"
          :price="good.price"
          :desc="good.desc"
          :title="good.name"
          :thumb="good.img"
        />
        <van-cell :value="item.address.phone">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <van-tag round size="medium" type="primary">收</van-tag>
            <span style="margin-left:4%">{{item.address.name}}</span>
          </template>
          <template slot="label">
            <span>{{item.address.desc}}</span>
          </template>
        </van-cell>
        <div style="color:gray;font-size:11px;margin-left:4%">
          <p>下单时间：{{item.created_at}}</p>
          <p>订单号：{{item.order_number}}</p>
        </div>
        <van-button plain size="small" type="info" round style="margin:0px 2.5% 2.5% 75%;" @click="Confirm(item)">确认收货</van-button>
      </van-list>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "notSent",
  data() {
    return {
      loading: false,
      finished: false,
    };
  },
  computed: {
    list() {
      return this.$store.getters.UnTake;
    }
  },
  methods: {
      async Confirm(item){
          let data = await this.api.post('/order/'+item.id+'/receipt');
          if (data.status >= 200 && data.status < 300) {
                this.$notify({
                  type: "success",
                  message: data.data.errmsg
                });
                this.$store.commit("getUnTake");
                this.$store.commit("getTaken");
              }
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notSentOrders {
  background-color: rgb(252, 196, 76);
  /* min-height: 670px; */
}
.card {
  text-align: left;
}
.order-css {
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 189, 125);
  border-radius: 10px;
  margin: 5px;
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
