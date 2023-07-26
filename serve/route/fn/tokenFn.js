const voucherisout = require('./voucherisout.js')

module.exports = (req, res, next) => {
	let state = voucherisout(req.get('token'))
	if(state == -1) {
		res.status(401).send({
			data: {
				code: 401,
				message: 'token校验失败!'
			}
		})
		return
	}else {
		res.state1 = state.Account
		next()
	}	
}