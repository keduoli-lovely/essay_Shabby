import http from '../http/http.js'

// 发送评论
export let postreply = (data) => {
	return http({
		url: '/reply',
		method: 'post',
		data
	})
}

// 获取评论
export let getreply = (id) => {
	return http({
		url: `/reply?id=${id}`,
	})
}

// 时间排序
export let getreplytime = (id) => {
	return http({
		url: `/reply/time?id=${id}`
	})
}