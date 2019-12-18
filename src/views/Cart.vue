<template>
  <div>
    <div style="background-color: orange">
      <van-nav-bar title="购物车" />
      <van-list style="padding-bottom:30%;">
        <van-list class="order-css" v-for="item in list" :key="item.userid">
          <div class="shop">
            <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div style="width:70%">
              <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">超级加倍卢本伟！</div>
            </div>
          </div>
          <van-card
            class="card"
            v-for="good in item.goods"
            :key="good.id"
            :num="good.num"
            :price="good.price"
            :desc="good.desc"
            :title="good.title"
            :thumb="good.thumb"
          >
            <van-checkbox v-model="good.add" slot="footer" style="position: relative; left: 95%;"></van-checkbox>
          </van-card>
        </van-list>
      </van-list>
    </div>
    <div>
      <div
        style="height: 40px; width: 100%; position: fixed; bottom: 50px; background-color: white;"
      >
        <div style="display: flex; flex-direction: row; margin-left: 42%;">
          <div style="height: 30px; line-height: 35px; margin-top: 5px; font-size: 18px">
            合计：
            <strong style="font-size: 14px; color: red">￥{{total.toFixed(2)}}</strong>
          </div>
          <van-button
            round
            color="orange"
            style="margin-left: 4%; height: 30px; line-height: 30px; margin-top: 5px;"
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
      checked: true,
      active_tag: 1,
      list: [
        {
          userid: 1,
          goods: [
            {
              id: 23,
              num: "1",
              price: "5.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg",
              add: false
            },
            {
              id: 3,
              num: "1",
              price: "15.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg",
              add: false
            }
          ]
        },
        {
          userid: 55,
          goods: [
            {
              id: 83,
              num: "1",
              price: "2.00",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg",
              add: false
            }
          ]
        },
        {
          userid: 11,
          goods: [
            {
              id: 203,
              num: "1",
              price: "50.01",
              desc: "穿了10年的纪念版",
              title: "狗哥的皮大衣",
              thumb: "https://img.yzcdn.cn/vant/t-thirt.jpg",
              add: false
            }
          ]
        }
      ]
    };
  },
  computed: {
    total() {
      var total = 0;
      this.list.forEach(order => {
        order.goods.forEach(good => {
          if (good.add) {
            total += Number(good.price);
          }
        })
      })
      return total;
    },
    
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