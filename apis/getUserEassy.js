// 获取用户发布的文章

import http from '../http/http.js'

export let getuserEassyData = (id) => {
	return http({
		url: `/list/find`,
		params: {
			id
		}
	})
}