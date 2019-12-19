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
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="order-css" v-for="(item,index) in goodList1" :key="item.orderId">
              <div class="shop">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div style="width:70%">
                  <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">超级加倍卢本伟！</div>
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
              <!-- <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：2019-12-12 12:56:23</p>
                <p>订单号：123456789123456789</p>
              </div>-->
              <van-button type="danger" @click="sendConfirm(index)">确认发货</van-button>
            </van-cell>
          </van-list>
        </van-tab>
        <van-tab title="待收货">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="order-css" v-for="item in goodList2" :key="item.orderId">
              <div class="shop">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div style="width:70%">
                  <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">超级加倍卢本伟！</div>
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
              <!-- <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：2019-12-12 12:56:23</p>
                <p>订单号：123456789123456789</p>
              </div>-->
            </van-cell>
          </van-list>
        </van-tab>
        <van-tab title="已收货">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="order-css" v-for="item in goodList3" :key="item.orderId">
              <div class="shop">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div style="width:70%">
                  <div style="margin-left: 5%; margin-top:1.8%; font-weight: 600">超级加倍卢本伟！</div>
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
              <!-- <div style="color:gray;font-size:11px;margin-left:4%">
                <p>下单时间：2019-12-12 12:56:23</p>
                <p>订单号：123456789123456789</p>
              </div>-->
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
      loading: false,
      finished: false,
      orderId: "",
    };
  },
  computed: {
    goodList() {
      return this.$store.getters.MySold;
    },
    goodList1(){
        var temp=[];
        for (var i = 0; i < this.goodList.length; i++) 
        if (this.goodList[i].status == "待发货")
          temp.push(this.goodList[i]);
        return temp;
    },
    goodList2(){
        var temp=[];
        for (var i = 0; i < this.goodList.length; i++) 
        if (this.goodList[i].status == "已发货")
          temp.push(this.goodList[i]);
        return temp;
    },
    goodList3(){
        var temp=[];
        for (var i = 0; i < this.goodList.length; i++) 
        if (this.goodList[i].status == "已确认收货")
          temp.push(this.goodList[i]);
        return temp;
    }
  },
  methods: {
    sendConfirm(index) {
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
            console.log(this.goodList2);
            this.$store.commit("getMySold");
            console.log(this.goodList);
            this.getList();
            console.log(this.goodList2);
          }
          
          // on confirm
        })
        .catch(() => {
          this.show = false;
          // on cancel
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      return file;
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        // if (this.list.length >= 40) {
        this.finished = true;
        // }
      }, 500);
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