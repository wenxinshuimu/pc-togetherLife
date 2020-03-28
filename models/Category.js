import HTTP from '../utils/http'

 export default class CategoryModel extends HTTP {
  // 获取城市对应数据
  getCrumbs (city) {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/category/crumbs',
        data: {
          city: city
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
