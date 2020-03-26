// 首页页面接口
import Router from 'koa-router'// 路由
import axios from './utils/axios' // 请求

//路由前缀
let router = new Router({
  prefix: '/geo'
})

const sign = 'b735ab0b3e46d12ec07336ec5195a95f';
// 获取地理位置
router.get('/getPosition', async (ctx) => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  }else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取菜单信息
router.get('/menu', async (ctx) => {
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
		ctx.body = {
			menu: []
		}
	}
})
// 获取省份信息
router.get('/province', async (ctx) => {
	let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`);

	if (status === 200) {
		ctx.body = {
			province
		}
	} else {
		ctx.body = {
			menu: []
		}
	}
})

// 获取省份对应城市
router.get('/province/:id', async (ctx) => {
	let { status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`);

	if (status === 200) {
		ctx.body = {
			city
		}
	} else {
		ctx.body = {
			city: []
		}
	}
})

// 获取全部城市
router.get('/city', async (ctx) => {
	let { status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);

	if (status === 200) {
		ctx.body = {
			city
		}
	} else {
		ctx.body = {
			city: []
		}
	}
})

// 获取热门城市
router.get('/hotCity', async (ctx) => {
	let { status, data: {hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);

	if (status === 200) {
		ctx.body = {
			hots
		}
	} else {
		ctx.body = {
			hots: []
		}
	}
})
export default router;