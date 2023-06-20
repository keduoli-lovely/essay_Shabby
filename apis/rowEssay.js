import http from '../http/http.js'

export const getrowEssay = (id) => {
	return http({
		url: '/list/row',
		params: {
			id
		}
	})
}