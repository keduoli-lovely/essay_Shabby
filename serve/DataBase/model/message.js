const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	sender: {
		type: String,
		required: true
	},
	receiver: {
		type: String,
		required: true
	},
	receiverModel: {
		type: String,
		enum: ['user', 'userall'],
		required: true
	},
	type: {
		type: String,
		enum: ['text', 'image', 'emoji', 'file'],
		default: 'text',
	},
	time: {
		type: Date,
		default: Date.now
	}
})


let messageModel = mongoose.model('messages', messageSchema)


module.exports = messageModel