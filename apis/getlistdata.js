// 获取文章列表 --- getlistdata
// 获取按时间排序的列表 --- getlistdatatime

import http from '../http/http.js'

export let getlistdata = () => {
	return http({
		url: '/list'
	})
}

export let getlistdatatime = () => {
	return http({
		url: '/list/time'
	})
}

export let getlistdatasolt = () => {
	return http({
		url: '/list/solt'
	})
}