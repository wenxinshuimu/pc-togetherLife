<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您<span class="username">{{user}}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </template>
  </div>
</template>
<script>
import UserModel from '@/models/User'

const userModel = new UserModel();
export default {
  name: 'HeaderUser',
  data () {
    return {
      user: ''
    }
  },
  async mounted() {
    const {status, data} = await userModel.getUserData()
    if (status === 200) {
      if (data) {
        this.user = data.user;
      }
    }
  }
}
</script>