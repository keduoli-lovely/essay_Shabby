// 更改用户信息

import http from '../http/http.js'


export let changeusernameApi = ({code, data}) => {
	return http({
		url: '/login/change',
		method: 'post',
		data: {
			code,
			data
		}
	})
}