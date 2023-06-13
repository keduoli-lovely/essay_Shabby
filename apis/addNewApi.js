//key: "value",  添加文章

import http from '../http/http.js'

export let AddNews = (obj) => {
	return http({
		url: '/add',
		method: 'post',
		data: obj
	})
}