<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd 
        v-for="item in hotList" 
        :key="item.id"
        @click="handleCityClick(item)">
        {{item.name === '市辖区' ? item.province : item.name}}
      </dd>
    </dl>
  </div>
</template>
<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import {mapMutations,mapActions}from 'vuex'
import { URL } from '@/config/config'
Vue.use(VueCookies);
import SearchModel from '@/models/Search'
import GeoModel from '@/models/Geo'
const geoModel = new GeoModel();

const searchModel = new SearchModel();
export default {
  name: 'HotCity',
  data () {
    return {
      hotList: []
    }
  },
  mounted () {
    this.getHotCity()
  },
  methods: {
    // 获取热门省市
    async getHotCity () {
      let {status, data: {hots}} = await geoModel.getHotCity();
      if (status === 200) {
        this.hotList = hots;
      }
    },
    // ...mapMutations('模块名',['导出的方法名称']),
    ...mapMutations ('geo',['setPosition']),
    // ...mapActions ('home',['setHotSearch']),
    //...mapMutations('geo',['setPosition']),
    // 更改城市
    async handleCityClick (item) {
      let data = [],
          _self = this;
      data.push({
        city: item.name === '市辖区' ? item.province : item.name,
        province: item.province
      })
      this.setPosition(data[0]);
      this.$cookies.set('city', data[0].city);
      this.$cookies.set('province', data[0].province);
      
      
      // 获取热门搜索数据
      const {status: hotSearchStatus, data: {result}} = await searchModel.gethotSearch(_self.$store.state.geo.position.city.replace('市', ''));
      _self.$store.commit('home/setHotSearch', hotSearchStatus === 200 ? result : []);
      _self.$router.push('/');
    },
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/changeCity/hotCity.scss";
</style>