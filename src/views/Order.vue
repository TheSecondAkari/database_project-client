<template>
  <div style="background: gray">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="Back" />
    <div style="padding: 2.5%;">
      <van-panel title="收货地址" style="border-radius: 15px; overflow: hidden;">
        <van-cell icon="location-o" is-link center @click="changeAddress" style="height:75px;">
          <div style="margin-left: 2.5%;">
            <div>
              <strong style="font-size: 18px;">{{address.name}}</strong>
              {{address.tel}}
            </div>
            <div>{{address.address}}</div>
          </div>
        </van-cell>
      </van-panel>
    </div>
    <div>
      <van-submit-bar :price="3050" button-text="提交订单" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: undefined
    };
  },
  computed: {
    address() {
      if (this.index == undefined) {
        return this.$store.getters.AddressList[0];
      } else {
        return this.$store.getters.AddressList[this.index];
      }
    }
  },
  mounted() {
    this.index = this.$route.query.index;
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    changeAddress() {
      this.$router.push({
        path: "/addressList",
        query: {
          change: true
        }
      });
    }
  }
};
</script>

<style>
</style>