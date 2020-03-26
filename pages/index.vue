<template>
  <div class="page-index">
    <div>
      <el-row>
        <el-col :span="5">
          <side-menu></side-menu>
        </el-col>
        <el-col :span="19">
          <life></life>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <has-style></has-style>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/index/Menu'
import Life from '../components/index/Life'
import HasStyle from '../components/index/HasStyle'
import axios from 'axios'
export default {
  name: 'Index',
  components: {
    SideMenu,
    Life,
    HasStyle
  },
  mounted () {
    console.log(this.$axios);
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/index/index.scss'
</style>
