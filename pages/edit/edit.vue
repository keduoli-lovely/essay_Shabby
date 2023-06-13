<template>
	<view class="formbox">
		<view class="header">
			<view class="icon-back" @click="back">
				<el-icon class="icon1">
					<ArrowLeftBold />
				</el-icon> &nbsp;back
			</view>
			<view class="userpic">
				<image :src="userinfo.userinfo.pic" mode="aspectFill"></image>
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
				<text class="t1">内容</text> <el-input v-model="form.text" :autosize="{ minRows: 2, maxRows: 4 }"
					type="textarea" placeholder="内容" />
			</view>

			<el-form-item label="时间" prop="time">
				<el-col :span="11">
					<el-date-picker v-model="form.time" type="date" placeholder="选择时间" style="width: 100%" />
				</el-col>
			</el-form-item>


			<el-button type="primary" @click="onSubmit(formsend)">
				发布
			</el-button>
			<el-button>
				取消
			</el-button>
		</el-form>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { ElMessage } from 'element-plus'
	import { AddNews } from '../../apis/addNewApi.js'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { storeToRefs } from 'pinia'
	import { NewuserDetail } from '../../store/getNewuserDetail.js'
	import { Uselistdata } from '../../store/listdata.js'
	
	
	
	let { getuserFn } = NewuserDetail()
	let { getlistdatafn } = Uselistdata()
	
	let formsend = ref(null)
	const form = ref({
		title: '',
		text: '',
		time: ''
	})
	
	let { userinfo } = storeToRefs(userDetail())
	if(!userinfo.value.userinfo.pic) {
		userinfo.value.userinfo.pic = '../../static/pic/default.png'
	}
	const rules = ref({
		title: [{
			required: true,
			message: '不能为空',
			trigger: 'blur'
		}],
		time: [{
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
					user_id: userinfo.value.userinfo.Account,
					...form.value,
					user: {
						name: userinfo.value.userinfo.name,
						pic: userinfo.value.userinfo.pic
					}
				}
				let res = await AddNews(obj)
				if(res.data.code == 200) {
					getlistdatafn()
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
</script>

<style lang="scss" scoped>
	.formbox {
		width: 100%;
		height: 100%;
		padding: 30rpx 25rpx;
		background-color: #151515;

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
		padding: 50rpx 80rpx;

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
	}
</style>