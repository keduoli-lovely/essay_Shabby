<!-- 将概括所有选择弹窗 -->

<template>
	<view class="box" :class="detail_choice ? 'atv' : '' ">
		<h4 class="title">
			<text>提示</text>
			<el-icon class="icon"><Close /></el-icon>
		</h4>
		<view class="content">
			<slot></slot>
		</view>
		<view class="btn">
			<view class="no" @click="close">
				取消
			</view>
			<view class="yes">
				确认
			</view>
		</view>
	</view>
	
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import { otherdata } from '../../store/otherdata.js'
	
	let { detail_choice } = storeToRefs(otherdata())
	
	// 关闭弹窗
	let close = () => {
		detail_choice.value = false
	}
	
</script>

<style lang="scss" scoped>

.atv {
	z-index: 99 !important;
	top: 45% !important;
	opacity: 1 !important;
}
.box {
	z-index: -1;
	transition: all .4s ease;
	padding: 20rpx 40rpx 70rpx 20rpx;
	position: fixed;
	opacity: 0;
	top: 20%;
	left: 50%;
	width: 600rpx;
	// height: 400rpx;
	transform: translate(-50%, -50%);
	box-shadow: 4rpx 4rpx 20rpx rgba(0,0,0,.4);
	background-color: #fff;
	border-radius: 6rpx;
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 0;
		font-weight: 520;
		font-size: 38rpx;
		.icon {
			cursor: pointer;
			font-size: 40rpx;
			color: rgba(0,0,0,.4);
			&:hover {
				color: skyblue;
			}
		}
	}
	.content {
		font-size: 26rpx;
		padding: 40rpx 0;
	}
	.btn {
		display: flex;
		position: absolute;
		bottom: 30rpx;
		right: 50rpx;
		font-size: 26rpx;
		.yes {
			&:hover {
				color: #000;
				background-color: #B2EBF2;
			}
			color: #fff;
			margin-left: 40rpx;
			background-color: skyblue;
		}
		.no {
			&:hover {
				color: skyblue;
				background-color: #E0F7FA;
			}
			border: 1rpx solid rgba(0,0,0,.2);
		}
		.yes,
		.no {
			text-align: center;
			padding: 8rpx 20rpx;
			border-radius: 6rpx;
			cursor: pointer;
		}
	}
}
</style>