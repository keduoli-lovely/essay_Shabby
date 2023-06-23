const mongoose = require('mongoose')

let listdataSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
	},
	text: {
		type: [String, Number],
		required: true
	},
	user: {
		type: Object,
		required: true
	},
	time: {
		type: Date,
		required: true
	},
	star: {
		type: Array,
		default: []
	},
	live: [
		{
			userid: {
				type: String,
			},
			time: {
				type: Date,
				default: new Date()
			}
			
		}
	],
	geiv: {
		type: Number,
		default: 0
	},
	essaypics: []

})

let listdataMOdel = mongoose.model('listdata', listdataSchema)

module.exports = listdataMOdel