const mongoose = require('mongoose')

let appraiseSchema = new mongoose.Schema({
	essay_id: {
		type: String,
		required: true,
		unique: true
	},
	content: [
		{
			user_id: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			pic: {
				type: String,
				required: true
			},
			text: {
				type: String,
				required: true
			},
			time: {
				type: Date,
				default: new Date()
			},
			live: {
				type: Array,
				default: []
		}
	},
	]
})

let appraisemodel = mongoose.model('apprais', appraiseSchema)

module.exports = appraisemodel