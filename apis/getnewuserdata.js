// 获取用户最新的数据
// 在更改用户数据后调用

import http from '../http/http.js'

export let getnewuserdata = (id) => {
	return http({
		url: `/login/detail`
	})
}