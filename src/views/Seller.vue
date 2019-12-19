<template>
  <div class="myselling">
    <div class="header">
      <van-nav-bar
        title="动态"
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
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card
              v-for="(item,index) in goodList1"
              :key="item.goodId"
              :num="item.goodNum"
              :price="item.goodPrice"
              :desc="item.goodDes"
              :title="item.goodName"
              thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
              <div slot="tags">
                <van-tag plain type="danger">{{item.goodTag}}</van-tag>
              </div>
              <div slot="footer">
                <van-button size="mini" type="danger" @click="jumpToGood(index)">查看</van-button>
              </div>
            </van-card>
          </van-list>
        </van-tab>
        <van-tab title="他卖出的">
          <div class="list">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-card
                v-for="item in goodList2"
                :key="item.goodId"
                :num="item.goodNum"
                :price="item.goodPrice"
                :desc="item.goodDes"
                :title="item.goodName"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              >
                <div slot="tags">
                  <van-tag plain type="danger">{{item.goodTag}}</van-tag>
                </div>
                <div slot="footer">
                  <van-cell v-if="item.commentId==''" class="comment">
                    <div>
                      <span style="font-weight:bold">无评论</span>
                    </div>
                  </van-cell>
                  <van-cell v-else class="comment">
                    <div>
                      <router-link
                        to="/myinfo"
                        style="font-weight:bold;margin-right:2%"
                      >{{item.commentNam}}</router-link>
                      <span style="font-weight:bold">评论了:</span>
                      <span>{{item.commentCon}}</span>
                    </div>
                  </van-cell>
                </div>
              </van-card>
            </van-list>
          </div>
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
      userName: "几把", //用户名
      //   goodIndex: "", //商品Index
      //   goodName: "", //商品名
      //   goodPrice: "", //商品价格
      //   goodTag: "", //商品标签
      //   goodDes: "", //商品描述
      //   commentId: "",
      //   commrntNam: "",
      //   commentCon: "",
      goodList1: [
        {
          goodId: "1",
          goodNum: "1",
          goodName: "建良原味T恤1",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味"
        },
        {
          goodId: "2",
          goodNum: "1",
          goodName: "建良原味T恤2",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味"
        },
        {
          goodId: "3",
          goodNum: "1",
          goodName: "建良原味T恤3",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味"
        },
        {
          goodId: "4",
          goodNum: "1",
          goodName: "建良原味T恤4",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味"
        },
        {
          goodId: "5",
          goodNum: "1",
          goodName: "建良原味T恤5",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味"
        }
      ],
      goodList2: [
        {
          goodId: "1",
          goodNum: "1",
          goodName: "建良原味T恤1",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          commentId: "1",
          commentNam: "几把",
          commentCon: "这就是建良的衣服吗，真是有够好笑呢"
        },
        {
          goodId: "2",
          goodNum: "1",
          goodName: "建良原味T恤2",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          commentId: "1",
          commentNam: "几把",
          commentCon: ""
        },
        {
          goodId: "3",
          goodNum: "1",
          goodName: "建良原味T恤3",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          commentId: "",
          commentNam: "几把",
          commentCon: "这就是建良的衣服吗，真是有够好笑呢"
        },
        {
          goodId: "4",
          goodNum: "1",
          goodName: "建良原味T恤4",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          commentId: "1",
          commentNam: "几把",
          commentCon: "还好吧"
        },
        {
          goodId: "5",
          goodNum: "1",
          goodName: "建良原味T恤5",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          commentId: "1",
          commentNam: "几把",
          commentCon: "这软件太难用了"
        }
      ]
    };
  },
  computed: {
    goodList() {
      return this.$store.getters.MySelling;
    },
    columns() {
      return this.$store.getters.Category;
    }
  },
  methods: {
    jumpToGood(index) {
      this.$notify({ type: "success", message: "跳转成功" + index });
      this.$router.push("/myinfo");
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
.comment {
  background-color: rgb(233, 233, 233);
  opacity: 0.7;
  border-radius: 15px;
}
</style>