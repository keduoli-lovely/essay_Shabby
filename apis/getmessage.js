import http from '../http/http.js'

export const getmessages = () => {
	return http({
		url: '/message'
	})
}