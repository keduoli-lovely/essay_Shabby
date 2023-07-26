<template>
	<view class="nav" @click="topage">
		<el-icon class="icon"><ArrowLeft /></el-icon>
		{{ title ? title : '返回' }}
	</view>
</template>

<script setup>
	
	let props = defineProps({
		path: String,
		title: String
	})
	
	let topage = () => {
		if(props.path) {
			uni.reLaunch({
				url: props.path
			})
		}else {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	}

</script>

<style lang="scss" scoped>
	.nav {
		position: sticky;
		top: 0;
		margin-bottom: 30rpx;
		padding: 0 20rpx;
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
</style>