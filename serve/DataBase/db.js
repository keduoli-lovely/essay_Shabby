const mongoose = require('mongoose')
const { DBHOST, DBPORT, DBNAME } = require('./config.js')

mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

const dbfn = (success, error) => {
	if(typeof error !== 'function') {
		error = () => {
			console.log('error')
			return
		}
	}
	mongoose.connection.once('open', () => {
		success()
	})
	
	mongoose.connection.on('error', () => {
		error()
	})
	
	mongoose.connection.on('close', () => {
		console.log('close')
	})
}

module.exports = dbfn