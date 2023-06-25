const express = require('express');
const socketio = require('socket.io');
const messageModel = require('../../serve/DataBase/model/message.js')
// const usermodel = require('../..serve/DataBase/model/user.js')
const dbFn = require('../../serve/DataBase/db.js')

const app = express();


dbFn(() => {
	const server = app.listen(9000, function() {
	  console.log('Server is listening on port 9000');
	});
	
	// 创建一个socket.io实例，并绑定到server上
	const io = socketio(server, {
		cors: {
		    // 允许的来源，可以是一个字符串或一个数组
		    // origin: 'http://localhost:5173',
		    origin: '*',
		    // 是否允许携带凭证，默认为false
		    credentials: true,
		  }
	});
	
	// 监听客户端的连接事件
	io.on('connection', function(socket) {
		// let userid = socket.request.headers['userid']
	  // 打印客户端的id
		  // console.log('A client connected: ', userid);
		  console.log('连接')
	
	  // 监听客户端的断开事件
	  socket.on('disconnect', function() {
	    // 打印客户端的id
	    console.log('A client disconnected: ' + socket.id);
	  });
	
	  // 监听客户端发送消息的事件
	  socket.on('send message', function(data) {
	    // 打印收到的消息内容和发送者的id
		console.log(data)
		let { sender, receiver, content, receiverModel } = data
		
		console.log(sender, receiver, content, receiverModel, 111)
		if(sender && receiver && content && receiverModel) {
			messageModel.create({
				sender,
				receiver,
				content,
				receiverModel
			}).then(data => {
				console.log(data, 'ok')
			}).catch(err => {
				console.log(err)
			})
		}
	    // console.log('Received message: ' + data + ' from ' + socket.id);
	    // 将消息广播给所有连接的客户端（除了自己
	    socket.broadcast.emit('receive message', data);
	  });
	});
})