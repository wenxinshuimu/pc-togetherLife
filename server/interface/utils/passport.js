import passport from 'koa-passport'
import LocalStrategy from 'passport-local' // 本地策略
import UserModel from '../../dbs/models/users'
// 验证用异步方式
passport.use(new LocalStrategy(async function(username, password, done) {
  let where = {
    username
  }
  // 异步查询用户数据
  let res = await UserModel.findOne(where);

  if (res != null) {
    if (res.password === password) {
      return done(null, res);
    }else {
      return done(null, false, '密码错误');
    }
  }else {
    return done(null, false, '用户不存在');
  }

}))
  // 用户序列化，保存到session
  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  // 从session拿到数据，反序列化
  passport.deserializeUser(function(user, done) {
    return done(null, user);
  })
  
  module.exports = passport;