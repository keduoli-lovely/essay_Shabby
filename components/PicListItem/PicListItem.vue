<template>
	<view class="pic">
		<image :src="pic" mode="widthFix"></image>
	</view>
</template>

<script setup>
	
	defineProps({
		pic: String,
	})

</script>

<style lang="scss" scoped>
	.pic {
		margin-top: 20rpx;
		padding: 20rpx;
		width: 100%;
		background-color: #D2D2D2;
		border-radius: 4rpx;
		image {
			width: 100%;
		}
	}
</style>