<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <carousel></carousel>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <h4>
            <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt="">
          </h4>
          <p>Hi!你好</p>
          <p>
            <nuxt-link to="/register">
              <el-button round size="medium">注册</el-button>
            </nuxt-link>
          </p>
          <p>
            <nuxt-link to="/login">
              <el-button round size="medium">登录</el-button>
            </nuxt-link>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"></div>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"></div>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downloadapp">
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="二维码">
          <p>APP手机版</p>
          <h4><span class="red">1元起</span>吃喝玩乐</h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Carousel from './Carousel'
export default {
  name: 'Life',
  components: {
    Carousel
  }
}
</script>
<style lang="scss">
  @import '@/assets/css/index/life.scss';
</style>