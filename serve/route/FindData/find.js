const express = require('express')
const usermodel = require('../../DataBase/model/user.js')

const router = express.Router()


router.get('/', (req, res) => {
	let { id } = req.query
	usermodel.findOne({Account: id}).then(data => {
		if(data) {
			res.status(200).send({
				code: 200,
				result: {
					Account: data.Account,
					age: data.age,
					sex: data.sex,
					name: data.name,
					creareTime: data.createTime,
					root: data.root,
					_id: data._id,
					pic: data.pic
				}
			})
		}else {
			res.send({
				code: 20013,
				message: '未找到'
			})
		}
		
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			message: 'error'
		})
	})
})

module.exports = router