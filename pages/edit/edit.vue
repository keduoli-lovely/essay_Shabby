<template>
	<view class="formbox">
		<view class="header">
			<view class="icon-back" @click="back">
				<el-icon class="icon1">
					<ArrowLeftBold />
				</el-icon> &nbsp;back
			</view>
			<view class="userpic">
				<image :src="userinfo?.userinfo?.pic" mode="aspectFill"></image>
			</view>
			<view class="news">
				编辑
			</view>
		</view>

	</view>

	<view class="body">
		<el-form :model="form" :rules="rules" ref="formsend">
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title" />
			</el-form-item>

			<view class="textera">
				&nbsp;&nbsp;<text class="t1">内容</text><el-input v-model="form.text" :autosize="{ minRows: 2, maxRows: 4 }"
					type="textarea" placeholder="内容" />
			</view>
			
			<view class="uploadpic">
				&nbsp;选择图片:
			</view>
			<view class="pic_list">
				<el-upload
				    v-model:file-list="fileList"
				    :action="pic_send_url"
					method="post"
				    list-type="picture-card"
				    :on-preview="handlePictureCardPreview"
					:auto-upload="true"
					:limit="5"
					:on-exceed="messagelimit"
					:headers="token"
					:before-upload="beforeAvatarUpload"
				  >
				    <el-icon><Plus /></el-icon>
				  </el-upload>
				
				  <el-dialog v-model="dialogVisible">
				    <img w-full :src="dialogImageUrl" alt="Preview Image" />
				  </el-dialog>
			</view>
			
			  

			<el-button type="primary" @click="onSubmit(formsend)">
				发布
			</el-button>
			<el-button @click="backindex">
				取消
			</el-button>
		</el-form>
	</view>
	
	<view class="bg"></view>
</template>

<script setup>
	import { ref } from 'vue'
	import { ElMessage } from 'element-plus'
	import { AddNews } from '../../apis/addNewApi.js'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { storeToRefs } from 'pinia'
	import { NewuserDetail } from '../../store/getNewuserDetail.js'
	import { Uselistdata } from '../../store/listdata.js'
	import { config } from '../../store/config.js'
	import { Alreadypublish } from '../../store/Usepublish.js'
	import dayjs from 'dayjs'
	
	
	// 默认配置
	let { BaseUrl } = storeToRefs(config())
	let { getuserFn } = NewuserDetail()
	let { getEssayList } = Alreadypublish()
	let { getlistdatafn, getlistdatatimefn, getlistdatasoltfn } = Uselistdata()
	
	let { userinfo } = storeToRefs(userDetail())
	if(!userinfo.value.token) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}else if(!userinfo.value.userinfo.pic) {
		userinfo.value.userinfo.pic = '../../static/pic/default.png'
	}
	let formsend = ref(null)
	const form = ref({
		title: '',
		text: ''
	})
	
	// 当用户上传的文件到达上限提示
	let messagelimit = () => {
		
		ElMessage.error('最多5张图片')
	}
	
	// 上传图片
	const pic_send_url = ref(`${BaseUrl.value}/add/pic`)
	let token = {
		token: userinfo.value.token
	}
	let fileList = ref([])
	const dialogImageUrl = ref('')
	const dialogVisible = ref(false)
	
	const beforeAvatarUpload = (rawFile) => {
	  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
	    ElMessage.error('只能上传 jpg/png')
	    return false
	  } else if (rawFile.size / 1024 / 1024 > 2) {
	    ElMessage.error('大小不能超过 2M')
	    return false
	  }
	  return true
	}
	
	const handlePictureCardPreview = (file) => {
	  dialogImageUrl.value = file.url
	  dialogVisible.value = true
	}
	
	
	const rules = ref({
		title: [{
			required: true,
			message: '不能为空',
			trigger: 'blur'
		}],

	})

	let back = () => {
		
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	
	
	let onSubmit =  (formsend) => {
		if(!formsend) return
		getuserFn()
		formsend.validate( async (res) => {
			if(res && form.value.text) {
				let obj = {
					time: dayjs(new Date()).format('YYYY-MM-DD&HH:mm:ss').split('&').join('T') + 'Z',
					user_id: userinfo.value.userinfo.Account,
					...form.value,
					user: {
						name: userinfo.value.userinfo.name,
						pic: userinfo.value.userinfo.pic
					}
				}
				
				let res = await AddNews(obj)
				if(res.data.code == 200) {
					getEssayList(userinfo.value.userinfo.Account)
					ElMessage.success(res.data.message)
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}else {
					ElMessage.error(res.data.message)
				}
				
				
			}else {
				ElMessage.error('有内容未填写')
			}
		})
	}
	// 取消发布文章
	let backindex = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
</script>

<style lang="scss" scoped>
	// 背景色
	.bg {
		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #bbf1fa;
	}
	.formbox {
		width: 100%;
		height: 100%;
		padding: 30rpx 25rpx;
		background-color: #A6E3E9;

		.header {
			display: flex;
			align-items: center;
			width: 100%;
			height: 80rpx;
			color: #fff;

			.icon-back {
				padding-right: 20rpx;
				line-height: 1.5;
				border-right: 1rpx solid #999;
				color: #999;

				.icon1 {
					padding-bottom: 6rpx;
					font-size: 35rpx;
					vertical-align: middle;
				}
			}

			.userpic {
				margin: 0 20rpx 0 20rpx;
				width: 70rpx;
				height: 70rpx;
				overflow: hidden;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}

	.body {
		padding: 50rpx 65rpx;

		.textera {
			margin-bottom: 30rpx;
			display: flex;
			align-items: center;

			.t1 {
				padding-left: 15qrpx;
				padding-right: 18rpx;
				white-space: nowrap;
				color: #606266;
			}
		}
		.uploadpic {
			padding: 0 0 20rpx 0;
			color: rgba(0,0,0,.6);
		}
		.pic_list {
			margin-bottom: 28rpx;
			padding: 12rpx 10rpx;
			background-color: #b5cfd8;
			border-radius: 8rpx;
		}
	}
	
	::v-deep .el-dialog {
		position: relative;
		width: 95%;
		height: 1000rpx;
		
	}
	::v-deep .el-dialog__body {
		padding: 25rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 95%;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	::v-deep .el-dialog__headerbtn {
		padding-bottom: 20rpx;
		z-index: 99;
		top: 0;
		i {
			transform: scale(1.4);
		}
	}
	::v-deep .el-upload-list__item {
		&:nth-child(2n) {
			margin: 0 0 8px 0
		}
	}
	::v-deep .el-upload-list__item-thumbnail {
		object-fit: cover;
	}
	::v-deep .el-upload-list--picture-card {
		justify-content: space-between;
	}
</style>