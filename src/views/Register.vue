<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="()=>{this.$router.push('/login')}"
    />
    <van-cell-group>
      <van-field v-model="account" placeholder="请输入账号" left-icon="contact" required />
    </van-cell-group>
    <br />
    <van-cell-group>
      <van-field v-model="password" type="password" placeholder="请输入密码" left-icon="eye-o" required />
    </van-cell-group>
    <br />
    <van-cell-group>
      <van-field v-model="name" placeholder="请输入昵称" left-icon="label-o" required />
    </van-cell-group>
    <br />
    <br />
    <br />

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
    register() {
      this.$notify({
        type: "success",
        message: this.account + this.password + this.name
      });
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
