import HTTP from '../utils/http'

 export default class CartModel extends HTTP {
  
  createCart (id, detail) {
    return new Promise ((resolve, reject) =>{
      this.axiosPost({
        url: '/cart/createCart',
        data: {
          id: id,
          detail: detail
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
  
  getCart (id) {
    return new Promise ((resolve, reject) =>{
      this.axiosPost({
        url: '/cart/getCart',
        data: {
          id: id
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
