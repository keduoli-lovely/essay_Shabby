const express = require('express')
const listdataMOdel = require('../../DataBase/model/listdata.js')
const tokenFn = require('../fn/tokenFn.js')
const fs = require('fs')
const path = require('path')

const router = express.Router()

let pic_list = []

router.post('/',tokenFn , (req, res) => {  
	listdataMOdel.create({
		...req.body,
		time: req.body.time || new Date(),
		text: req.body.text || '没有内容哦!',
		essaypics: [...new Set(pic_list)]
	}).then((data) => {
		pic_list = []
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

router.post('/pic', tokenFn, (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
	  return res.status(400).send('No files were uploaded.');
	}
	let binary = req.files.binary;
	let pathurl =  path.join(__dirname, '/../../public/essay')
	
	fs.writeFile((pathurl +  '/' + req.files.file.md5 + req.files.file.name), req.files.file.data, (err, data) => {
	  if (err) {
		  return res.status(500).send(err)
	  }
	let userpicurl = `http://127.0.0.1:3000/essay/${req.files.file.md5}${req.files.file.name}` 
	
	pic_list.push(userpicurl)
	
	res.send(pic_list)
	
	})
})

module.exports = router