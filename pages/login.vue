<template>
  <div class="page-login">
    <div class="login-header">
      <a href="" class="logo"></a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="" width="480" height="370">
      </div>
      <div class="form">
        <h4 v-if="errorMsg" class="tips">
          <i>{{errorMsg}}</i>
        </h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"></el-input>
        <el-input v-model="password" prefix-icon="password" type="password"></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">7天内免费登录</el-checkbox>
          <b>忘记密码</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js';
import { URL } from '@/config/config'
export default {
  name: 'Login',
  layout: 'blank',
  data () {
    return {
      checked: '',
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    login () {
      let _self = this;
      _self.$axios.post(URL.API_BASE_URL + '/users/signin', {
        username: encodeURIComponent(_self.username),
        password: CryptoJS.MD5(_self.password).toString()
      }).then(({status, data}) => {
        if (status === 200) {
          if (data && data.code === 0) {
            location.href = '/';
          }else{
            _self.errorMsg = data.msg;
          }
          setTimeout(function(){
            _self.errorMsg = '';
          },1500)
        }
      })
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/login/index.scss"
</style>