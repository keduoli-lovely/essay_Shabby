const listdataMOdel = require('../../DataBase/model/listdata.js')
const usermodel = require('../../DataBase/model/user.js')


module.exports = (userid) => {
	usermodel.find({Account: userid}).then((data) => {
		if(data) {
			listdataMOdel.find({user_id: userid}).updateMany({
				user: {
					name: data[0].name,
					pic: data[0].pic
				}
			}).then((data) => {
				return true
				
			}).catch((err) => {
				return false
			})
		}
	}).catch((err) => {
		return false
	})
	// listdataMOdel.find({user_id: userid}).updateMany({})
	}