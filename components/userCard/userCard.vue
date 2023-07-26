<template>
	<view class="usercard" @click="senduserid(userInfoList._id)">
		<el-card body-style="height: auto">
			<view class="userdetail">
				<view class="user-pic">
					<image :src="userInfoList.pic" mode="aspectFill"></image>
				</view>
				<view class="about">
					<view class="user-name">
						{{ userInfoList.name }}
					</view>
					
					<view class="info">
						<view class="sex">
							{{ userInfoList.sex }}
						</view>
						<view class="age">
							{{ userInfoList.age }}
						</view>
					</view>
					
				</view>
				
			</view>
			
			<view class="describes">
				{{ tips }}
			</view>
			
		</el-card>
	</view>
</template>

<script setup>
	
	import { ref, computed } from 'vue'
	
	let props = defineProps({
		userInfoList: Object
	})
	
	let emit = defineEmits(['tipsUserId'])
	
	let tips = computed(() => {
		if(props.contentText) {
			return props.contentText
		}else {
			return '这个人没有写什么哦 !!'
		}
	})
	
	// 实现点击跳转用户中心
	let senduserid = (id) => {
		if(id) {
			emit('tipsUserId', id)
		}else {
			uni.showToast({
				title: 'error',
				duration: 1200,
				icon: 'none'
			});
		}
	}
	
</script>

<style lang="scss" scoped>
	.userdetail {
		margin-bottom: 30rpx;
		display: flex;
		.user-pic {
			margin-right: 15rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 14rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.about {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.user-name {
				line-height: 40rpx;
				font-size: 34rpx;
				font-weight: 530;
				color: #000;
			}
			.info {
				display: flex;
				font-size: 26rpx;
				opacity: .99;
				.sex {
					margin-right: 8rpx;
				}
			}
			
		}
		
	}
	
	.describes {
		font-size: 28rpx;
		color: #2E2E2E;
		opacity: .8;
	}
	
</style>