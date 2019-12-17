<template>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs v-model="active_type" swipeable>
      <van-tab v-for="index in 6" :title="'选项 ' + index" :key="index"></van-tab>
    </van-tabs>
    <div class="test-swiper">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
        style="border-radius: 15px; overflow: hidden;"
      >
        <van-swipe-item class="test" v-for="item in list" :key="item">{{item}}</van-swipe-item>
      </van-swipe>
    </div>
    <waterfall :imgsArr="mainMenuList"/>
    <van-tabbar v-model="active_tag" style="position: fixed; bottom: 0px;">
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/myinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import waterfall from './Waterfall'

export default {
  data() {
    return {
      value: "",
      active_type: 0,
      active_tag: 0,
      list: [1, 2, 3, 4],
      mainMenuList: [
        {
          id: 1,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 2,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 3,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 4,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 5,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 6,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 7,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 8,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 9,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 10,
          name: "一只猫",
          price: 35,
          view: 100,
        },
        {
          id: 11,
          name: "一只猫",
          price: 35,
          view: 100,
        },
      ],
    };
  },
  methods: {
    onSearch: function() {
      this.$notify(this.value + "!!!!!!!!!");
      this.value = "";
    },
    mountMenu(arg) {
      var temp = this.mainMenuList;
      var index = arg || 0;
      var refName = this.selectCol();
      if (temp.length > index) {
        this[refName].push(this.mainMenuList[index]);
        this.$nextTick(() => {
          this.mountMenu(index + 1);
        });
      }
    },
    selectCol() {
      var getHeight = ref => {
        return this.$refs[ref].offsetHeight;
      };
      var height1 = getHeight("col1");
      var height2 = getHeight("col2");
      switch (Math.min(height1, height2)) {
        case height1:
          return "dataList1";
        case height2:
          return "dataList2";
      }
    }
  },
  components: {
    waterfall
  }
};
</script>

<style>
.test-swiper {
  margin-top: 15px;
  height: 150px;
  padding: 0% 3%;
}
.test {
  text-align: center;
  line-height: 150px;
  background: blanchedalmond;
}
</style>