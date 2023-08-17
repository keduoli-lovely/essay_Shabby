const mongoose = require('mongoose')

let rootSchema = new mongoose.Schema({
	username: {
		type: String,
		default: 'root'
	},
	pic: {
		type: String
	},
	newadd: {
		type: Number
	},
	newessay: {
		type: Number
	},
	alladd: {
		type: Number
	},
	allessay: {
		type: Number
	},
	map: []
})

let rootmodel = mongoose.model('rootdatas', rootSchema)

module.exports = rootmodel