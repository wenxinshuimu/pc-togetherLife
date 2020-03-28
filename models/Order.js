import HTTP from '../utils/http'

 export default class OrderModel extends HTTP {
  
  getOrders () {
    return new Promise ((resolve, reject) =>{
      this.axiosPost({
        url: '/order/getOrders',
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
  
  createOrder (count, price, id) {
    return new Promise ((resolve, reject) =>{
      this.axiosPost({
        url: '/order/createOrder',
        data: {
          count: count,
          price: price,
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
