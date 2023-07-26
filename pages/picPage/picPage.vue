<template>
	<view class="logding" v-loading.fullscreen.lock="fullscreenLoading">
		
	</view>
	
	<view class="tarbar">
		<view class="back" @click="back">
			<view class="back-icon">
				<el-icon><ArrowLeft /></el-icon>
			</view>
			<view class="back-text">
				返回
			</view>
		</view>

	</view>
	
	<view class="nav">
		<view class="nav-item atv">
			推荐
		</view>
		
		<view class="nav-item">
			热门
		</view>
		
		<view class="nav-item">
			最新
		</view>
	</view>
	
	<view class="content-body">
		
		<!-- 图片小组件 -->
		
		<WaterfallPic :imgList='list' ></WaterfallPic>
	</view>
	
</template>

<script setup>
	import WaterfallPic from '../../components/WaterfallPic/WaterfallPic.vue'
	import { ref, onMounted } from 'vue'
	
	let list = [
		"http://127.0.0.1:3000/a3d32ecdbfe12e605a319dceeb2db975a3d32ecdbfe12e605a319dceeb2db97514.jpg",
		"http://127.0.0.1:3000/a3d32ecdbfe12e605a319dceeb2db975a3d32ecdbfe12e605a319dceeb2db97514.jpg",
		"http://127.0.0.1:3000/a3d32ecdbfe12e605a319dceeb2db975a3d32ecdbfe12e605a319dceeb2db97514.jpg",
		"http://127.0.0.1:3000/a3d32ecdbfe12e605a319dceeb2db975a3d32ecdbfe12e605a319dceeb2db97514.jpg"
	]
	
	// logding
	const fullscreenLoading = ref(true)
	
	onMounted(() => {
		fullscreenLoading.value = false
	})
	
	// 返回首页
	let back = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	
</script>

<style lang="scss" scoped>

	.tarbar {
		color: skyblue;
		margin-bottom: 38rpx;
		padding: 0 24rpx;
		width: 100%;
		height: 100rpx;
		// box-shadow: 4rpx 4rpx 8rpx rgba(0,0,0,.4);
		background-color: #3F4C6B;
		.back {
			height: 100%;
			display: flex;
			align-items: center;
			.back-icon {
				padding-top: 12rpx;
				font-size: 45rpx;
				vertical-align: middle;
			}
			.back-text {
				margin-left: 5rpx;
			}
		}
	}
	
	.nav {
		margin-bottom: 30rpx;
		padding: 0 20rpx;
		display: flex;
		width: 100%;
		justify-content: space-around;
		.atv {
			color: skyblue;
			padding-bottom: 6rpx;
			border-bottom: 4rpx solid skyblue;
		}
		.nav-item {
			opacity: .9;
			font-weight: 520;
			font-size: 32rpx;
		}
	}
	
	.content-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 34rpx 24rpx 0;
		width: 100%;
		box-shadow: inset 4rpx 4rpx 14rpx #999;
	}
</style>
