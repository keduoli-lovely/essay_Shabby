import http from '../http/http.js'

export const finddata = (id) => {
	return http({
		url: `/find?id=${id}`
	})
}

export const findpiblic = (id) => {
	return http({
		url: `/list/find?id=${id}`
	})
}