import http from '../http/http.js'

export const finddata = (id) => {
	return http({
		url: `/find?id=${id}`
	})
}