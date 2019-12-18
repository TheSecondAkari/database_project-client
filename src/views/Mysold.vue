<template>
  <div class="mysold">
    <van-nav-bar
      title="我卖出的"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
    />
    <div class="header">
      <van-tabs v-model="active">
        <van-tab title="待发货">
          <div class="list">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-card
                v-for="(item,index) in goodList"
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
                
                  <van-button size="mini" type="danger" @click="check1(index)">查看</van-button>
                </div>
              </van-card>
            </van-list>
            <van-swipe-cell :on-close="onClose">
              <template slot="left">
                <van-button square type="primary" text="选择" />
              </template>

              <van-cell :border="false" title="单元格" value="内容" />

              <template slot="right">
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>

            <van-action-sheet v-model="show1">
              <p class="title">详情</p>
              <p>商品信息</p>
              <van-cell-group>
                <van-cell title="商品名" :value="goodName" />
                <van-cell title="价格" :value="goodPrice" />
                <van-cell title="标签" :value="goodTag" />
              </van-cell-group>
              <p>交易信息</p>
              <van-cell-group>
                <van-cell title="收货人" :value="receName" />
                <van-cell title="电话" :value="recePhon" />
                <van-cell title="收货地址" :value="recePos" />
              </van-cell-group>
              <van-cell-group>
                <van-button type="default" style="width:50%" @click="show1=false">关闭</van-button>
                <van-button type="primary" style="width:50%" @click="sentConfirm()">确认发货</van-button>
              </van-cell-group>
            </van-action-sheet>
          </div>
        </van-tab>
        <van-tab title="已发货">
          <div class="list">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-card
                v-for="(item,index) in goodList"
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

                  <van-button size="mini" type="danger" @click="check2(index)">查看</van-button>
                </div>
              </van-card>
            </van-list>
            <van-swipe-cell :on-close="onClose">
              <template slot="left">
                <van-button square type="primary" text="选择" />
              </template>

              <van-cell :border="false" title="单元格" value="内容" />

              <template slot="right">
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>

            <van-action-sheet v-model="show2">
              <p class="title">详情</p>
              <p>商品信息</p>
              <van-cell-group>
                <van-cell title="商品名" :value="goodName" />
                <van-cell title="价格" :value="goodPrice" />
                <van-cell title="标签" :value="goodTag" />
              </van-cell-group>
              <p>交易信息</p>
              <van-cell-group>
                <van-cell title="收货人" :value="receName" />
                <van-cell title="电话" :value="recePhon" />
                <van-cell title="收货地址" :value="recePos" />
              </van-cell-group>
              <van-cell-group>
                <van-button type="default" style="width:100%" @click="show2=false">关闭</van-button>
              </van-cell-group>
            </van-action-sheet>
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
      active:"1",
      loading: false,
      finished: false,
      show1: false,
      show2: false,
      goodIndex: "", //商品Index
      goodName: "", //商品名
      goodPrice: "", //商品价格
      goodTag: "", //商品标签
      goodDes: "", //商品描述
      receName: "", //收货人
      recePhon: "", //收货人手机
      recePos: "", //收货人地点
      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true }
      ],
      goodList: [
        {
          goodId: "1",
          goodNum: "1",
          goodName: "建良原味T恤1",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          receName:"陈建良1",
          recePhon:"64551",
          recePos:"xxxxxxxxx",
        },
        {
          goodId: "2",
          goodNum: "1",
          goodName: "建良原味T恤2",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          receName:"陈建良2",
          recePhon:"64552",
          recePos:"xxxxxxxxx",
        },
        {
          goodId: "3",
          goodNum: "1",
          goodName: "建良原味T恤3",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          receName:"陈建良3",
          recePhon:"64553",
          recePos:"xxxxxxxxx",
        },
        {
          goodId: "4",
          goodNum: "1",
          goodName: "建良原味T恤4",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          receName:"陈建良4",
          recePhon:"64554",
          recePos:"xxxxxxxxx",
        },
        {
          goodId: "5",
          goodNum: "1",
          goodName: "建良原味T恤5",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          receName:"陈建良5",
          recePhon:"64555",
          recePos:"xxxxxxxxx",
        }
      ]
    };
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.confirm({
            message: "确定删除吗？"
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
    check1(index) {
      this.show1 = true;
      this.goodName = this.goodList[index].goodName;
      this.goodPrice = this.goodList[index].goodPrice;
      this.goodTag = this.goodList[index].goodTag;
      this.receName = this.goodList[index].receName;
      this.recePhon = this.goodList[index].recePhon;
      this.recePos = this.goodList[index].recePos;
      this.goodIndex = index;
    },
        check2(index) {
      this.show2 = true;
      this.goodName = this.goodList[index].goodName;
      this.goodPrice = this.goodList[index].goodPrice;
      this.goodTag = this.goodList[index].goodTag;
      this.receName = this.goodList[index].receName;
      this.recePhon = this.goodList[index].recePhon;
      this.recePos = this.goodList[index].recePos;
      this.goodIndex = index;
    },
    sentConfirm() {
      this.$dialog
        .confirm({
          title: "",
          message: "是否确认已发货？"
        })
        .then(() => {
          this.goodList[this.goodIndex].goodName = this.goodName;
          this.goodList[this.goodIndex].goodPrice = this.goodPrice;
          this.goodList[this.goodIndex].goodTag = this.goodTag;
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
</style>