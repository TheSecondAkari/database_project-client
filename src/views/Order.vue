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
      </van-list>
    </van-list>
    <div>
      <van-submit-bar :price="3500" button-text="提交订单" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: undefined,
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
  computed: {
    address() {
      if (this.index == undefined) {
        return this.$store.getters.AddressList[0];
      } else {
        return this.$store.getters.AddressList[this.index];
      }
    }
  },
  mounted() {
    this.index = this.$route.query.index;
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    changeAddress() {
      this.$router.push({
        path: "/addressList",
        query: {
          change: true
        }
      });
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
  margin:5px 2.5%;
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