const express = require('express')
const listdataMOdel = require('../../DataBase/model/listdata.js')
const usermodel = require('../../DataBase/model/user.js')
const voucherisout = require('../fn/voucherisout.js')
const tokenFn = require('../fn/tokenFn.js')
const error = require('../errData/error.js')

const router = express.Router()

router.get('/', (req, res) => {
	let { limit = 15 } = req.query
	listdataMOdel.find().limit(limit).then((list) => {
		res.send({
			data: {
				code: 200,
				result: list
			}
		})
	}).catch((err) => {
		res.send({
			code: 404,
			message: 'error'
		})
	})
	
})

router.get('/time', (req, res) => {
	let { limit = 15 } = req.query
	listdataMOdel.find().sort({time: -1}).limit(limit).exec().then((data) => {
		res.send({
			data: {
				code: 200,
				result: data
			}
		})
	}).catch((err) => {
		res.status(500).send(error)
	})
})

router.get('/find', tokenFn, (req, res) => {
		listdataMOdel.find({user_id: req.query.id}).sort({time: -1}).exec().then((data) => {
			listdataMOdel.find({"live.userid": req.query.id}).sort({time: -1}).exec().then(data1 => {
				res.send({
					data: {
						code: 200,
						result: {
							send: data,
							live: data1
						}
					}
				})			
			
			}).catch(err => {
				console.log(err, 1233)
				res.status(500).send(error)
			})
				
		}).catch((err) => {
			console.log(err, 222)
			res.status(500).send(error)
		})
	
})

router.post('/star', tokenFn, (req, res) => {
		listdataMOdel.findOne({_id: req.body.id}).then((data) => {
			let is_live = false
			if(data.live.length <= 0) {
				data.live.unshift({
					userid: res.state1,
					time: new Date()
				})
				is_live = true
			}else {
				data.live = [...new Set(data.live)]
				data.live.forEach((item, i) => {
					if(item.userid == res.state1) {
						data.live.splice(i ,1)
					}else {
						data.live.unshift({
							userid: res.state1,
							time: new Date()
						})
						is_live = true
					}
				})
			}
			res.count = [...new Set(data.live)]
			listdataMOdel.findOne({_id: req.body.id}).updateOne({live: res.count}).then((data) => {
				res.status(201).send({
					data: {
						code: 201,
						message: '操作成功',
						state: is_live,
						count:  res.count
					}
				})
			}).catch((err) => {
				console.log(err)
				res.status(500).send(error)
			})
			
		}).catch((err) => {
			console.log(err)
			res.status(500).send(error)
		})
})

router.get('/solt', (req, res) => {
	let { limit = 15 } = req.query
	listdataMOdel.find().sort({live: -1}).limit(limit).exec().then((data) => {
		res.send({
			data: {
				code: 200,
				result: data
			}
		})
	}).catch((err) => {
		res.status(500).send(error)
	})
})

router.get('/row', (req, res) => {
	let { id } = req.query
	
	listdataMOdel.findOne({_id: id}).then(data => {
		res.send({
			data: {
				code: 200,
				result: data
			}
		})
	}).catch( err => {
		res.status(500).send(error)
	})
})

router.get('/keyword', (req, res) => {
	let keyword = req.query.key
	let reg = new RegExp(keyword, 'i')
	let filter = {
		$or: [
			{title: reg},
			{text: reg}
		]
	}
	listdataMOdel.find(filter).exec().then(data => {
		res.send(data)
	}).catch(err => {
		console.log(err)
		res.status(500).send(error)
	})
})

module.exports = router