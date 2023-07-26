const usermodel = require('../../DataBase/model/user.js')

module.exports = (req, res, next) => {
	let key = req.get('token')
	if(!key) {
		res.redirect('http://localhost:5173/#/pages/login/login')
	}
	let { Account } = voucherisout(key)
	usermodel.findOne({ Account }).then((data) => {
		if(data) {
			res.send({
				data: {
					code: 200,
					result: data
				}
			})
			next()
		}else {
			res.redirect('http://localhost:5173/#/pages/login/login')
		}
	}).catch((err) => {
		res.send({
			data: {
				code: 500,
				message: '出错了'
			}
		})
	})
	return
}