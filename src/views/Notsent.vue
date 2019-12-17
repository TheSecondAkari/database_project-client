<template>
  <div class="notSentOrders">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-list v-for="item in list" :key="item.orderid">
        <p>{{item.orderid}}</p>
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
.card {
  text-align: left;
}
</style>
