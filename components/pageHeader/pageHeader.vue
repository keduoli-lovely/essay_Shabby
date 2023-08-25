<template>
	<view class="nav">
		<el-icon class="icon" @click="topage" ><ArrowLeft /></el-icon>
		{{ title ? title : '返回' }}
	</view>
	
	<view class="btnmove" @click="showselect" v-if="!maskstatus">
		<el-icon><MoreFilled /></el-icon>
	</view>
	
	<view class="select-box" v-show="maskstatus">
		<view class="select" v-if="userroot">
			<view class="row-sel" @click="touserDetail">
				编辑资料
			</view>
			<view class="row-sel" id="topel">
				更换背景
			</view>
		</view>
		
		<view class="select" v-else>
			<view class="row-sel">
				举报
			</view>
		</view>
	</view>
	
	<view class="mask-sel" v-if="maskstatus" @click="showselect">
		
	</view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { routerhis } from '../../store/UseRouterPath.js'
	import { storeToRefs } from 'pinia'
	import { sendpic, getpicurl } from '../../apis/sendpic.js'
	import { ElMessage } from 'element-plus'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { onLoad } from "@dcloudio/uni-app";
	
	
	let query_id = ref('')
	onLoad((quer) => {
		query_id.value = quer.userid
		
	})
	// 获取上一次的path
	let { pathUrl, useridsearch } = storeToRefs(routerhis())
	
	// 权限
	let { userinfo } = storeToRefs(userDetail())
	let userroot = computed(() => {
		if(!userinfo.value.token) return false
		if(!useridsearch.value) {
			return userinfo.value.userinfo.Account == query_id.value ? true : false
		}else {
			if(userinfo.value.userinfo.Account != useridsearch.value) {
				return false
			}else {
				return true
			}
		}
		
	})
	// bg图片inp
	let { changebgpic } = userDetail()

	// mask的状态
	let maskstatus = ref(false)
	
	onMounted(() => {
		let topel = document.querySelector("#topel")
		if(topel) {
			let inp = document.createElement('input')
			inp.type = 'file',
			inp.accept = 'image/*',
			inp.id = 'pic',
			inp.style.cssText = `
				position: absolute;
				width: 100%;
				height: 100%;
				inset: 0;
				opacity: 0;
			`
			inp.addEventListener("change", async (e) => {
				let data = e.target.files[0]
				if (data && data.type.startsWith("image/")) {
					let formdata = new FormData()
					formdata.append('pic', data)
					
					let res = await sendpic(formdata)
					
					if(res.data.code == 20040) {
						ElMessage.success('更换成功')
						let respic = await getpicurl()
						changebgpic(respic.data.url)
						maskstatus.value = false
					}
				}
			})
			topel.appendChild(inp)
		}
	
	})
	
	let showselect = () => {
		maskstatus.value = !maskstatus.value
	}
	
	let props = defineProps({
		path: String,
		title: String
	})
	
	let touserDetail = () => {
		uni.reLaunch({
			url: '/pages/UserHome/UserHome'
		})
	}
	
	let topage = () => {
		if(props.path) {
			if(pathUrl.value) {
				uni.reLaunch({
					url: pathUrl.value
				})
			}else {
				uni.reLaunch({
					url: props.path
				})
			}
			
		}else {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	}

</script>

<style lang="scss" scoped>
	.nav {
		z-index: 10;
		position: sticky;
		top: 0;
		margin-bottom: 30rpx;
		padding: 0 20rpx;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #D0E0E3;
		.icon {
			font-size: 40rpx;
			vertical-align: middle;
			padding-bottom: 8rpx;
		}
	}
	
	.btnmove {
		z-index: 10;
		position: fixed;
		top: 25rpx;
		right: 30rpx;
		transform: rotate(90deg);
		font-size: 28rpx;
	}
	
	.select {
		z-index: 99;
		position: fixed;
		top: 0;
		right: 0;
		width: 260rpx;
		background-color: rgba(255, 255, 255, .8);
		font-size: 26rpx;
		.row-sel {
			position: relative;
			text-align: center;
			line-height: 80rpx;
		}
	}
	
	.mask-sel {
		z-index: 90;
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>