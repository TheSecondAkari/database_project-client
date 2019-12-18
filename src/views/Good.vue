<template>
  <div>
    <div style="margin-bottom: 18%;">
      <div>
        <van-swipe @change="onChange" :autoplay="3000" indicator-color="white">
          <van-swipe-item class="photo" v-for="item in list" :key="item">{{item}}</van-swipe-item>

          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
          <div class="custom-back" slot="indicator" v-on:click="back">
            <van-icon name="arrow-left" size="20px" style="margin:5px 0 5px 2.5px;" />
          </div>
        </van-swipe>
      </div>
      <div style="margin:5% 0% 5% 2.5%; font-size: 22px;">￥300</div>
      <van-tag mark style="margin:0 0 2.5% 2.5%">商品</van-tag>
      <div class="text" style="font-weight: 800; font-size: 18px;">任天堂 Switch游戏 NS 塞尔达传说： 荒野之息标准版 中文 现货</div>
      <div class="br"></div>
      <van-tag mark style="margin:0 0 2.5% 2.5%">卖家</van-tag>
      <div class="user">
        <van-image round width="60px" height="60px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div style="width:70%">
          <div style="margin-left: 5%; font-weight: 700">超级加倍卢本伟！</div>
          <div class="info">我卢本伟真TM没开挂！不信你们可以随便石锤我</div>
        </div>
      </div>
      <div class="br"></div>
      <van-tag mark style="margin:0 0 2.5% 2.5%">简介</van-tag>
      <div class="text">这是一堆简介，鬼知道有多少字，反正就是这样的啊，不服你他妈来打死我，求你了，你就对着我的脸，一巴掌下去，打死我！</div>
    </div>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="goToOrder" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      list: [1, 2, 3, 4]
    };
  },
  methods: {
    onClickIcon: function() {
      this.$toast("点击图标");
    },

    onClickButton: function() {
      this.$toast("点击按钮");
    },

    goToOrder: function(){
      this.$router.push('/order')
    },

    onChange(index) {
      this.current = index;
    },

    back: function() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.photo-swiper {
  height: 300px;
  padding: 0% 3%;
}
.photo {
  text-align: center;
  line-height: 300px;
  background: blanchedalmond;
}
.custom-back {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  color: #fff;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.text {
  width: 95%;
  margin-left: 2.5%;
  word-wrap: break-word;
}
.br {
  margin: 5% 0 2.5% 2.5%;
  height: 1px;
  background: rgba(152, 152, 152, 0.3);
  width: 95%;
}
.user {
  width: 95%;
  margin-left: 2.5%;
  display: flex;
  flex-direction: row;
}
.info{
  margin-top: 2.5%;
  margin-left: 5%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}
</style>