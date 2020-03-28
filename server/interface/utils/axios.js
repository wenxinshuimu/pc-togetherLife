// import axios from 'axios'
// // axios 初始化配置
// const axiosIns = axios.create({
//   // 配置地址和超时时间
//   baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3002}`,
//   timeout: 1000
// })

// export default axiosIns
const axios = require('axios');
const env = require('../../../config/env');

const isPrd = env.isPrd;
console.log('isPrd', isPrd)
const axiosIns = axios.create({
	baseURL:'http://mpc.weixiaolu.cn',//`http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
	timeout: 1000,
	headers: {'X-Custom-Header': 'foobar'}
})

console.log('host',  isPrd, process.env.NODE_ENV)
module.exports = axiosIns;