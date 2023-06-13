import http from '../http/http.js'

export let delessay = (id) => {
	return http({
		url: '/del',
		method: 'delete',
		data: {
			id
		}
	})
}