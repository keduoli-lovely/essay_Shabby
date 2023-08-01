const express = require('express')
const path = require('path')
const fs = require('fs')
const tokenFn = require('../fn/tokenFn.js')
const aboutmodel = require('../../DataBase/model/about.js')


const router = express.Router()

router.post('/',tokenFn, (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
	  return res.status(400).send('No files were uploaded.');
	}
	let binary = req.files.binary;
	let pathurl =  path.join(__dirname, '/../../public/userbg')
	let query = req.files.pic.name.split('.')[1]
	console.log(pathurl + '/' + req.files.pic.md5 + '.' + query)
	fs.writeFile((pathurl + '/' + req.files.pic.md5 + '.' + query), req.files.pic.data, (err, data) => {
	  if (err) {
		  return res.status(500).send(err)
	  }
	})
	let userpicurl = `http://127.0.0.1:3000/userbg/${req.files.pic.md5}.${query}`
	
	console.log(userpicurl)
	
	aboutmodel.findOne({userid:res.state1}).then(data => {
		console.log(res.state1)
		if(data) {
			data.updateOne({bgpic: userpicurl}).then(data2 => {
				res.send({
					code: 20040,
					message: '更换成功',
					result: data2
				})
			}).catch(err => {
				res.status(500).send('error')
			})
		}else {
			aboutmodel.create({
				userid: res.state1,
				bgpic: userpicurl
			}).then(data1 => {
				res.send({
					code: 20040,
					result: data1
				})
			}).catch(err => {
				console.log(err)
				res.status(500).send({
					message: 'error',
					code: err
				})
			})
		}
	}).catch(err => {
		console.log(err)
		res.status(500).send({
			message: 'error',
			code: err
		})
	})
})

router.get('/', tokenFn, (req, res) => {
	let { id } = req.query
	let tmp = ''
	if(id != 1) {
		tmp = id
	}else {
		tmp = res.state1
	}
	aboutmodel.findOne({userid: tmp}).then(data => {
		res.send({
			url: data.bgpic
		})
	}).catch(err => {
		console.log(err, tmp)
		res.status(500).send('error')
	})
})

module.exports = router