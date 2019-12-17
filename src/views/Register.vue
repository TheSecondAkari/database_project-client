<template>
  <div class="register">
      <!-- 顶层显示栏 -->
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/login')}"
    />
    <!-- 注册账号输入：单元格+输入框 -->
    <van-cell-group>
      <van-field v-model="account" placeholder="请输入账号" left-icon="contact" required />
    </van-cell-group>
    <br />
    <!-- 注册密码输入 -->
    <van-cell-group>
      <van-field v-model="password" type="password" placeholder="请输入密码" left-icon="eye-o" required />
    </van-cell-group>
    <br />
    <!-- 注册用户昵称 -->
    <van-cell-group>
      <van-field v-model="name" placeholder="请输入昵称" left-icon="label-o" required />
    </van-cell-group>
    <br />
    <br />
    <br />
    <!-- 注册按钮 -->
    <van-button icon="arrow" type="info" @click="register()" style="width:96%">注册</van-button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      account: "",
      password: "",
      name: ""
    };
  },
  methods: {
    async register() {
      let res = await this.api.post("/register", {
        username: this.account,
        password: this.password,
        name: this.name
      });
      if (res.status >= 200 && res.status < 300) {
          this.$notify({
              type: 'success',
              message: res.data.errmsg
          });
          this.$router.push("/login");
      }
    },
    back() {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
