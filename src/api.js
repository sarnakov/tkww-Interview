import axios from 'axios';

const API = {
	getProduct: function () {
		return axios.get(
			'https://qa-registry-interview-api.regsvcs.theknot.com/products',
		);
	},
};

export default API;
