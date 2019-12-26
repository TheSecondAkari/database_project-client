<template>
  <div class="notSentOrders">
    <van-nav-bar
      title="待评价订单"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
    />
    <van-list
      style="padding-bottom:5px;"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <van-list class="order-css" v-for="item in list" :key="item.id">
        <div class="shop">
          <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div style="width:70%">
            <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.vendor.name}}</div>
          </div>
        </div>
        <van-card
          class="card"
          v-for="good in item.goods"
          :key="good.id"
          :num="good.num"
          :price="good.price"
          :desc="good.desc"
          :title="good.name"
          :thumb="good.img"
        />
        <van-cell :value="item.address.phone">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <van-tag round size="medium" type="primary">收</van-tag>
            <span style="margin-left:4%">{{item.address.name}}</span>
          </template>
          <template slot="label">
            <span>{{item.address.desc}}</span>
          </template>
        </van-cell>
        <div style="color:gray;font-size:11px;margin-left:4%">
          <p>下单时间：{{item.created_at}}</p>
          <p>订单号：{{item.order_number}}</p>
        </div>
        <van-popup v-model="show" position="bottom" autosize>
          <van-field
            v-model="message"
            autosize
            label="评价"
            type="textarea"
            maxlength="150"
            placeholder="请输入评价,输入为空，则默认为优"
            show-word-limit
          />
          <van-button size="small" round style="margin-left: 2.5%" @click="clean">清空</van-button>
          <van-button
            size="small"
            round
            style="margin-left: 55%"
            type="info"
            @click="comfirm()"
          >确认发布</van-button>
        </van-popup>
        <van-button
          v-if="item.comment == null"
          plain
          size="small"
          type="info"
          round
          style="margin:0px 2.5% 2.5% 75%;"
          @click="comment(item.id)"
        >评价</van-button>
        <van-cell v-else title="评价" :label="item.comment.content" />
      </van-list>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "notSent",
  data() {
    return {
      comment_id: 0,
      show: false,
      finished: false,
      message: ""
    };
  },
  computed: {
    list() {
      return this.$store.getters.Taken;
    },
    loading: {
      get() {
        return this.$store.getters.TakenLoading;
      },
      set(value) {
        this.$store.commit("closeTakenLoading", value);
      }
    }
  },
  methods: {
    comment(id) {
      this.comment_id = id;
      this.show = true;
    },
    clean() {
      this.message = "";
    },
    async comfirm() {
      if (this.message == "") this.message = "评论为空，默认好评";
      let data = await this.api.post("/comment", {
        order_id: this.comment_id,
        content: this.message
      });
      if (data.status >= 200 && data.status < 300) {
        this.$notify({
          type: "success",
          message: data.data.errmsg
        });
        this.$store.commit("getTaken");
      }
      this.message = "";
      this.comment_id = 0;
      this.show = false;
    },
    onLoad() {
      this.$store.commit("getMoreTaken");
      if (this.$store.state.taken_has_next == false) this.finished = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notSentOrders {
  background-color: rgb(252, 196, 76);
  /* min-height: 670px; */
}
.card {
  text-align: left;
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
.shop {
  width: 95%;
  margin-top: 3px;
  margin-left: 2.5%;
  display: flex;
  flex-direction: row;
}

</style>
