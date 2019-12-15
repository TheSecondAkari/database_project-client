<template>
  <div class="login">
    <van-nav-bar title="登陆" left-text="返回" left-arrow @click-left="()=>{this.$router.push('/myinfo')}" />
    <van-cell-group >
      <van-field v-model="account" placeholder="请输入账号" left-icon="contact" required />
    </van-cell-group>
    <br />
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        placeholder="请输入密码"
        left-icon="eye-o"
        required
      />
    </van-cell-group>
    <van-button icon="arrow" type="info" @click="login()" style="margin-top:20%;width:96%">登陆</van-button>
    <div class="foot">
      <!-- 居中 -->
      <van-row type="flex" justify="center" style="font-weight:lighter">
        <!-- <van-col span="10">忘记密码</van-col> -->
        <van-col span="10" @click="goto_register()">注册账号</van-col>
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
    },
    goto_register(){
        this.$router.push("/register");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot {
  margin-top:82%;
}
</style>
