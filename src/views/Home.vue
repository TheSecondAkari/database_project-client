<template>
  <div style="background: ghostwhite">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <div style="position: relative">
        <van-tabs v-model="active" swipeable @change="onChange">
          <van-tab v-for="(item, index) in type" :title="item" :key="index"></van-tab>
        </van-tabs>
        <div class="more">
          <van-icon name="ellipsis" size="25px" @click="more" />
        </div>
      </div>
      <van-popup v-model="show" position="left" style>
        <van-sidebar v-model="active" @change="onChange">
          <van-sidebar-item v-for="(item, index) in type" :title="item" :key="index" />
        </van-sidebar>
      </van-popup>
      <div class="image-swiper">
        <van-swipe
          :autoplay="3000"
          indicator-color="white"
          style="border-radius: 15px; overflow: hidden;"
        >
          <van-swipe-item class="image" v-for="item in list" :key="item">{{item}}</van-swipe-item>
        </van-swipe>
      </div>
      <waterfall :imgsArr="menuList" v-if="menuList.length > 0" />
      <van-tabbar v-model="active_tag" style="position: fixed; bottom: 0px;">
        <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/myinfo">我的</van-tabbar-item>
      </van-tabbar>
    </van-pull-refresh>
  </div>
</template>

<script>
import waterfall from "./Waterfall";

export default {
  data() {
    return {
      value: "",
      show: false,
      isLoading: false,
      active: 0,
      active_tag: 0,
      list: [1, 2, 3, 4],
      menuList: [],
      type: [
        "全部",
        "生活百货",
        "游戏装备",
        "户外运动",
        "家用电器",
        "车品",
        "家具/饰品",
        "手机数码",
        "女装",
        "美妆",
        "儿童玩具",
        "宠物用品",
        "园艺/农用",
        "服饰配件",
        "男装",
        "箱包",
        "乐器",
        "健身器材",
        "母婴用品",
        "生鲜水果",
        "童装童鞋"
      ]
    };
  },
  mounted: function() {
    this.getGood();
  },
  methods: {
    async onRefresh() {
        this.isLoading = true;
        this.menuList=[];
        let data = await this.api.get("/goods/index",{
            category_id:this.active
        });
        this.menuList = data.data;
        this.isLoading = false;
        this.$toast('刷新成功');
    },
    async getGood() {
      var list = this.$store.getters.MainMeau;
      console.log(list);
      if (list.length == 0) {
        let data = await this.api.get("/goods/index");
        this.menuList = data.data;
        this.$store.commit("setMainMeau", data.data);
      } else {
        this.menuList = list;
      }
    },
    onSearch: function() {
      this.$router.push({
        path: "/search",
        query: {
          s: this.value
        }
      });
    },
    more() {
      this.show = true;
    },
    async onChange(index) {
      this.menuList = [];
      let data = await this.api.get("/goods/index", {
        category_id: index
      });
      this.menuList = data.data;
    }
  },
  components: {
    waterfall
  }
};
</script>

<style>
.image-swiper {
  margin-top: 15px;
  height: 150px;
  padding: 0% 3%;
}
.image {
  text-align: center;
  line-height: 150px;
  background: blanchedalmond;
}
.more {
  position: absolute;
  right: 0px;
  top: 25%;
  background: white;
}
</style>