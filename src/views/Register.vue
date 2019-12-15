<template>
  <div class="register">
    <h1>注册</h1>
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
    <van-cell-group>
      <van-field v-model="name" label="昵称" placeholder="请输入昵称" left-icon="label-o" required />
    </van-cell-group>
    <br />
    <br />
    <br />
    <br />
    <van-row type="flex" justify="center">
      <van-button icon="arrow-left" round type="info" size="normal" @click="back()">返回</van-button>
      <van-button icon="arrow" round type="info" size="normal" @click="register()">注册</van-button>
    </van-row>
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
    register() {
      this.$notify({
        type: "success",
        message: this.account + this.password + this.name
      });
    },
    back() {
      this.$notify({ type: "success", message: "返回登陆页面" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  margin-top: 80px;
}
</style>
