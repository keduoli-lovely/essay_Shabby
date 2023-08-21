import http from '../http/http.js'

export const useroutline = (id) => {
	return http({
		url: '/login/outline',
		method: 'POST',
		data: {
			id
		}
	})
}