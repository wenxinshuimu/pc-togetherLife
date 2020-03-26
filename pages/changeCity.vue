<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <select-city></select-city>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city></hot-city>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category-city></category-city>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SelectCity from '../components/changeCity/selectCity'
import HotCity from '../components/changeCity/hotCity'
import CategoryCity from '../components/changeCity/category'
export default {
  name: 'ChangeCity',
  components: {
    SelectCity,
    HotCity,
    CategoryCity
  },
}
</script>