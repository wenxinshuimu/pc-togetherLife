const axios = require('axios');
const { URL } = require('@config/config');

export default class HTTP {
	axiosPost (options) {
		axios({
			url: URL.API_BASE_URL + options.url,
			methods: 'post',
			data: options.data
		}).then((res) => {
			options.success(res);
		}).catch((err) => {
			options.error(err);
		})
	}
	axiosGet (options) {
		axios(URL.API_BASE_URL + options.url)
		.then((res) => {
			options.success(res);
		}).catch((err) => {
			options.error(err);
		})
	}
}