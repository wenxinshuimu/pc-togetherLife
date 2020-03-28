<template>
  <div class="page-product">
    <el-row v-if="list.length && types.length && areas.length">
      <el-col :span="19">
        <crumbs :keyword="keyword"></crumbs>
        <category
          :types="types"
          :areas="areas">
        </category>
        <list :list="list" />
      </el-col>
      <el-col :span="5">
        <my-map v-if="point.length" :width="230" :height="290" :point="point"></my-map>
      </el-col>
    </el-row>
    <el-row v-else>
      <div class="no-data">
       暂无数据 
      </div>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '../components/products/crumbs'
import Category from '../components/products/category'
import List from '@/components/products/list.vue'
import MyMap from '@/components/public/map'
import SearchModel from '@/models/Search'
import CategoryModel from '@/models/Category'

const searchModel = new SearchModel();
const categoryModel = new CategoryModel();
export default {
  name: 'Product',
  data () {
    return {
			keyword: '',
			list: [],
			types: [],
			areas: [],
			point: []
    }
  },
  components: {
    Crumbs,
    Category,
    List,
    MyMap
  },
  // 异步请求数据，在服务端渲染之前拿数据，第一个参数被设定为当前页面的上下文对象
  async asyncData (ctx) {
    let keyword = ctx.query.keyword;
    let city = ctx.store.state.geo.position.city;
    // 获取关键字搜索结果
		let {status, data: {count, pois}} = await searchModel.getResultsByKeywords(keyword, city);
    // 获取城市对应数据
		let { status: status2, data: {areas, types}} = await categoryModel.getCrumbs(city);
		if ( status === 200 && count > 0 && status2 === 200) {
			return {
        // 产品列表数据
				list: pois.filter(item => item.photos.length).map(item => {
					return {
						type: item.type,
						img: item.photos[0].url,
						name: item.name,
						comment: Math.floor(Math.random() * 10000),
						rate: Number(item.biz_ext.rating),
						price: Number(item.biz_ext.cost),
						scene: item.tag,
						tel: item.tel,
						status: '可订明日',
						location: item.location,
						module: item.type.split(';')[0]
					}
				}),
        keyword,
        // 区域数据
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        // 分类数据
        types: types.filter(item => item.type !== '').slice(0, 5),
        // 地图数据
				point: (pois.find(item => item.location).location || '').split(',')
			}
		}
  }
}
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
.no-data {
  text-align: center;
  font-size: 20px;
  height: 44px;
  line-height: 44px;
}
</style>