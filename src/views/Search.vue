<template>
  <div class="search">
    <div class="header">
      <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="()=>{this.$router.push('/')}" />
    </div>
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch()">
      <div slot="action" @click="onSearch()">搜索</div>
    </van-search>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <van-card
          v-for="item in searchList"
          :key="item.id"
          num="1"
          :price="item.price"
          :desc="item.detail"
          :title="item.name"
          :thumb="item.img"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{item.category.name}}</van-tag>
          </div>
        </van-card>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      loading: false,
      finished: false,
      has_next: false,
      next_num: null,
      searchList: []
    };
  },
  async mounted() {
    this.value = this.$route.query.s;
    await this.onSearch();
  },
  methods: {
    async onSearch() {
      let data = await this.api.get("/goods/search", {
        s: this.value
      });
      if (data.status >= 200 && data.status < 300) {
        data = data.data;
        this.has_next = data.has_next;
        this.next_num = data.next_num;
        this.searchList = data.items;
      }
    },
    onLoad() {
      this.getMoreSearchList();
    },
    async getMoreSearchList() {
      if (this.has_next == true) {
        this.has_next = false;
        let data = await this.api.get("/goods/search", {
          s: this.value ,
          page: this.next_num
        });
        if (data.status >= 200 && data.status < 300) {
          data = data.data;
          this.has_next = data.has_next;
          this.next_num = data.next_num;
          this.searchList = this.searchList.concat(data.items);
        }
        this.loading = false;
      } else {
        this.finished = true;
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.list {
  text-align: left;
}
.van-card {
  border-style: solid;
  border-width: 3px;
  border-color: #fafaface;
  border-radius: 15px;
  background-color: #fafafa28;
}
.comment {
  background-color: rgb(233, 233, 233);
  opacity: 0.7;
  border-radius: 15px;
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
</style>