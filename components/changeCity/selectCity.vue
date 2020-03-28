<template>
  <div class="m-selectCity">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
    <el-option
      v-for="item in province"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="cvalue"  :disabled="!pvalue" placeholder="城市" @change="handleCityClick(city)">
    <el-option
      v-for="item in city"
      :key="item.label"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  <span class="search">直接搜索：</span>
  <el-autocomplete
    v-model="input"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入城市中文或拼音"
    @select="handleSelect"
  ></el-autocomplete>
  </div>
</template>

<script>
import _ from'lodash'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
import { URL } from '@/config/config'
export default {
  name: 'SelectCity',
  data() {
    return {
      pvalue: '',
      province: [],
      city: [],
      cvalue: '',
      input: '',
      allCities: []
    }
  },
  mounted() {
   this.getProvinceDatas();
  },
  watch: {
    pvalue (newVal, oldVal) {
      this.cvalue = '';
      console.log(newVal)
      this.getCityDatas(newVal);
    },
    cityName () {}
  },
  computed: {
    cityName () {
      return this.city.filter(item => item.value === this.cvalue)[0]
    },
    provinceName () {
      return this.province.filter(item => item.value === this.pvalue)[0]
    }
  },
  methods: {
    // 获取所有省份信息
    async getProvinceDatas () {
      let { status, data: {province}} = await this.$axios.get(URL.API_BASE_URL + '/geo/province');
      if (status === 200) {
      	this.province = province.map(item => {
      		return {
      			value: item.id,
      			label: item.name
      		}
        })
      }
    },
    // 获取省份对应城市信息
    async getCityDatas (newVal) {
      let {status, data: {city}} = await this.$axios.get(URL.API_BASE_URL + `/geo/province/${newVal}`);
      if (status === 200) {
        this.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    // 关键字搜索城市
    /*
    * query：关键字
    * cb：回调函数
    */
    querySearchAsync: _.debounce ( async function(query, cb) {
      let _self = this;
      if (this.allCities.length) {
        cb(_self.allCities.filter((item) => item.value.indexOf(query) != -1));
      }else {
        let {status, data: {city}} = await _self.$axios.get(URL.API_BASE_URL + '/geo/city');
        if (status === 200) {
          _self.allCities = city.map(item => {
            return {
              value: item.name,
              label: item.province
            }
          });
          cb(_self.allCities.filter((item) => item.value.indexOf(query) != -1));
        } else {
					cb([]);
				}
      }
    },300),
    handleCityClick () {
      this.updataStoreData(this.cityName.label, this.provinceName.label);
    },
    //直接搜索框
    handleSelect (item) {
      this.updataStoreData(item.value, item.label);
    },
    // 更新store数据
    async updataStoreData (cityVal, provinceVal) {
      let data = [];
      data.push({
        city: cityVal,
        province: provinceVal
      })
      this.$store.commit('geo/setPosition', data[0]);
      this.$cookies.set('city', data[0].city);
      this.$cookies.set('province', data[0].province);
      
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
@import "@/assets/css/changeCity/selectCity.scss";
</style>