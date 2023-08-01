import http from '../http/http.js'

export const sendpic = (data) => {
	return http({
		method: 'POST',
		url: '/pic',
		data,
		headers: { 
			'content-type': 'multipart/form-data' ,
		},
		
	})
}

export const getpicurl = (id=1) => {
	return http({
		url: `/pic?id=${id}`
	})
}