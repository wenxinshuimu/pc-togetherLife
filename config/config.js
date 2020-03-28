const URL = {
  API_BASE_URL: process.env.NODE_ENV === 'production'
                                        ? 'http://mpc.weixiaolu.cn'
                                        : 'http://localhost:3000'
}
export {
  URL
}