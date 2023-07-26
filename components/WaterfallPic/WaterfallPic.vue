<template>
	<view class='show' 
		v-for="(pic, i) in imgList" :key="i"
	>
		<image :src="pic" mode="widthFix"></image>
	</view>
</template>

<script setup>
	defineProps({
		imgList: Array
	})
	
</script>

<style lang="scss" scoped>
	.show {
		width: 48%;
		border-radius: 14rpx;
		overflow: hidden;
		box-shadow: 4rpx 4rpx 14rpx #999,
					-4rpx -4rpx 14rpx #999;
					
		margin-bottom: 24rpx;
		image {
			width: 100%;
		}
	}
</style>