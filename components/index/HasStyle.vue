<template>
  <section class="m-has-style" @mouseover="handleOver">
    <dl>
      <dt>有格调</dt>
      <dd :class="{active: kind == 'all'}" kind='all' keyword='景点'>全部</dd>
      <dd :class="{active: kind == 'date'}" kind='date' keyword='美食'>约会聚餐</dd>
      <dd :class="{active: kind == 'spa'}" kind='spa' keyword='丽人'>丽人SPA</dd>
      <dd :class="{active: kind == 'movie'}" kind='movie' keyword='电影'>电影演出</dd>
      <dd :class="{active: kind == 'travel'}" kind='travel' keyword='旅游'>品质出游</dd>
    </dl>
    <ul class="has-style-body">
      <li v-for="(item, index) in menu" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" alt="">
          <ul class="content-body">
            <li class="title">{{item.title}}</li>
            <li class="pos"><span>{{item.pos}}</span></li>
            <li v-if="item.price > 0" class="price"><em>{{item.price}}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>

import SearchModel from '@/models/Search'

const searchModel = new SearchModel();
export default {
  name: 'HasStyle',
  data () {
    return {
      kind: 'all',
      keyword: '景点',
      list: {
        all: [],
				date: [],
				spa: [],
				movie: [],
				travel: []
      }
    }
  },
  computed: {
    menu () {
      return this.list[this.kind];
    },
    city () {
      return this.$store.state.geo.position.city.replace('市', '');
    }
  },
  mounted () {
    this.getListData(this.keyword)
  },
  methods: {
    // 鼠标滑动
     handleOver(e) {
      let tag = e.target.tagName.toLowerCase(),
          dom = e.target;
      if (tag == 'dd') {
        this.kind = dom.getAttribute('kind');
        this.keyword = dom.getAttribute('keyword');
        this.getListData(this.keyword);
      }
    },
    // 获取列表数据
    async getListData (keyword) {
      if (!this.menu.length) {
        let {status, data: {count, pois}} = await searchModel.getResultsByKeywords(keyword, this.city);
        if (status === 200 &&  count > 0) {
          let res = pois.filter((item) => item.photos.length).map((item) => {
            return {
              title: item.name,
              pos: item.type.split(';')[0],
              price: item.biz_ext.cost || '暂无',
              img: item.photos[0].url,
              url: item.website || '//aaa.com'
            }
          })
          this.list[this.kind] = res.slice(0, 15);
        }else{
          this.list[this.kind] = [];
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/index/hasStyle.scss";
</style>