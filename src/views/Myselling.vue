<template>
  <div class="myselling">
    <van-nav-bar
      title="我发布的"
      left-text="返回"
      right-text="发布新商品"
      left-arrow
      @click-left="()=>{this.$router.push('/myinfo')}"
      @click-right="addgood()"
    />
    <div class="header"></div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <van-card
          v-for="(item,index) in goodList"
          :key="item.id"
          :num="1"
          :price="item.price"
          :desc="item.detail"
          :title="item.name"
          :thumb="item.img"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{item.category.name}}</van-tag>
          </div>
          <div slot="footer">
            <van-button size="mini" @click="deleteConfirm(index)">删除</van-button>
            <van-button size="mini" type="danger" @click="edit(index)">编辑</van-button>
          </div>
        </van-card>
      </van-list>

      <!-- 修改商品信息 -->
      <van-action-sheet v-model="editshow">
        <p class="title">编辑</p>
        <p>商品信息</p>
        <van-cell-group>
          <van-field v-model="editgoodName" required clearable label="商品名:" placeholder="商品名称" />
          <van-field v-model="editgoodPrice" required clearable label="价格:" placeholder="价格" />
          <van-field
            readonly
            clickable
            label="标签"
            :value="goodTag"
            placeholder="选择标签类型"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
          <van-field
            v-model="editgoodDetail"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            placeholder="请输入描述"
          />
        </van-cell-group>
        <van-cell-group>
          <van-panel title="商品图片">
            <van-uploader :after-read="afterRead" v-model="editfileList" multiple :max-count="4" />
          </van-panel>
          <van-button type="default" style="width:50%" @click="canceledit()">取消</van-button>
          <van-button type="primary" style="width:50%" @click="editConfirm()">确认</van-button>
        </van-cell-group>
      </van-action-sheet>

      <!-- 发布新商品 -->
      <van-action-sheet v-model="addshow">
        <p class="title">添加</p>
        <p>商品信息</p>
        <van-cell-group>
          <van-field v-model="addgoodName" required clearable label="商品名:" placeholder="商品名称" />
          <van-field v-model="addgoodPrice" required clearable label="价格:" placeholder="价格" />
          <!-- 类型选择框，配合弹出层使用 -->
          <van-field
            readonly
            clickable
            label="标签"
            :value="goodTag"
            placeholder="选择标签类型"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
          <van-field
            v-model="addgoodDetail"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            placeholder="请输入描述"
          />
        </van-cell-group>
        <van-cell-group>
          <van-panel title="商品图片">
            <van-uploader :after-read="afterRead" v-model="addfileList" multiple :max-count="4" />
          </van-panel>
          <van-button type="default" style="width:50%" @click="canceladd()">取消</van-button>
          <van-button type="primary" style="width:50%" @click="addConfirm()">确认</van-button>
        </van-cell-group>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      file_index: 1,
      //   loading: false,
      finished: false,
      editshow: false,
      addshow: false,
      goodIndex: "",
      editgoodName: "",
      editgoodPrice: "",
      goodTag: "",
      goodTagId: "",
      editgoodDetail: "",
      addgoodName: "",
      addgoodPrice: "",
      addgoodDetail: "",
      addfileList: [
        // { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      editfileList: [
        // { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ]
    };
  },
  computed: {
    goodList() {
      return this.$store.getters.MySelling;
    },
    columns() {
      return this.$store.getters.Category;
    },
    loading: {
      get() {
        return this.$store.getters.MyGoodsLoading;
      },
      set(value) {
        this.$store.commit("closeMyGoodsLoading", value);
      }
    }
  },
  methods: {
    edit(index) {
      this.editfileList = [];
      this.editshow = true;
      this.editgoodName = this.goodList[index].name;
      this.editgoodPrice = this.goodList[index].price;
      this.goodTag = this.goodList[index].category.name;
      this.goodTagId = this.goodList[index].category.id;
      this.editgoodDetail = this.goodList[index].detail;
      for (var i = 0; i < this.goodList[index].imgs.length; i++)
        this.editfileList.push({ url: this.goodList[index].imgs[i] });
      this.goodIndex = index;
    },
    editConfirm() {
      if (
        this.editgoodName == "" ||
        this.editgoodPrice == "" ||
        this.goodTag == "" ||
        this.editgoodDetail == ""
      )
        this.$notify({ type: "danger", message: "请完善信息" });
      else {
        this.$dialog
          .confirm({
            title: "",
            message: "是否保留这些修改？"
          })
          .then(async () => {
            let images = [];
            let fileData = new FormData();
            var i = 0;
            for (; i < this.editfileList.length; i++)
              if (this.editfileList[i].url == null) break;
              else images.push(this.editfileList[i].url.split("images/")[1]);
            let upload = this.editfileList.slice(i);
            upload.forEach(file => {
              fileData.append("file" + this.file_index++, file.file);
            });
            let imgdata = await this.api.post("/upload", fileData, {
              "Content-Type": "multipart/form-data"
            });
            if (imgdata.status >= 200 && imgdata.status < 300) {
              images = images.concat(imgdata.data);
              let data = await this.api.put(
                "/goods/" + this.goodList[this.goodIndex].id,
                {
                  name: this.editgoodName,
                  price: this.editgoodPrice,
                  detail: this.editgoodDetail,
                  imgs: images,
                  category_id: this.goodTagId
                }
              );
              if (data.status >= 200 && data.status < 300) {
                this.$notify({
                  type: "success",
                  message: data.data.errmsg
                });
                this.$store.commit("getMySelling");
              }
            }
            this.editshow = false;
            this.editfileList = [];
            this.file_index = 1;
            this.goodTag = "";
            this.goodTagId = "";
            // on confirm
          })
          .catch(() => {
            this.editshow = false;
            this.editfileList = [];
            this.file_index = 1;
            this.goodTag = "";
            this.goodTagId = "";
            // on cancel
          });
      }
    },
    canceledit() {
      this.editshow = false;
      this.editfileList = [];
      this.goodTag = "";
      this.goodTagId = "";
    },
    deleteConfirm(index) {
      this.$dialog
        .confirm({
          title: "",
          message: "确认删除该商品？"
        })
        .then(async () => {
          let data = await this.api.delete("/goods/" + this.goodList[index].id);
          if (data.status >= 200 && data.status < 300) {
            this.$notify({ type: "success", message: data.data.errmsg });
            this.$store.commit("getMySelling");
          }
          this.editshow = false;
          this.editfileList = [];
          this.file_index = 1;
          this.goodTag = "";
          this.goodTagId = "";
          // on confirm
        })
        .catch(() => {
          this.editshow = false;
          this.editfileList = [];
          this.file_index = 1;
          this.goodTag = "";
          this.goodTagId = "";
          // on cancel
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      return file;
    },
    onLoad() {
      this.$store.commit("getMoreMySelling");
      if (this.$store.state.myselling_has_next == false) this.finished = true;
    },

    //新添加的，
    addgood() {
      this.addshow = true;
    },

    async addConfirm() {
      if (
        this.addgoodName == "" ||
        this.addgoodPrice == "" ||
        this.goodTag == "" ||
        this.addgoodDetail == ""
      )
        this.$notify({ type: "danger", message: "请完善信息" });
      else {
        this.$dialog
          .confirm({
            title: "",
            message: "是否确认提交？"
          })
          .then(async () => {
            let fileData = new FormData();
            this.addfileList.forEach(file => {
              fileData.append("file" + this.file_index++, file.file);
            });
            let imgdata = await this.api.post("/upload", fileData, {
              "Content-Type": "multipart/form-data"
            });
            if (imgdata.status >= 200 && imgdata.status < 300) {
              let images = imgdata.data;
              let data = await this.api.post("/my_goods", {
                name: this.addgoodName,
                price: this.addgoodPrice,
                detail: this.addgoodDetail,
                imgs: images,
                category_id: this.goodTagId
              });
              if (data.status >= 200 && data.status < 300) {
                this.$notify({
                  type: "success",
                  message: data.data.errmsg
                });
                this.$store.commit("getMySelling");
              }
            }
            this.addshow = false;
            this.addfileList = [];
            // this.addgoodName = "";
            // this.addgoodPrice = "";
            // this.addgoodDetail = "";
            this.file_index = 1;
            this.goodTagId = "";
            this.goodTag = "";
            // on confirm
          })
          .catch(e => {
            console.log(e);
            this.addshow = false;
            this.addfileList = [];
            this.addgoodName = "";
            this.addgoodPrice = "";
            this.addgoodDetail = "";
            this.file_index = 1;
            this.goodTag = "";
            this.goodTagId = "";
            // on cancel
          });
      }
    },
    canceladd() {
      this.addshow = false;
      this.addfileList = [];
      this.addgoodName = "";
      this.addgoodPrice = "";
      this.addgoodDetail = "";
      this.file_index = 1;
      this.goodTag = "";
      this.goodTagId = "";
    },
    onConfirm(value, index) {
      this.goodTag = value;
      this.showPicker = false;
      this.goodTagId = index + 1;
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