const mongoose = require('mongoose')

let aboutSchema = new mongoose.Schema({
	userid: {
		unique: true,
		type: String,
		required: true
	},
	bgpic: {
		type: String,
	}
})

let aboutmodel = mongoose.model('abouts', aboutSchema)

module.exports = aboutmodel
