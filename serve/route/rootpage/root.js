const express = require('express')
const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const usermodel = require('../../DataBase/model/user.js')
const listdataMOdel = require('../../DataBase/model/listdata.js')
const rootModel = require('../../DataBase/model/root.js')
// 生成token
const voucher = require('../fn/voucher.js')
// 校验token
const tokenFn = require('../fn/tokenFn.js')
const rootuser = require('./root.json')
const statistics = require('../fn/monthlyNewUsers.js')
const Monthmodel = require('../../DataBase/model/new_users_per_month.js')


const router = express.Router()

/*
	** rootdatas 创建一张root页面的数据库
*/



router.get('/', tokenFn, (req, res) => {
	// 获取基本数据
	Monthmodel.find().then(data => {
		res.send({
			code: 2000,
			result: {
				data
			},
			message: '获取成功'
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20050,
			message: '出错了'
		})
	})
	
})
router.get('/getadmin', tokenFn, (req, res) => {
	res.send({
		code: 20200,
		account: rootuser.admin,
		password: rootuser.password
	})
})
router.get('/hot', tokenFn, (req, res) => {
	listdataMOdel.find().sort({live: -1}).limit(3).exec().then(data => {
		res.send({
			code: 20020,
			data: data
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20050,
			message: '出错了'
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
			},
			message: '获取成功'
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
			},
			message: '获取成功'
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
				name: rootuser.name,
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
	const path_name = __dirname
	const { update_sta } = req.body
	if(update_sta === 1) {
		const { account, password } = req.body
		if(account != rootuser.admin || password != rootuser.password) {
			fs.writeFileSync(
				`${path_name}/root.json`, 
				JSON.stringify({
					name: rootuser.name,
					admin: account,
					password
				})
			);
			res.send({
				code: 20020,
				message: '修改成功'
			})
		}else {
			res.send({
				code: 20011,
				message: '账号未被修改,无法重置'
			})
		}
		
	}else {
		if("admin" != rootuser.admin && "admin" != rootuser.password) {
			fs.writeFileSync(
				`${path_name}/root.json`,
				JSON.stringify({
					name: "keduoli",
					admin: 'admin',
					password: 'admin'
				})
			);
			res.send({
				code: 20060,
				message: '重置成功'
			})
		}else {
			res.send({
				code: 20011,
				message: '账号未被修改,无法重置'
			})
		}
	}
})

router.post('/essay', tokenFn, (req, res) => {
	// 更新需要审核的文章
})

router.post('/push', tokenFn, (req, res) => {
	// 发布公告
})

router.post('/newuser', tokenFn, (req, res) => {
	let { name, account, password, sex, age, pic } = req.body
	let hassex = '男'
	switch(sex) {
		case 1:
			hassex = '男'
			break;
		case 2:
			hassex = '女'
			break;
		case 3:
			hassex = '沃尔玛购物袋'
			break;
	}
	
	usermodel.findOne({ Account: account}).then(data => {
		if(data) {
			res.send({
				code: 20040,
				message: '账号已被使用'
			})
		}else {
			statistics(true, 1)
			let pwd = md5(password)
			usermodel.create({
				name,
				Account: account,
				password: pwd,
				sex: hassex,
				age,
				pic
			}).then(data => {
				res.send({
					code: 20020,
					message: '创建成功'
				})
			}).catch(err => {
				res.status(500).send({
					code: 20050,
					message: '出错了',
					err: err
				})
			})
		}
	}).catch(err => {
		res.status(500).send({
			code: 20050,
			message: '出错了',
			err: err
		})
	})
	 
})

// 删除用户
router.post('/del', tokenFn, (req, res) => {
	let { id } = req.body
	
	if( Array.isArray(id) ) {
		// id.forEach(item => {
			usermodel.deleteMany({Account: id}).then(data => {
				statistics(true, -1)
				res.send({
					code: 20800,
					message: '删除成功'
				})
			}).catch(err => {
				console.log(err)
				res.status(500).send({
					code: 20500,
					message: '出错了'
				})
			})
		// })
	}else {
		usermodel.deleteOne({Account: id}).then(data => {
			statistics(true, -1)
			res.send({
				code: 20000,
				message: '删除成功'
			})
		}).catch(err => {
			res.status(500).send({
				code: 20400,
				message: err
			})
		})
	}
})
// 删除文章
router.post('/remove', tokenFn, (req, res) => {
	let { id } = req.body
	listdataMOdel.deleteOne({_id: id}).then(data => {
		statistics(false, -1)
		res.send({
			code: 20020,
			message: '删除成功'
		})
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			code: 20050,
			message: '出错了'
		})
	})
})

// 修改用户相关
router.post('/update/user', tokenFn, (req, res) => {
	let { index, obj } = req.body
	console.log(req.body, index, obj)
	res.send('ok')
})
// 修改文章状态
router.post('/update/essay', tokenFn, (req, res) => {
	let { index, id } = req.body
	if(index == -1) {
		listdataMOdel.deleteOne({_id: id}).then(data => {
			res.send({
				code: 20020,
				message: '删除违规文章成功'
			})
		}).catch(err => {
			res.status(500).send({
				code: 20050,
				message: '出错了'
			})
		})
	}else {
		listdataMOdel.findOne({_id: id}).updateOne({state: index}).then(data => {
			if(data) {
				res.send({
					code: 20020,
					message: '提交成功'
				})
			}else {
				res.send({
					code: 20030,
					message: '未找到用户/修改失败'
				})
			}
		}).catch(err => {
			res.status(500).send({
				code: 20050,
				message: '出错了'
			})
		})
	}
	
})

// 创建用户头像
router.post('/upload', tokenFn, (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
	  return res.status(400).send('No files were uploaded.');
	}
	
	let pathurl =  path.join(__dirname, '/../../public')
	
	let query = req.files.pic.name.split('.')[1]
	fs.writeFile((pathurl + '/' + req.files.pic.md5 + '.' + query), req.files.pic.data, (err, data) => {
	  if (err) {
		  return res.status(500).send(err)
	  }
	})
	let userpicurl = `http://127.0.0.1:3000/${req.files.pic.md5}.${query}`
	
	res.send({
		code: 20010,
		url: userpicurl,
		message: '上传成功'
	})
})

module.exports = router