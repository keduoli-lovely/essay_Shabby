<template>
	<view class="caht">
		<view class="chatroom">
			<view class="chat-title">
				<el-icon @click="back" class="icon"><ArrowLeft /></el-icon>
				<view class="char-name">
					群聊
				</view>
				<el-icon class="icon"><MoreFilled /></el-icon>
			</view>
			
			<view class="char-body">
				<view class="char-box" v-for="(item, i) in message" :key="item.sender">
					<view class="row-message" v-if="item.sender == userinfo?.userinfo?.Account">
						<view class="user-pic">
							<image :src="userinfo?.userinfo?.pic" mode="aspectFill"></image>
						</view>
						<view class="user-text" style="margin-left: 20rpx;">
							{{ item?.content }}
							<view class="lineC left-line">
								
							</view>
						</view>
					</view>
					<view class="row-message right-row" v-else>
						<view class="user-text text-right" style="margin-right: 20rpx;">
							{{ item?.content }}
							<view class="lineC right-line">
								
							</view>
						</view>
						<view class="user-pic">
							<image src="../../serve/public/bb84989c0ba7c7f71ec33ba5ff7f1f2919.jpg" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="input-text">
				<view class="input-mask">		  
					  <el-input
					  resize="none"
					  autofocus
					  v-model="textarea1"
					  autosize
					  type="textarea"
					  placeholder="说点什么呢 !"
					  input-style="width: 520rpx;height: 80rpx"
					    />
				</view>
				<view class="send-btn" @click="sendMessage" :class="textarea1.length > 0 ? 'atv' : ''">
					发送
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { io } from "socket.io-client";
	import { userDetail } from '../../store/UseuserDetail.js'
	import { storeToRefs } from 'pinia'
	import { allMaskstates } from '../../store/allMaskState.js'
	import { getmessages } from '../../apis/getmessage.js'
	import { onShow } from "@dcloudio/uni-app"
	
	
	// 连接socket服务器
	let socket = io('http://localhost:9000');
	let { inputState } = storeToRefs(allMaskstates())
	// 输入框数据
	let textarea1 = ref('')
	let message = ref([])
	let receiver = ref(123456)
	let { userinfo } = storeToRefs(userDetail())
	
	// 是否有权限进入
	if(!userinfo.value.token) {
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}
	onMounted( async () => {
		let res = await getmessages()
		message.value = res.data.result
		
		// last.scrollIntoView();
	})
	
	
	let sendMessage = () => {
		if(textarea1.value.length > 0) {
			send()
			textarea1.value = ''
		}
	}
	
	
	// 消息相关,改日再抽离出去
	let send = () => {
		let obj = ref({
			sender: userinfo.value.userinfo.Account,
			receiver: receiver.value,
			content: textarea1.value,
			receiverModel: 'user'
		})
		message.value.push(obj.value)
		socket.emit('send message', obj.value);
	}
	
	socket.on('receive message', function(data) {
	  // 在聊天界面中显示收到的消息
	  message.value.push(data)
	});
	
	
	// 返回
	let back = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}

</script>

<style lang="scss" scoped>

.chatroom {
	.chat-title {
		z-index: 99;
		position: sticky;
		top: 0;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100rpx;
		box-shadow: 4rpx 4rpx 8rpx rgba(0,0,0,.2);
		background-color: #fff;
		.char-name {
			color: skyblue;
			font-weight: 550;
			letter-spacing: 5rpx;
			font-size: 32rpx;
		}
		.icon {
			font-size: 42rpx;
		}
	}
	.char-body {
		overflow: auto;
		padding: 0 30rpx 120rpx;
		height: 100%;
		.row-message {
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			.user-pic {
				width: 100rpx;
				height: 100rpx;
				overflow: hidden;
				border-radius: 18rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.user-text {
				position: relative;
				padding: 20rpx 14rpx;
				border-radius: 6rpx;
				background-color: skyblue;
				.left-line {
					left: -14rpx;
				}
			}
		}
		.right-row {
			justify-content: end;
			.text-right {
				.right-line {
					transform: rotate(180deg);
					right: -14rpx;
				
				}
			}
		
		}
	}
	
	.input-text {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: skyblue;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		.send-btn {
			width: 18%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background-color: #999;
			border-radius: 8rpx;
		}
		.atv {
			background-color: greenyellow;
		}
	}
}


.lineC {
	position: absolute;
	top: 16rpx;
	width: 0;
	height: 0;
	border-top: 14rpx solid transparent;
	border-right: 14rpx solid skyblue;
	border-bottom: 14rpx solid transparent;
}



.textarea-click {
	z-index: 999;
	position: fixed;
	left: 0;
	width: 100%;
	max-height: 700rpx;
	height: 800rpx;
	background-color: #fff;
	box-shadow: 4rpx 4rpx 20rpx #9999;
	transition: all .4s ease;
	.title-text {
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		font-weight: 550;
		background-color: #fff;
		.push {
			opacity: .6;
		}
		.atv {
			opacity: 1;
			color: skyblue;
		}
	}
}

::v-deep .el-input__wrapper,
	::v-deep .el-textarea__inner {
		box-shadow: none;
	}
	::v-deep .el-input__wrapper:hover,
	::v-deep .el-textarea__inner {
		box-shadow: none;
	}
	::v-deep .el-textarea__inner {
		width: 100%;
		height: 100% !important;
	}
</style>
