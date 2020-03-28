<template>
  <div>
    <dl class="m-category">
      <dt>按拼音首字母选择：</dt>
      <dd  v-for="item in letterList" :key="item.title">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in detailList" :key="item.title" class="m-category-section">
      <dt :id="'city-' + item.title">{{item.title}}</dt>
      <dd>
        <span 
        v-for="(item,index) in item.cities" 
        :key="index" 
        @click="handleCityClick(item)">{{item.city}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
import jspy from 'js-pinyin';
import { URL } from '@/config/config'
export default {
  name: 'CategoryCity',
  data () {
    return {
      letterList: [],
      detailList: []
    }
  },
  mounted() {
    // console.log(this.list);
    this.getCitiesData();
  },
  methods: {
    // 获取全部城市信息
    async getCitiesData () {
      let {status, data: {city}} = await this.$axios.get(URL.API_BASE_URL + '/geo/city');
      let firstLetter;
      let letterPos;
      let temp = {};
      city.forEach(elem => {
        // 城市中文转拼音，并且截取第一位
        firstLetter = jspy.getFullChars(elem.name).toLocaleLowerCase().slice(0,1);
        letterPos = firstLetter.charCodeAt(0);
        if (letterPos > 96 && letterPos < 123) {
          if (!temp[firstLetter]) {
            temp[firstLetter] = [];
          }
          temp[firstLetter].push({
            province: elem.province,
            city:elem.name
          });
          
        }
      });
      // 城市数据转化成键值对
      for (const [key, value] of Object.entries(temp)) {
        this.detailList.push({
          title: key.toUpperCase(),
          cities: value
        })
        this.letterList.push(key.toUpperCase());
      }
      // 字母排序
      this.detailList.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      this.letterList.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    },
    async handleCityClick (item) {
      this.$store.commit('geo/setPosition', item);
      this.$cookies.set('city', item.city);
      this.$cookies.set('province', item.province);
      
      // 获取热门搜索数据
      const {status: hotSearchStatus, data: {result}} = await this.$axios.get(URL.API_BASE_URL + '/search/hotSearch', {
        params: {
          city: this.$store.state.geo.position.city.replace('市', '')
        }
      });
      this.$store.commit('home/setHotSearch', hotSearchStatus === 200 ? result : []);
      this.$router.push('/');
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/changeCity/category.scss";
</style>