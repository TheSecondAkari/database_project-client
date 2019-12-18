<template>
  <div class="myselling">
    <van-nav-bar
      title="我发布的"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
    />
    <div class="header"></div>
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
            <van-button size="mini" @click="deleteConfirm()">删除</van-button>
            <van-button size="mini" type="danger" @click="edit(index)">编辑</van-button>
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

      <van-action-sheet v-model="show">
        <p class="title">编辑</p>
        <p>商品信息</p>
        <van-cell-group>
          <van-field v-model="goodName" required clearable label="商品名:" :placeholder="goodName" />
          <van-field v-model="goodPrice" required clearable label="价格:" :placeholder="goodPrice" />
          <van-field v-model="goodTag" required clearable label="标签:" :placeholder="goodTag" />
        </van-cell-group>
        <van-cell-group>
          <p>商品图片</p>
          <van-panel title="商品图片">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="2" />
          </van-panel>
          <van-button type="default" style="width:50%" @click="show=false">取消</van-button>
          <van-button type="primary" style="width:50%" @click="editConfirm()">确认</van-button>
        </van-cell-group>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      show: false,
      goodIndex: "",
      goodName: "",
      goodPrice: "",
      goodTag: "",
      goodDes: "",
      fileList: [
        // { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      goodList: [
        {
          goodId: "1",
          goodNum: "1",
          goodName: "建良原味T恤1",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          image:[],
        },
        {
          goodId: "2",
          goodNum: "1",
          goodName: "建良原味T恤2",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          image:[],
        },
        {
          goodId: "3",
          goodNum: "1",
          goodName: "建良原味T恤3",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          image:[],
        },
        {
          goodId: "4",
          goodNum: "1",
          goodName: "建良原味T恤4",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          image:[],
        },
        {
          goodId: "5",
          goodNum: "1",
          goodName: "建良原味T恤5",
          goodPrice: "10.1",
          goodTag: "服装",
          goodDes: "有内味",
          image:[],
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
    edit(index) {
      this.show = true;
      this.goodName = this.goodList[index].goodName;
      this.goodPrice = this.goodList[index].goodPrice;
      this.goodTag = this.goodList[index].goodTag;
      this.fileList = this.goodList[index].image;
      this.goodIndex = index;
    },
    editConfirm() {
      if (this.goodName == "" || this.goodPrice == "" || this.goodTag == "")
        this.$notify({ type: "danger", message: "请完善信息" });
      else {
        this.$dialog
          .confirm({
            title: "",
            message: "是否保留这些修改？"
          })
          .then(() => {
            this.goodList[this.goodIndex].goodName = this.goodName;
            this.goodList[this.goodIndex].goodPrice = this.goodPrice;
            this.goodList[this.goodIndex].goodTag = this.goodTag;
             this.goodList[this.goodIndex].image=this.fileList;
            this.$notify({ type: "success", message: "修改成功" });
            this.show = false;
            // on confirm
          })
          .catch(() => {
            this.show = false;
            // on cancel
          });
      }
    },
    deleteConfirm() {
      this.$dialog
        .confirm({
          title: "",
          message: "确认删除该商品？"
        })
        .then(() => {
          this.$notify({ type: "success", message: "删除成功" });
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