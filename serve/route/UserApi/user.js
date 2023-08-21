const express = require('express')
const usermodel = require('../../DataBase/model/user.js')
const md5 = require('md5')
const voucher = require('../fn/voucher.js')
const voucherisout = require('../fn/voucherisout.js')
const tokenFn = require('../fn/tokenFn.js')
const changelistinuserdata = require('../fn/updatauserpic.js')
const error = require('../errData/error.js')

const router = express.Router()

router.post('/', (req, res) => {

	let { Account,password } = req.body

	usermodel.findOne({ Account: Account }).then((data) => {
		if (data) {
			let pass = md5(password)
			usermodel.findOne({ password: pass }).then((data) => {
				if(data) {
					let tokendata = voucher({Account, pass})
					
					res.send({
						data: {
							code: 2000,
							message: '登入成功',
							token: tokendata,
							userinfo: data
						}
					})
				}else {
					res.send({
						data: {
							code: 20004,
							message: '密码错误'
						}
					})
				}
			}).catch((err) => {
					res.status(500).send(error)
				})
			}else {
				res.status(500).send({
					data: {
						code: 20002,
						message: '账号不存在'
					}
				})
			  }
			}).catch((err) => {
				res.status(500).send(error)
		})
	})
	
router.post('/registered', (req, res) => {
	let { name, password, Account } = req.body
	
	usermodel.findOne({Account: Account}).then((data) => {
		if(data) {
			res.send({
				data: {
					code: 2006,
					message: '该账号已被注册'
				}
			})
		}else {
			let pass = md5(password)
			usermodel.create({
				name,
				password: pass,
				Account
			}).then((data) => {
				
				let tokendata = voucher({ pass, Account })
				res.send({
					data: {
						code: 200,
						result: {
							token: tokendata,
							message: '注册成功'
						}
					}
				})
				
			}).catch((err) => {
				res.status(500).send(error)
			})
		}
	}).catch((err) => {
		res.status(500).send(error)
	})
	
})


router.get('/detail', tokenFn, (req, res) => {
		usermodel.findOne({Account: res.state1}).then((data) => {
			if(!data) return
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

router.post('/change', tokenFn, (req, res) => {
	let { code, data } = req.body
	
		usermodel.findOne({Account: res.state1}).updateOne({[code]: data}).then((data) => {
			changelistinuserdata(res.state1)
			res.send({
				data: {
					code: 2010,
					message: '更换成功'
				}
			})
		}).catch((err) => {
			res.status(500).send(error)
		})
})

router.post('/outline', tokenFn, (req, res) => {
	let { id } = req.body
	usermodel.findOne({Account: id}).then(data => {
		if(data) {
			res.send({
				code: 20020,
				message: '校验成功'
			})
		}else {
			res.status(401).send({
				code: 20041,
				message: '账号被删除'
			})
		}
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20050,
			message: '出错了'
		})
	})
})

module.exports = router