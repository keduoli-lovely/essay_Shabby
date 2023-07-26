import http from '../http/http.js'

export const keyword = (key) => {
	return http({
		url: '/list/keyword',
		params: {
			key
		}
	})
}