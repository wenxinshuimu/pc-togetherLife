import HTTP from '../utils/http'

 export default class GeoModel extends HTTP {
  getCity () {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/geo/city',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  getPosition () {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/geo/getPosition',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  getMenu () {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/geo/menu',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  getProvince () {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/geo/province',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  getProvinceById (cityId) {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: `/geo/province/${cityId}`,
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  getHotCity () {
    return new Promise ((resolve, reject) =>{
      this.axiosGet({
        url: '/geo/hotCity',
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