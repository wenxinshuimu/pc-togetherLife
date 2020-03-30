<template>
  <div>
    <el-container class="layout-default">
      <el-header height=197px>
        <public-header />
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <el-footer height="auto">
        <!-- <public-footer></public-footer> -->
      </el-footer>
    </el-container>
  </div>
</template>
<script>

import PublicHeader from '../components/public/header/Index'
import PublicFooter from '../components/public/footer/Index'
export default {
  components: {
    PublicHeader,
    PublicFooter
  }
}
</script>
<style>

</style>
