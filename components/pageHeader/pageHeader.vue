<template>
	<view class="nav">
		<el-icon class="icon" @click="topage" ><ArrowLeft /></el-icon>
		{{ title ? title : '返回' }}
	</view>
	
	<view class="btnmove" @click="showselect" v-if="!maskstatus">
		<el-icon><MoreFilled /></el-icon>
	</view>
	
	<view class="select-box" v-if="maskstatus">
		<view class="select" v-if="true">
			<view class="row-sel" @click="touserDetail">
				编辑资料
			</view>
			<view class="row-sel">
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
	import { ref } from 'vue'
	import { routerhis } from '../../store/UseRouterPath.js'
	import { storeToRefs } from 'pinia'
	
	
	// mask的状态
	let maskstatus = ref(false)
	
	let showselect = () => {
		maskstatus.value = !maskstatus.value
	}
	
	// 获取上一次的path
	let { pathUrl } = storeToRefs(routerhis())
	
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