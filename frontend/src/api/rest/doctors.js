import { makeRequest } from '@api/requests'

export default class ApiDoctors {
	static async getAll(q = '', limit = 20) {
		return makeRequest({
			url: `/users?_limit=${limit}&q=${q}`,
			method: 'GET',
		})
			.then((response) => response.data)
			.catch((error) => error)
	}

	static async getSingle(number) {
		return makeRequest({
			url: `/users/${number}`,
			method: 'GET',
		})
			.then((response) => response.data)
			.catch((error) => error)
	}
}
