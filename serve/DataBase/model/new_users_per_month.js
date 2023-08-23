const mongoose = require('mongoose')

let usersperSchema = new mongoose.Schema({
	month: String,
	index: Number,
	user: Number,
	essay: Number
})

let Monthmodel = mongoose.model('users_pers', usersperSchema)


module.exports = Monthmodel
