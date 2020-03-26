<template>
  <div class="m-header">
    <el-row>
      <el-col><top-bar /></el-col>
    </el-row>
    <el-row>
      <el-col><search-bar /></el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from './TopBar'
import SearchBar from './SearchBar'
export default {
  name: 'MyHeader',
  components: {
    TopBar,
    SearchBar
  }
}
</script>
<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>