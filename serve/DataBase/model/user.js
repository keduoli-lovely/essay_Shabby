const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
	Account: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: [String, Number],
		required: true
	},
	age: {
		type: Number,
		default: 0
	},
	sex: {
		type: String,
		enum: ['男', '女', '未知'],
		default: '未知'
	},
	root: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		required: true
	},
	pic: {
		type: String,
		default: 'http://127.0.0.1:3000/default.png'
	}
})

let usermodel = mongoose.model('users', userSchema)

module.exports = usermodel