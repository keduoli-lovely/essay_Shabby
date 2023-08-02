const express = require('express')
const usermodel = require('../../DataBase/model/user.js')
const listdata = require('../../DataBase/model/listdata.js')


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

router.get('/eassy', (req, res) => {
	let { id } = req.query
	listdata.find({user_id: id}).then(data => {
		console.log(id, data)
		if(data) {
			res.send({
				code: 20040,
				result: {
					userid: data.user_id,
					star: data.star,
					geiv: data.geiv,
					live: data.live
				}
			})
		}else {
			res.send({
				code: 20040,
				result: {}
			})
		}
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20050,
			message: 'error'
		})
	})
})

module.exports = router