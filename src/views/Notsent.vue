<template>
  <div class="notSentOrders">
    <van-nav-bar
      title="待发货订单"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
    />
    <van-list style="padding-bottom:5px;">
      <van-list class="order-css" v-for="item in list" :key="item.orderid">
        <div class="shop">
          <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div style="width:70%">
            <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">超级加倍卢本伟！</div>
            <!-- <div class="info">我卢本伟真TM没开挂！不信你们可以随便石锤我</div> -->
          </div>
        </div>
        <van-card
          class="card"
          v-for="good in item.orders"
          :key="good.id"
          :num="good.num"
          :price="good.price"
          :desc="good.desc"
          :title="good.title"
          :thumb="good.thumb"
        />
        <van-cell :value="item.address_id.phone">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <van-tag round size="medium" type="primary">收</van-tag>
            <span style="margin-left:4%">{{item.address_id.name}}</span>
          </template>
          <template slot="label">
            <span >{{item.address_id.address}}</span>
          </template>
        </van-cell>
        <div style="color:gray;font-size:11px;margin-left:4%">
          <p>下单时间：2019-12-12 12:56:23</p>
          <p>订单号：123456789123456789</p>
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
      loading: false,
      finished: false,
      list: [
        {
          orderid: 1,
          address_id: {
            name: "一号机",
            phone: "12345678955",
            address: "北京市，西街，32号502"
          },
          orders: [
            {
              id: 23,
              num: "1",
              price: "5.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg"
            },
            {
              id: 3,
              num: "1",
              price: "15.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg"
            }
          ]
        },
        {
          orderid: 55,
          address_id: {
            name: "er号机",
            phone: "12345678956",
            address: "上海市，西街，32号502"
          },
          orders: [
            {
              id: 83,
              num: "1",
              price: "2.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg"
            }
          ]
        },
        {
          orderid: 11,
          address_id: {
            name: "嘿机",
            phone: "12345677755",
            address: "北京市，东街，后上大道西周街32号502"
          },
          orders: [
            {
              id: 203,
              num: "1",
              price: "50.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg"
            }
          ]
        }
      ]
    };
  },
  methods: {}
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

/* .info {
  margin-top: 2.5%;
  margin-left: 5%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
} */
</style>
