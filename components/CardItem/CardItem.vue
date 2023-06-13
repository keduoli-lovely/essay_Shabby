<template>
	<el-card class="box-card" body-style="height: auto">
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
	.el-card {
		margin-top: 20rpx;
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