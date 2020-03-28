const axios = require('axios');
const qs = require('qs');
const { URL } = require('../config/config');

export default class HTTP {
	axiosPost (options) {
		console.log('进来了吗')
		axios({
			url: URL.API_BASE_URL + options.url,
			method: 'POST',
			data: options.data
		}).then((res) => {
			options.success(res);
		}).catch((err) => {
			options.error(err);
		})
	}
	axiosGet (options) {
		let url = URL.API_BASE_URL + options.url;
		if (options.data) {
			url += "?"+ qs.stringify(options.data);
		}
		axios(url)
		.then((res) => {
			options.success(res);
		}).catch((err) => {
			options.error(err);
		})
	}
}