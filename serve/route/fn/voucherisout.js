const jwt = require('jsonwebtoken')


module.exports = (key) => {
	if(!key) {
		return -1
	}
	let tmp = jwt.verify(key, 'keduoli', (err, data) => {
		if(err) {
			return -1
		}else {
			return data
		}
		
	})
	
	return tmp
}