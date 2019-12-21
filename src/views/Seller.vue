<template>
  <div class="myselling">
    <div class="header">
      <van-nav-bar
        title="店家主页"
        left-text="返回"
        left-arrow
        @click-left="()=>{this.$router.push('/myinfo')}"
      />
      <van-cell-group>
        <van-cell>
          <van-image
            style="float:left;margin-right:10px;"
            round
            width="100px"
            height="100px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <h1>{{userName}}</h1>
        </van-cell>
      </van-cell-group>
      <!-- <van-skeleton :title="true" avatar avatar-size="64px" avatar-shape="squard" :row="3" /> -->
    </div>
    <div class="list">
      <van-tabs v-model="active">
        <van-tab title="他发布的">
          <van-list
            v-model="hisSelling_loading"
            :finished="hisSelling_finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoadSelling"
          >
            <van-card
              v-for="(item,index) in hisSelling"
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
              <div slot="footer">
                <van-button size="mini" type="danger" @click="jumpToGood(index)">查看</van-button>
              </div>
            </van-card>
          </van-list>
        </van-tab>
        <van-tab title="他卖出的">
          <van-list
            style="padding-bottom:5px;"
            v-model="hisSold_loading"
            :finished="hisSold_finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoadSold"
          >
            <van-list class="order-css" v-for="item in hisSold" :key="item.id">
              <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：{{item.created_at}}</p>
              </div>
              <van-card
                class="card"
                v-for="good in item.item"
                :key="good.goods.id"
                num="1"
                :price="good.goods.price"
                :desc="good.goods.detail"
                :title="good.goods.name"
                :thumb="good.goods.img"
              >
                <div slot="tags">
                  <van-tag plain type="danger">{{good.goods.category.name}}</van-tag>
                </div>
              </van-card>
              <div>
                <van-cell v-if="item.comment== null" class="comment">
                  <div>
                    <span style="font-weight:bold">无评论</span>
                  </div>
                </van-cell>
                <van-cell v-else class="comment">
                  <div>
                    <p style="font-weight:500;margin-left:2%;float:left">"{{item.user.name}}"</p>
                    <span style="margin-left:3%">评论了:</span>
                    <span style="margin-left:3%">{{item.comment.content}}</span>
                  </div>
                </van-cell>
              </div>
            </van-list>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "1",

      hisSelling_loading: false,
      hisSelling_finished: false,

      hisSold_loading: false,
      hisSold_finished: false,

      hisSelling_has_next: false,
      hisSold_has_next: false,
      hisSelling_next_num: 1,
      hisSold_next_num: 1,

      userName: "",
      user_id: "",
      hisSelling: [],
      hisSold: []
    };
  },
  async mounted() {
    this.userName = this.$route.query.name;
    this.user_id = this.$route.query.id;
    let data = await this.api.get("user/goods", {
      user_id: this.user_id,
      page: 1
    });
    if (data.status >= 200 && data.status < 300) {
      data = data.data;
      this.hisSelling_has_next = data.has_next;
      this.hisSelling_next_num = data.next_num;
      this.hisSelling = data.items;
    }
    data = await this.api.get("user/orders", {
      user_id: this.user_id,
      page: 1
    });
    if (data.status >= 200 && data.status < 300) {
      data = data.data;
      this.hisSold_has_next = data.has_next;
      this.hisSold_next_num = data.next_num;
      console.log(this.hisSold_has_next,this.hisSold_next_num)
      this.hisSold = data.items;
    }
  },
  methods: {
    jumpToGood(index) {
      this.$notify({ type: "success", message: "跳转成功" + index });
      this.$router.push("/myinfo");
    },
    onLoadSelling() {
      this.getMoreHisSelling();
    },
    onLoadSold() {
      this.getMoreHisSold();
    },
    async getMoreHisSelling() {
      if (this.hisSelling_has_next == true) {
          this.hisSelling_has_next = false;
        let data = await this.api.get("user/goods", {
          user_id: this.user_id,
          page: this.hisSelling_next_num
        });
        if (data.status >= 200 && data.status < 300) {
          data = data.data;
          this.hisSelling_has_next = data.has_next;
          this.hisSelling_next_num = data.next_num;
          this.hisSelling = this.hisSelling.concat(data.items);
        }
        this.hisSelling_loading = false;
      } else {
        this.hisSelling_finished = true;
        this.hisSelling_loading = false;
      }
    },
    async getMoreHisSold() {
      if (this.hisSold_has_next == true) {
          this.hisSold_has_next = false;
        let data = await this.api.get("user/orders", {
          user_id: this.user_id,
          page: this.hisSold_next_num
        });
        if (data.status >= 200 && data.status < 300) {
          data = data.data;
          this.hisSold_has_next = data.has_next;
          this.hisSold_next_num = data.next_num;
          this.hisSold = this.hisSold.concat(data.items);
        }
        this.hisSold_loading = false;
      } 
      else {
        this.hisSold_finished = true;
        this.hisSelling_loading = false;
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