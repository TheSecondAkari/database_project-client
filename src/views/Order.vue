<template>
  <div style="background: gray">
    <div style="margin: 2.5%;">
      <van-panel title="收货地址">
        <van-cell title="单元格" is-link center @click="changeAddress"/>
      </van-panel>
    </div>
    <div>
      <van-submit-bar :price="3050" button-text="提交订单"/>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        changeAddress(){
            this.$router.push({
                path: "/addressList",
                query: {
                    change: true
                }
            })
        }
    }
};
</script>

<style>
</style>