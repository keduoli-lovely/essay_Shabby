const express = require('express')
const tokenFn = require('../fn/tokenFn.js')
const error = require('../errData/error.js')
const listdataMOdel = require('../../DataBase/model/listdata.js')
const appraisemodel = require('../../DataBase/model/appraise.js')
const statistics = require('../fn/monthlyNewUsers.js')

const router = express.Router()

router.delete('/', tokenFn, (req, res) => {
	console.log(req.body)
	let { id } = req.body
	console.log(id)
	listdataMOdel.findOne({_id: id}).then((data) => {
		if(data.user_id == res.state1) {
			data.deleteOne().then((data) => {
				appraisemodel.find({essay_id: id}).deleteOne().then((date) => {
					console.log('评论区已被删除')
				}).catch((err) => {
					res.status(500).send(error)
				})
				statistics(false, -1)
				res.send({
					data: {
						code: 200,
						message: '删除成功'
					}
				})
			}).catch((err) => {
				res.status(500).send(error)
			})
		}else {
			res.status(401).send({
				data: {
					code: 401,
					message: '信息错误'
				}
			})
		}
	}).catch((err) => {
		res.status(500).send(error)
	})
})

module.exports = router