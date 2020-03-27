const HOST = process.env.HOST;

module.exports = {
	isDev: HOST ===  'http://localhost:3000',
	isPrd: HOST === 'http://mpc.weixiaolu.cn'
}