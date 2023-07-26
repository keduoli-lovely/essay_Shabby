const jwt = require('jsonwebtoken')

module.exports = (key) => {
	console.log(key, 12345)
	const token = jwt.sign(key, 'keduoli', {
		expiresIn: 60 * 60 * 24 * 7
	})
	
	return token
}