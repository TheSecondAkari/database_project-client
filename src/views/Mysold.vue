<template>
  <div class="mysold">
    <div class="header">
      <van-nav-bar
        title="我卖出的"
        left-text="返回"
        left-arrow
        @click-left="()=>{this.$router.push('/myinfo')}"
      />
    </div>
    <div class="list">
      <van-tabs v-model="active">
        <van-tab title="待发货">
          <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
            <van-cell class="order-css" v-for="(item,index) in goodList1" :key="item.orderId">
              <div class="shop">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div style="width:70%">
                  <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.userName}}</div>
                  <!-- <div class="info">我卢本伟真TM没开挂！不信你们可以随便石锤我</div> -->
                </div>
              </div>
              <van-card
                class="card"
                v-for="good in item.goodsList"
                :key="good.goodId"
                :num="1"
                :price="good.price"
                :desc="good.detail"
                :title="good.goodName"
                :thumb="good.img"
              >
                <div slot="tags">
                  <van-tag plain type="danger">{{good.category.name}}</van-tag>
                </div>
              </van-card>
              <van-cell :value="item.receive.phone">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                  <van-tag round size="medium" type="primary">收</van-tag>
                  <span style="margin-left:4%">{{item.receive.name}}</span>
                </template>
                <template slot="label">
                  <span>
                    {{ item.receive.province +
                    item.receive.city +
                    item.receive.county
                    }}
                  </span>
                  <p style="margin:5px 0px 5px 0px">{{item.receive.detail}}</p>
                </template>
              </van-cell>
              <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：{{item.date}}</p>
                <p>订单号：{{item.orderId}}</p>
              </div>
              <van-button
                plain
                size="small"
                type="info"
                round
                style="margin:0px 2.5% 2.5% 75%;"
                @click="Confirm(index)"
              >确认发货</van-button>
            </van-cell>
          </van-list>
        </van-tab>
        <van-tab title="待收货">
          <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
            <van-cell class="order-css" v-for="item in goodList2" :key="item.orderId">
              <div class="shop">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div style="width:70%">
                  <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.userName}}</div>
                  <!-- <div class="info">我卢本伟真TM没开挂！不信你们可以随便石锤我</div> -->
                </div>
              </div>
              <van-card
                class="card"
                v-for="good in item.goodsList"
                :key="good.goodId"
                :num="1"
                :price="good.price"
                :desc="good.detail"
                :title="good.goodName"
                :thumb="good.img"
              >
                <div slot="tags">
                  <van-tag plain type="danger">{{good.category.name}}</van-tag>
                </div>
              </van-card>
              <van-cell :value="item.receive.phone">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                  <van-tag round size="medium" type="primary">收</van-tag>
                  <span style="margin-left:4%">{{item.receive.name}}</span>
                </template>
                <template slot="label">
                  <span>
                    {{ item.receive.province +
                    item.receive.city +
                    item.receive.county
                    }}
                  </span>
                  <p style="margin:5px 0px 5px 0px">{{item.receive.detail}}</p>
                </template>
              </van-cell>
              <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：{{item.date}}</p>
                <p>订单号：{{item.orderId}}</p>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
        <van-tab title="已收货">
          <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
            <van-cell class="order-css" v-for="item in goodList3" :key="item.orderId">
              <div class="shop">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div style="width:70%">
                  <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">{{item.userName}}</div>
                  <!-- <div class="info">我卢本伟真TM没开挂！不信你们可以随便石锤我</div> -->
                </div>
              </div>
              <van-card
                class="card"
                v-for="good in item.goodsList"
                :key="good.goodId"
                :num="1"
                :price="good.price"
                :desc="good.detail"
                :title="good.goodName"
                :thumb="good.img"
              >
                <div slot="tags">
                  <van-tag plain type="danger">{{good.category.name}}</van-tag>
                </div>
              </van-card>
              <van-cell :value="item.receive.phone">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                  <van-tag round size="medium" type="primary">收</van-tag>
                  <span style="margin-left:4%">{{item.receive.name}}</span>
                </template>
                <template slot="label">
                  <span>
                    {{ item.receive.province +
                    item.receive.city +
                    item.receive.county
                    }}
                  </span>
                  <p style="margin:5px 0px 5px 0px">{{item.receive.detail}}</p>
                </template>
              </van-cell>
              <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：{{item.date}}</p>
                <p>订单号：{{item.orderId}}</p>
              </div>
              <van-cell v-if="item.comment==null" title="用户未作评价" />
              <van-cell v-else title="评价" :label="item.comment.content" />
            </van-cell>
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
      finished: false,
      orderId: "",
      userName: ""
    };
  },
  computed: {
    goodList() {
      return this.$store.getters.MySold;
    },
    loading: {
      get() {
        return this.$store.getters.MyGoodsLoading;
      },
      set(value) {
        this.$store.commit("closeMySoldLoading", value);
      }
    },
    goodList1() {
      var temp = [];
      for (var i = 0; i < this.goodList.length; i++)
        if (this.goodList[i].status == "待发货") temp.push(this.goodList[i]);
      return temp;
    },
    goodList2() {
      var temp = [];
      for (var i = 0; i < this.goodList.length; i++)
        if (this.goodList[i].status == "已发货") temp.push(this.goodList[i]);
      return temp;
    },
    goodList3() {
      var temp = [];
      for (var i = 0; i < this.goodList.length; i++)
        if (this.goodList[i].status == "已确认收货")
          temp.push(this.goodList[i]);
      return temp;
    }
  },
  methods: {
    Confirm(index) {
      this.$dialog
        .confirm({
          title: "",
          message: "是否确认已发货？"
        })
        .then(async () => {
          let data = await this.api.put(
            "/order/" + this.goodList1[index].orderId + "/state",
            { state: 2 }
          );
          if (data.status >= 200 && data.status < 300) {
            this.$notify({ type: "success", message: "发货成功" });
            this.$store.commit("getMySold");
            this.getList();
          }

          // on confirm
        })
        .catch(() => {
          this.show = false;
          // on cancel
        });
    },
    onLoad() {
      this.$store.commit("getMoreMySold");
      if (this.$store.state.mysold_has_next == false) this.finished = true;
    },
    
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
.title {
  text-align: center;
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
  background-color: white;
  margin: 5px 0px 5px 0px;
}
.shop {
  width: 95%;
  margin-top: 3px;
  margin-left: 2.5%;
  display: flex;
  flex-direction: row;
}
.mysold {
  background-color: rgb(252, 196, 76);
}
</style>