const express = require('express')
const tokenFn = require('../fn/tokenFn.js')
const messageModel = require('../../DataBase/model/message.js')


const router = express.Router()

router.get('/', tokenFn, (req, res) => {
	messageModel.find().then(data => {
		res.send({
			code: 200,
			result: data
		})
	}).catch(err => {
		res.status(500).send('error')
	})
})


module.exports = router