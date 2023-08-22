import http from '../http/http.js'

export const report = (id) => {
	return http({
		url: '/list/report',
		method: 'POST',
		data: {
			id
		}
	})
} 