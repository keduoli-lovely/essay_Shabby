
const Monthmodel = require('../../DataBase/model/new_users_per_month.js')

const fn = (data, key, num) => {
			if (key) {
				if (num == 1) {
					data.user = data.user + 1
				} else {
					data.user = data.user <= 0 ? 0 : data.user - 1
				}
				return data
			} else {
				if (num == 1) {
					data.essay = data.essay + 1
				} else {
					data.essay = data.essay <= 0 ? 0 : data.essay - 1
				}
				return data
			}
	}

const statistics = (key, num) => {
	let this_month = (new Date()).getMonth()
	
	Monthmodel.findOne({
		index: this_month
	}).then(data => {
		if(data) {
			let filer = fn(data, key, num)
			filer.save().then(data => {
				console.log(data)
			}).catch(err => {
				console.log(err)
			})

		} else {
			let x = 0
			let y = 0
			if(key) {
				x = x + 1
			}
			else {
				y = y + 1
			}
			Monthmodel.create({
				month: (this_month + 1) + '月',
				index: this_month,
				essay: y,
				user: x
			})
		}
	})

}

module.exports = statistics