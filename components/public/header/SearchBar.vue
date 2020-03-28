<template>
  <div class="search-panel">
    <el-row :gutter="0" class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input 
          v-model="search" 
          placeholder="搜索商家或地点" 
          @focus="handleFocus" 
          @blur="handleBlur"
          @input="handleInput"></el-input>
          <button class="el-button el-button--primary">
            <i class="el-icon-search"></i>
          </button>
          <dl class="hot-search" v-if="isShowHotSearch">
            <dt>热门搜索</dt>
            <dd 
              v-for="(item, index) in hotSearch" 
              :key="index">
              <a :href="'/product?keyword=' + encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
          <dl class="search-list" v-if="isShowListSearch">
            <dd 
              v-for="(item, index) in sourseList" 
              :key="index">
              <a :href="'/product?keyword=' + encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="'/product?keyword=' + encodeURIComponent(item.name)"
             v-for="(item, index) in hotSearch" 
             :key="index">
             {{item.name}}
          </a>
        </p>
        <ul class="nav">
          <li><nuxt-link to="order" class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link to="order" class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="order" class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link to="order" class="apartment">名宿/公寓</nuxt-link></li>
          <li><nuxt-link to="order" class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund">随时退</i></li>
          <li><i class="free">不满意免单</i></li>
          <li><i class="overdue">过期退</i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from'lodash'
import Geo from './Geo'
import User from './User'
import NavBar from './Nav'
import { URL } from '@/config/config'
export default {
  name: 'SearchBar',
  components: {
    Geo,
    User,
    NavBar
  },
  data () {
    return {
      search: '',
      isfocus: false,
      sourseList: []
    }
  },
  computed: {
    isShowHotSearch () {
      return this.isfocus && !this.search;
    },
    isShowListSearch () {
      return this.isfocus && this.search;
    },
    // 热门搜索
    hotSearch () {
      return this.$store.state.home.hotSearch.slice(0,5);
    },
    city () {
      return this.$store.state.geo.position.city.replace('市', '');
    }
  },
  methods: {
    // 获取焦点事件
    handleFocus () {
      this.isfocus = true;
    },
    // 失去焦点事件
    handleBlur () {
      let _self = this;
      setTimeout(function() {
        _self.isfocus = false;
      },200);
    },
    // 输入事件
    handleInput: _.debounce ( async function() {
      this.sourseList = [];
      let {status, data: {top}} = await this.$axios.get(URL.API_BASE_URL + '/search/top', {
        params: {
          input: this.search,
          city: this.city
        }
      });
      this.sourseList = top.slice(0,9);
    },300)
  }
}
</script>
<style lang="scss">
  @import '@/assets/css/public/layout.scss';
  @import '@/assets/css/public/header/index.scss';
</style>