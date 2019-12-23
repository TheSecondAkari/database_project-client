<template>
  <div class="notSentOrders">
    <van-nav-bar
      title="待发货订单"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
    />
    <van-list
      style="padding-bottom:5px;"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
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
          <!-- 订单号后台没返回 -->
          <p>订单号：{{item.order_number}}</p>
        </div>
      </van-list>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "notSent",
  data() {
    return {
      finished: false
    };
  },
  computed: {
    list() {
      return this.$store.getters.NotSent;
    },
    loading: {
      get() {
        return this.$store.getters.NotSentLoading;
      },
      set(value) {
        this.$store.commit("closeNotSentLoading", value);
      }
    }
  },
  methods: {
      onLoad() {
      this.$store.commit("getMoreNotSent");
      if (this.$store.state.notsent_has_next == false) this.finished = true;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notSentOrders {
  background-color: ghostwhite;
  /* min-height: 670px; */
}
.card {
  text-align: left;
}
.order-css {
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: ghostwhite;
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