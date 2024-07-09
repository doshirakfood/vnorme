import axios from 'axios'

const client = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
})

export const makeRequest = ({
	url,
	method = 'get',
	data = {},
	headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}) => {
	return client({ url, method, data, headers })
}
