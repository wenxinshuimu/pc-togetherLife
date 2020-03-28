import HTTP from '../utils/http'

 export default class UserModel extends HTTP {
  // 获取用户数据
  getUserData () {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/users/getUser',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  //登录
  getSignin (name, pwd) {
    return new Promise ((resolve, reject) =>{
      this.axiosPost({
        url: '/users/signin',
        data: {
          username: name,
          password: pwd
        },
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
}
