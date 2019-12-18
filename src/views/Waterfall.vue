<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    style="padding-bottom: 15%; background: blanchedalmond;"
  >
    <div class="container" ref="content">
      <div class="col">
        <div class="card" v-for="item in imgsList1" :key="item.id" v-on:click="reDirect($event)" :id="item.id">
          <van-image :src="item.img" style="width: 100%; display: block" />
          <div class="detail">
            <div class="title">{{item.name}}</div>
            <div style="padding-top: 2.5%;">
              <van-tag plain style="margin-left: 5%;">{{item.category.name}}</van-tag>
            </div>
            <div class="other">
              <div class="line" style="font-size: 12px;">￥</div>
              <div class="line" style="font-size: 22px;">{{item.price}}</div>
              <div class="line" style="position: absolute; right: 10px; font-size: 12px;">{{item.view}}人浏览</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" v-for="item in imgsList2" :key="item.id" v-on:click="reDirect($event)" :id="item.id">
          <van-image :src="item.img" style="width: 100%; display: block" />
          <div class="detail">
            <div class="title">{{item.name}}</div>
            <div style="padding-top: 2.5%;">
              <van-tag plain style="margin-left: 5%;">{{item.category.name}}</van-tag>
            </div>
            <div class="other">
              <div class="line" style="font-size: 12px;">￥</div>
              <div class="line" style="font-size: 22px;">{{item.price}}</div>
              <div class="line" style="position: absolute; right: 10px; font-size: 12px;">{{item.view}}人浏览</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
export default {
  props: ["imgsArr"],
  data() {
    return {
      imgs: this.imgsArr,
      loading: false,
      finished: false,
      index: 1,
      mainList: [],
      imgsList1: [],
      imgsList2: []
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.getImagelist();
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.mainList.length == this.imgs.length) {
          this.finished = true;
        }
      }, 1000);
    },
    getImagelist: function() {
      var index = this.index;
      var mainList = this.imgs.slice(4 * (index - 1), 4 * index);
      var mid = parseInt(mainList.length / 2);
      var imgsList1 = mainList.slice(mid, mainList.length);
      var imgsList2 = mainList.slice(0, mid);
      this.mainList = this.mainList.concat(mainList);
      this.imgsList1 = this.imgsList1.concat(imgsList1);
      this.imgsList2 = this.imgsList2.concat(imgsList2);
      this.index = this.index + 1;
    },
    async reDirect(e){
      var id = parseInt(e.currentTarget.id)
      await this.api.get('/goods/view', {
        id: id
      })
      var item = undefined;
      this.imgs.forEach(element => {
        if(element.id == id){
          item = element
        }
      });
      console.log(item)
      this.$router.push({
        path: "/good",
        query: {
          good: item,
        }
      });
    }
  }
};
</script>

<style>
.container {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.title {
  width: 70%;
  margin-left: 5%;
  padding-top: 5%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
.col {
  display: flex;
  flex-direction: column;
  width: 46%;
  padding: 0% 2%;
}
.card {
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 5%;
}
.detail {
  width: 100%;
  padding-bottom: 5%; 
  background: white;
}
.other {
  margin-top: 10%;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  position: relative;
}
.line {
  line-height: 28px;
  height: 28px;
}
</style>