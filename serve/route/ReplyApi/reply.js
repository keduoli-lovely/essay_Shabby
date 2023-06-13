const express = require('express')
const error = require('../errData/error.js')
const tokenFn = require('../fn/tokenFn.js')
const voucherisout = require('../fn/voucherisout.js')
const appraisemodel = require('../../DataBase/model/appraise.js')

const router = express.Router()


router.post('/', tokenFn, (req, res) => {
	let { userid, essayid, text, name, pic } = req.body
	if(userid && essayid && text && name && pic) {
		appraisemodel.findOne({essay_id: essayid}).then((data) => {
			if(data) {
				data.updateOne({
					$push: {content: {
						user_id: userid,
						name,
						text,
						pic,
					}}
				}).then((data) => {
					res.status(201).send({
						data: {
							code: 201,
							message: '回复成功'
						}
					})
				}).catch((err) => {
					console.log(err)
					res.status(500).send(error)
				})
			}else {
				appraisemodel.create({
					essay_id: essayid,
					content: {
						user_id: userid,
						name,
						text,
						pic
					}
				}).then((data) => {
					res.status(201).send({
						data: {
							code: 201,
							message: '回复成功'
						}
					})
				}).catch((err) => {
					console.log(err)
					res.status(500).send(error)
				})
			}
		}).catch((err) => {
			res.status(500).send(error)
		})
	}
	
})

router.get('/', (req, res) => {
	appraisemodel.findOne({essay_id: req.query.id}).then((data) => {
		res.send({
			data: {
				code: 2020,
				result: data.content
			}
		})
	}).catch((err) => {
		res.send(error)
	})
})

// router.get('/time', (req, res) => {
// 	console.log(req.query.id)
// 	appraisemodel.findOne({essay_id: req.query.id}).sort({time: -1}).exec().then((data) => {
// 		res.send({
// 			data: {
// 				code: 200,
// 				result: data
// 				}
// 		})
// 	}).catch((err) => {
// 		res.status(500).send(err0r)
// 	})
// })

module.exports = router