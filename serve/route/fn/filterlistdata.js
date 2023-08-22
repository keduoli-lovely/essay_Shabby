const filterFn = (array) => {
	let show = array.filter(item => {
		return item.state != 0
	})
	return show
}

module.exports = filterFn