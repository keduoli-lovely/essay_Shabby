<template>
	<view class="logding" v-loading.fullscreen.lock="fullscreenLoading"></view>
	<view class="nav" @click="backtohome">
		<el-icon class="icon"><ArrowLeft /></el-icon>&nbsp;&nbsp;用户详情
	</view>
	
	<view class="body">
		<el-card body-style="padding: 10px">
			<view class="userinfo">
				<view class="header">
							 <el-upload
								:action="urlbase"
								method="post"
								:headers="token"
							    class="avatar-uploader"
							    :show-file-list="false"
							    :on-success="sendimg"
								:drag='true'
							    :before-upload="beforeAvatarUpload"
							  >
							    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
							    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							  </el-upload>

					<view class="header-text">
						头像
					</view>
					<view class="pic-box">
						<view class="pic">
							<image :src="userinfo.userinfo.pic" mode="aspectFill"></image>
						</view>
						
						<el-icon class="icon-to"><ArrowRight /></el-icon>
					</view>
				</view>
				
				<view class="username" @click="changename">
					
					<view class="name-text">
						昵称
					</view>
					<view class="name">
						{{ userinfo.userinfo.name }}
						<el-icon class="icon-to"><ArrowRight /></el-icon>
					</view>
				</view>
				
				<view class="username select">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker  @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="name-text">
						性别
					</view>
					<view class="name">
						{{ userinfo.userinfo.sex }}
						<el-icon class="icon-to"><ArrowRight /></el-icon>
					</view>
				</view>
				<view class="username" @click="closeShowAge">
					<view class="name-text">
						年龄
					</view>
					<view class="name">
						{{ userinfo.userinfo.age }}
						<el-icon class="icon-to"><ArrowRight /></el-icon>
					</view>
				</view>
				
			</view>
		</el-card>
		
		<view class="changeAge" v-if="isshowAge">
			<view class="age-text">
				没做校验,看着写
			</view>
			<input style="margin-bottom: 35rpx;width: 72%;padding-bottom: 10rpx;;border-bottom: 1rpx solid rgba(0,0,0,.4);" type="number" placeholder="年龄" v-model.number="agenum" focus>
			
			<view class="btn">
				 <el-button type="primary" @click="confirm">确认</el-button>
				 <el-button type="info" @click="abandon">取消</el-button>
			</view>
		</view>
		
		<changenameItem v-if="userinfo.token"></changenameItem>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { userDetail } from '../../store/UseuserDetail.js'
import { NewuserDetail } from '../../store/getNewuserDetail.js'
import { ElMessage } from 'element-plus'
import changenameItem from '../../components/changename/changenameItem.vue'
import { allMaskstates } from '../../store/allMaskState.js'
import { changeusernameApi } from '../../apis/changeuserdetail.js'
import { Uselistdata } from '../../store/listdata.js'
import { config } from '../../store/config.js'


// 默认地址
let { BaseUrl } = storeToRefs(config())
// 获取mask的状态 -- 显示/隐藏
let { changenameSate } = storeToRefs(allMaskstates())
// logding
const fullscreenLoading = ref(true)
// 获取用户信息
let { userinfo } = storeToRefs(userDetail())

let { getuserFn } = NewuserDetail()

// 获去最新的文章信息
let { getlistdatafn } = Uselistdata()

// 年龄修改框的 显示/隐藏
let agenum = ref(userinfo.value.userinfo.age || 0)
let isshowAge = ref(false)
let closeShowAge = () => {
	isshowAge.value = true
}
onMounted(() => {
	fullscreenLoading.value = false
})

let abandon = () => {
	isshowAge.value = false
}
let confirm = async () => {
	if(agenum.value < 0) {
		ElMessage.error('还没出生就来了嗷!')
	}else if(agenum.value > 200) {
		ElMessage.error('6666666')
	}else {
		let tmp = Math.ceil(agenum.value)
		let res = await changeusernameApi({
			code: 'age',
			data: tmp
		})
		if(res.data.data.code == 2010) {
			getuserFn()
			getlistdatafn()
			ElMessage.success(res.data.data.message)
			isshowAge.value = false
		}
	}
}


// 选择框内容
let title = ref('picker')
let array = ref(['男', '女', '未知', '沃尔玛购物袋'])
let index = ref(0)
// 数据集中
const imageUrl = ref('')
const urlbase = ref(`${BaseUrl.value}/upload`)

let token = {
	token: userinfo.value.token
}


let sendimg = (req, uploadFile) => {
	if(req.data.code == 200) {
		getuserFn()
		ElMessage.success(req.data.result.message)
	}
	
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片必须未 jpg!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('不可以超过 2MB!')
    return false
  }
  return true
}

let bindPickerChange = async (e) => {
	index.value = e.detail.value
	let res = await changeusernameApi({
		code: 'sex',
		data: array.value[index.value]
	})
	if(res.data.data.code == 2010) {
		getuserFn()
		getlistdatafn()
		ElMessage.success(res.data.data.message)
	}
}

// 修改昵称
let changename = () => {
	changenameSate.value = true
}


let backtohome = () => {
	uni.reLaunch({
		url: '/pages/index/index'
	})
}

</script>

<style lang="scss" scoped>
	.nav {
		margin-bottom: 30rpx;
		padding: 0 40rpx;
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		background-color: #D0E0E3;
		.icon {
			font-size: 40rpx;
			vertical-align: middle;
			padding-bottom: 8rpx;
		}
	}
	.body {
		padding: 0 20rpx;
		.userinfo {
			.header {
				z-index: 10;
				overflow: hidden;
				position: relative;
				padding-bottom: 25rpx;
				border-bottom: 1rpx solid #D2D2D2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.avatar-uploader {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 80%;
					opacity: 0;
					overflow: hidden;
				}
				.header-text {
					font-size: 32rpx;
					letter-spacing: 5rpx;
				}
				.pic-box {
					display: flex;
					align-items: center;
					.pic {
						margin-right: 20rpx;
						width: 140rpx;
						height: 140rpx;
						overflow: hidden;
						border-radius: 50%;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.icon-to {
						font-size: 50rpx;
					}
				}
			}
			.select {
				overflow: hidden;
				position: relative;
				.uni-list {
					overflow: hidden;
					position: absolute;
					top: 40rpx;
					left: 0;
					width: 100%;
					height: 60%;
					z-index: 10;
					.uni-input {
						overflow: hidden;
						opacity: 0;
						width: 100%;
						height: 80%;
					}
				}
			}
			.username {
				padding-top: 40rpx;
				padding-bottom: 40rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #D2D2D2;
				.name-text {
					letter-spacing: 5rpx;
				}
				.name {
					display: flex;
					color: #737373;
					.icon-to {
						margin-left: 10rpx;
						padding-top: 10rpx;
					}
				}
			}
		}
	}
	.changeAge {
		padding: 20rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		height: 340rpx;
		background-color: #fff;
		box-shadow: 2rpx 2rpx 15rpx rgba(0,0,0,.3),
		-2rpx -2rpx 15rpx rgba(0,0,0,.3);
		border-radius: 14rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.age-text {
			margin-bottom: 28rpx;
		}
	}
	
	.avatar-uploader-icon {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60%;
		opacity: 0;
	}
	

</style>
