import HTTP from '../utils/http'

 export default class SearchModel extends HTTP {
  // 关键字搜索
  getResultsByKeywords (keyword, city) {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/search/resultsByKeywords',
        data: {
          keyword: keyword,
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
  //获取产品信息
  getProducts (keyword, type, city) {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/search/products',
        data: {
          keyword: keyword,
          type: type,
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
  //获取排名
  getTop (input, city) {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/search/top',
        data: {
          input: input,
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
  //获取热门搜索
  gethotSearch (city) {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/search/hotSearch',
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
