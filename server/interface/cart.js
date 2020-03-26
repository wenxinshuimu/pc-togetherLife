const Router = require('koa-router');
const axios = require('./utils/axios');
const Cart = require('../dbs/models/cart');
const md5 = require('crypto-js/md5');

let router = new Router({
	prefix: '/cart'
})

router.post('/createCart', async (ctx) => {
	if (!ctx.isAuthenticated()) {
		ctx.body = {
			code: -1,
			msg: '请登录'
		}
	} else {
		let time = Date();
		let cartNo = md5(Math.random() * 1000 + time).toString();
		let {id, detail} = ctx.request.body;

		let cart = new Cart({
			id,
			detail,
			cartNo,
			user: ctx.session.passport.user,
			time
		})

		let result = await cart.save();

		if (result) {
			ctx.body = {
				code: 0,
				msg: '',
				id: cartNo
			}
		} else {
			ctx.body = {
				code: -1,
				msg: '操作失败'
			}
		}
	}
})

router.post('/getCart', async (ctx) => {
	let { id } = ctx.request.body;
	let result = await Cart.findOne({
		cartNo: id
	})

	if (result) {
		ctx.body = {
			code: 0,
			data: result.detail[0]
		}
	} else {
		ctx.body = {
			code: -1,
			data: {}
		}
	}
})

module.exports = router;





