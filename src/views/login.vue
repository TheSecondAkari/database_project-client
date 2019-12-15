<template>
  <div class="login">
    <h1>登陆</h1>
    <van-cell-group>
      <van-field v-model="account" placeholder="请输入账号" label="账号" left-icon="contact" required />
    </van-cell-group>
    <br />
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        left-icon="eye-o"
        required
      />
    </van-cell-group>
    <br />
    <br />
    <br />
    <br />
    <van-button icon="arrow" round type="info" size="normal" @click="login()">登陆</van-button>
    <div class="foot">
      <!-- 居中 -->
      <van-row type="flex" justify="center" style="font-weight:bold">
        <van-col span="10">忘记密码</van-col>
        <van-col span="10">注册账号</van-col>
      </van-row>
      <!-- 居中 -->
      <van-row type="flex" justify="center">
        <van-col span="20">
          登陆即代表阅读并同意
          <strong>服务协议</strong>
        </van-col>
      </van-row>
      <br />
    </div>
  </div>
</template>



<script>
export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: ""
    };
  },
  props: {},
  methods: {
    login() {
      this.$notify({ type: "success", message: this.account + this.password });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin-top: 80px;
}
.foot {
  margin-top: 60%;
}
</style>
