// 首页页面接口
import Router from 'koa-router'// 路由
import axios from './utils/axios' // 请求

//路由前缀
let router = new Router({
  prefix: '/search'
})

const sign = 'b735ab0b3e46d12ec07336ec5195a95f';
// 获取排名
router.get('/top', async (ctx) => {
	let { status, data: {top}} = await axios.get(`http://cp-tools.cn/search/top`, {
		params: {
			input: ctx.query.input,
			city: ctx.query.city,
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			top
		}
	} else {
		ctx.body = {
			top: []
		}
	}
})

// 获取热门搜索
router.get('/hotSearch', async (ctx) => {
	let { status, data: {result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
		params: {
			city: ctx.query.city, // 路由获取
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			result
		}
	} else {
		ctx.body = {
			result: []
		}
	}
})

// 获取图文滑动搜索结果
router.get('/resultsByKeywords', async (ctx) => {
	let { status, data: {count, pois}} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
		params: {
			city: ctx.query.city,
			keyword: ctx.query.keyword,
			sign
		}
	})

	if (status === 200) {
		ctx.body = {
			count,
			pois
		}
	} else {
		ctx.body = {
			count: 0,
			pois: []
		}
	}
})

// 获取产品信息
router.get('/products', async (ctx) => {
	let keyword = ctx.query.keyword || '旅游';
	let city = ctx.query.city || '北京';
	let { status, data: {product, more}} = await axios.get('http://cp-tools.cn/search/products', {
		params: {
			keyword,
			city,
			sign
		}
	})

	if ( status === 200) {
		ctx.body = {
			product,
			more: ctx.isAuthenticated() ? more : [],
			login: ctx.isAuthenticated()
		}
	} else {
		ctx.body = {
			product: {},
			more: ctx.isAuthenticated() ? more : [],
			login: ctx.isAuthenticated()
		}
	}
})
export default router;