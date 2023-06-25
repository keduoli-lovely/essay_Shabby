const express = require('express')
const cors = require('cors')
// const formidable = require('express-formidable')
const fileUpload = require('express-fileupload');

const path = require('path')


const List = require('./route/ListApi/list.js')
const User = require('./route/UserApi/user.js')
const Home = require('./route/HomeApi/home.js')
const File = require('./route/FileApi/file.js')
const Reply = require('./route/ReplyApi/reply.js')
const Del = require('./route/DeleteEssay/del.js')
const Message = require('./route/dialogue/dialogue.js')

const Add = require('./route/add/Add.js')
const dbfn = require('./DataBase/db.js')
const voucherisout = require('./route/fn/voucherisout.js')
const verify = require('./route/fn/isloginFn.js')
const tokenFn = require('./route/fn/tokenFn.js')

const app = express()


const usermodel = require('./DataBase/model/user.js')



dbfn(() => {
	app.use(cors())
	// app.use(formidable())
	app.use(express.json()); 
	app.use(express.urlencoded({ extended:true }))
	
	// enable express-fileupload middleware
	app.use(fileUpload());
	app.use(express.static(path.join(__dirname, 'public')))
	
	
	app.use('/upload', tokenFn, File);
	app.use('/list', List)
	app.use('/login', User)
	app.use('/reply', Reply)
	app.use('/home', verify, Home)
	app.use('/add', Add)
	app.use('/del', Del)
	app.use('/message', Message)
	app.get('/', (req, res) => {
		res.send('index')
	})
	app.use((req, res) => {
		res.status(500).send('error')
	})
	
	app.listen(3000, () => {
		console.log('ok1')
	})
})