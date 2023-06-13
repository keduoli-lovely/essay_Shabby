const express = require('express')
const listdataMOdel = require('../../DataBase/model/listdata.js')

const router = express.Router()

router.post('/', (req, res) => {
	listdataMOdel.create({
		...req.body,
		time: req.body.time || new Date(),
		text: req.body.text || '没有内容哦!'
	}).then((data) => {
		res.send({
			code: 200,
			message: '添加成功'
		})
	}).catch((err) => {
		res.send({
			code: 2000,
			message: '添加失败'
		})
	})
})

module.exports = router