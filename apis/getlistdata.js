// 获取文章列表 --- getlistdata
// 获取按时间排序的列表 --- getlistdatatime

import http from '../http/http.js'

export let getlistdata = (limit = 15) => {
	return http({
		url: `/list?limit=${limit}`
	})
}

export let getlistdatatime = (limit = 15) => {
	return http({
		url: `/list/time?limit=${limit}`
	})
}

export let getlistdatasolt = (limit = 15) => {
	return http({
		url: `/list/solt?limit=${limit}`
	})
}