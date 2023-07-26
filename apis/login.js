// 登入和注册

import http from '../http/http.js'

export let login = (data) => {
	return http({
		url: '/login',
		method: 'post',
		data
	})
}

export let registered = (data) => {
	return http({
		url: '/login/registered',
		method: 'post',
		data
	})
}