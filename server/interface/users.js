// 用户接口
import Router from 'koa-router'// 路由
import Redis from 'koa-redis' // 验证码与用户验证标识
import nodeMailer from 'nodemailer' // 向用户发送邮件
import User from '../dbs/models/users' // 用户模型
import Passport from './utils/passport' // 验证工具
import EmailConfig from '../dbs/config' // 邮箱验证
import axios from './utils/axios' // 请求
//路由前缀
let router = new Router({
  prefix: '/users'
})

// 获取redis客户端
let Store = new Redis().client;

// 用户注册
router.post('/signup', async (ctx) => {
  // 解构赋值
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;
  // 验证验证码
  if (code) {
    // 拿到redis里面的用户验证码,过期时间 验证是否正确
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code');
    const saveExpireTime = await Store.hget(`nodemail: ${username}`, 'expire'); // key field
    if (code === saveCode) {
      if (new Date().getTime() - saveExpireTime > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    }else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  }else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // 查找用户
  let user = await User.find({
    username
  })

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户已存在'
    }
    return false;
  }
  // 添加用户
  let addNewUser = await User.create({
    username,
    password,
    email
  })
  // 添加用户成功
  if (addNewUser) {
    // 登录
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    }else{
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  }else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})


// 用户登录
router.post('/signin', async (ctx, next) => {
  // 登录校验
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    }else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user);
      }else {
        ctx.body = {
          code: 1,
          msg: info //异常信息
        }
      }
    }
  })(ctx, next)
})

// 检验验证码
router.post('/verify', async (ctx, next) => {
  console.log('进来了');
  let username = ctx.request.body.username; // 获取用户名
  const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire') // key field

  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内只能请求一次'
    }
    return false;
  }
  // nodemail 发送邮箱功能配置
  let transporter = nodeMailer.createTransport({
    host: EmailConfig.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: EmailConfig.smtp.user,
      pass: EmailConfig.smtp.pass
    }
  })

  // 发送信息配置
  let recvInfo = {
    code: EmailConfig.smtp.code(),
    expire: EmailConfig.smtp.expire(),
    email: ctx.request.body.email, //用户邮箱
    user: ctx.request.body.username  //用户名称
  }
  // 发送模板配置
  let mailOptions = {
    from: `"认证邮件" <${EmailConfig.smtp.user}>`,
    to: recvInfo.email,
    subject: '注册码',
    html: `您申请的注册码是 ${recvInfo.code}`
  }
  // nodemail发送邮件
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error')
    }else{
      console.log(mailOptions)
      console.log('11111')
      // 存储信息到redis中
      Store.hmset(`nodemail: ${recvInfo.user}`, 'code', recvInfo.code, 'expire', recvInfo.expire, 'email', recvInfo.eamil)
    }
  });
  ctx.body = {
    code: 0,
    msg: '验证码已发送，有效时间一分钟'
  }
})

// 获取用户名
router.get('/exit', async (ctx, next) => {
  await ctx.logout();
  // 验证状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  }else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx, next) => {
  // 验证登录状态
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    }
  }else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router;
