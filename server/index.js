// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose';  // 数据来源
import bodyParser from 'koa-bodyparser'; // 处理post请求
import session from 'koa-generic-session'; // 用户数据保存在session
import Redis from 'koa-redis';
import json from 'koa-json' // 美化json
import dbConfig from './dbs/config' // 数据库配置
import passport from './interface/utils/passport' // 验证配置
import users from './interface/users' // 用户接口
import geo from './interface/geo' // 首页接口
import search from './interface/search' // 搜索接口
import category from './interface/category' // 产品接口
import cart from './interface/cart' // 购物车接口
import order from './interface/order' // 订单接口
const app = new Koa()
app.keys = ['some secret hurr']; // 将 cookie 的内容通过密钥进行加密
app.proxy = true; // 代理头字段

// session 保存形式
app.use(session({
  key: 'meituan',
  prefix: 'meituan:uid',
  store: new Redis()
}))
// 处理扩展类型
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))

// json 美化
app.use(json()); 

// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// 登录验证
app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server
  console.log('port', port);
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 路由设置
  app.use(users.routes()).use(users.allowedMethods());
  app.use(geo.routes()).use(geo.allowedMethods());
  app.use(search.routes()).use(search.allowedMethods());
  app.use(category.routes()).use(category.allowedMethods());
  app.use(cart.routes()).use(cart.allowedMethods());
  app.use(order.routes()).use(order.allowedMethods());
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
