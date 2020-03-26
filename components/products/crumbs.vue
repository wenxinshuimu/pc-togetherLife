<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{city}}美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{city}}{{decodeURIComponent(keyword)}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Crumbs',
  props: {
    keyword: String,
    default: ''
  },
  computed: {
    city () {
      return this.$store.state.geo.position.city.replace('市', '');
    }
  }
}
</script>