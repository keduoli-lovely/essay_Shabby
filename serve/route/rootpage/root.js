const express = require('express')
const fs = require('fs')
const usermodel = require('../../DataBase/model/user.js')
const listdataMOdel = require('../../DataBase/model/listdata.js')
const rootModel = require('../../DataBase/model/root.js')
// 生成token
const voucher = require('../fn/voucher.js')
// 校验token
const tokenFn = require('../fn/tokenFn.js')
const rootuser = require('../../root.json')

const router = express.Router()

/*
	** rootdatas 创建一张root页面的数据库
*/



router.get('/', tokenFn, (req, res) => {
	// 获取基本数据
	rootModel.find().then(data => {
		res.send({
			code: 2000,
			result: {
				data
			}
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20040,
			message: 'error'
		})
	})
})

router.get('/essay', tokenFn, (req, res) => {
	// 获取文章
	let i
	if(req.query) {
		i = req.query
	}else {
		i = 20
	}
	listdataMOdel.find().sort({time: -1}).limit(i).exec().then(data => {
		res.send({
			code: 20000,
			result: {
				...data
			}
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20500,
			message: 'error'
		})
	})
})

router.get('/root', tokenFn, (req, res) => {
	// 获取管理员信息
})

router.get('/user', tokenFn, (req, res) => {
	// 获取所有用户
	let { limit } = req.query
	usermodel.find().sort({createTime: -1}).limit(limit).exec().then(data => {
		res.send({
			code: 2000,
			result: {
				data
			}
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20050,
			message: 'error'
		})
	})
})

router.post('/', (req, res) => {
	// 用户登录，下发token
	let { admin, pwd} = req.body
	if(admin === rootuser.admin && pwd === rootuser.password) {
		let token = voucher({ admin, pwd})
		res.send({
			code: 2000,
			result: {
				token: token,
				name: admin,
				message: '登录成功'
			}
		})
	}else {
		res.status(400).send({
			code: 20040,
			message: '账号或密码错误'
		})
	}
})

router.post('/updata', tokenFn, (req, res) => {
	// 更改管理员 --账号/密码
	fs.writeFileSync('root.json', JSON.stringify(rootuser, null, 2));
})

router.post('/essay', tokenFn, (req, res) => {
	// 更新需要审核的文章
})

router.post('/push', tokenFn, (req, res) => {
	// 发布公告
})

router.post('/del', tokenFn, (req, res) => {
	let { id } = req.body
	
	if( Array.isArray(id) ) {
		// id.forEach(item => {
			res.send({
				message: '权限不够'
			})
		// })
	}else {
		usermodel.deleteOne({Account: id}).then(data => {
			res.send({
				code: 20000,
				result: {
					data
				}
			})
		}).catch(err => {
			res.status(500).send({
				code: 20400,
				message: err
			})
		})
	}
})


module.exports = router