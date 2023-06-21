const express = require('express')
const usermodel = require('../../DataBase/model/user.js')
const tokenFn = require('../fn/tokenFn.js')
const fs = require('fs')
const path = require('path')

const router = express.Router()


router.post('/',tokenFn, (req, res) => {
			if (!req.files || Object.keys(req.files).length === 0) {
			  return res.status(400).send('No files were uploaded.');
			}
				
			// get the file from req.files
			let binary = req.files.binary;
			let pathurl =  path.join(__dirname, '/../../public')
			// do something with the file
			fs.writeFile((pathurl +  '/' + req.files.file.md5 + req.files.file.name), req.files.file.data, (err, data) => {
			  if (err) {
				  return res.status(500).send(err)
			  }
			  
				let userpicurl = `http://127.0.0.1:3000/${req.files.file.md5}${req.files.file.name}`
			
				usermodel.findOne({Account:res.state1}).updateOne({pic: userpicurl}).then((data) => {
					res.send({
						data: {
							code: 200,
							result: {
								id: res.state1,
								picurl: userpicurl,
								message: '更新成功'
							}
						}
					})
				}).catch((err) => {
					res.status(500).send({
						data: {
							code: 500,
							message: '出错了'
						}
					})
				})
			})
	   
	})

module.exports = router