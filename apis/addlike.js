// key: "value", 为文章点赞

import http from '../http/http.js'

export let addlike = (id) => {
	return http({
		url: '/list/star',
		method: 'post',
		data: {
			id
		}
	})
}