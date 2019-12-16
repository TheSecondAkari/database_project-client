<template>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs v-model="active" swipeable>
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
    <div class="box">
      <div class="col" ref="col1">
        <transition-group name="list">
          <div class="item" v-for="item in dataList1" :key="item.id">{{item.text}}</div>
        </transition-group>
      </div>
      <div class="col" ref="col2">
        <transition-group name="list">
          <div class="item" v-for="item in dataList2" :key="item.id">{{item.text}}</div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      active: 0,
      list: [1, 2, 3, 4],
      mainMenuList: [],
      dataList1: [],
      dataList2: [],
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