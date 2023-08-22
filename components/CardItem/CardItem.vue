<template>
	<el-card class="box-card" body-style="height: auto" :class="listdata.state == -1 ? 'atv' : ''">
		<view class="tips">
			已被举报待审核
		</view>
		<view class="header">
			<view class="title">
				{{ listdata?.title }}
			</view>
			<view class="content">
				{{ listdata?.text[0] }}
			</view>
		</view>
		
		<view class="about">
			<view class="detail">
				<view class="pic">
					<image :src="listdata?.user.pic" mode="aspectFill"></image>
				</view>
				<view class="name">
					{{ listdata?.user.name }}
				</view>
			</view>
			
			<view class="time">
				{{ listdata?.time.split('T')[0] }}
			</view>
		</view>
		
	</el-card>
</template>

<script setup>
	
	defineProps({
		listdata: Object,
	})
	
</script>

<style lang="scss" scoped>
	.atv {
		background-color: rgba(255, 0, 0, .1);
		.tips {
			display: block !important;
			position: absolute;
			top: 30%;
			right: 0;
			transform: rotate(45deg) translate(28rpx, -68rpx);
			padding: 5rpx 40rpx;
			background-color: skyblue;
		}
	}
	.el-card {
		position: relative;
		margin-top: 20rpx;
		.tips {
			display: none;
		}
	}
	.el-card:first-child {
		margin-top: 0;
	}
	.header {
		.title {
			margin-bottom: 20rpx;
		}
		.content {
			text-overflow: -o-ellipsis-lastline;  
			overflow: hidden;  
			text-overflow: ellipsis;  
			display: -webkit-box;  
			-webkit-line-clamp: 3;  
			-webkit-box-orient: vertical; 
		}
	}
	.about {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.detail {
			display: flex;
			align-items: center;
			.pic {
				margin-right: 20rpx;
				width: 65rpx;
				height: 65rpx;
				overflow: hidden;
				border-radius: 50%;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.name {
			}
		}
		.time {
			
		}
	}
</style>