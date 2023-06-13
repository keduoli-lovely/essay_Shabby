<template>
	<view class="myessay" v-if="!sendAndlive">
		<view class="bar" >
			<el-icon class="icon" @click="back"><ArrowLeft /></el-icon>
			<view class="bar-text">
				我的文章
			</view>
		</view>
		
		<view class="body-con">
			<CardItem v-for="item in essay.send" :key="item._id" :listdata="item"></CardItem>
			
		</view>	
	</view>
	<view class="myessay" v-else>
		<view class="bar" >
			<el-icon class="icon" @click="back"><ArrowLeft /></el-icon>
			<view class="bar-text">
				我的喜欢
			</view>
		</view>
		
		<view class="body-con">
			<CardItem v-for="item in essay.live" :key="item._id" :listdata="item"></CardItem>
			
		</view>	
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { Alreadypublish } from '../../store/Usepublish.js'
	import { storeToRefs } from 'pinia'
	import { allMaskstates } from '../../store/allMaskState.js'
	import { userDetail } from '../../store/UseuserDetail.js'
	
	let { sendAndlive } = storeToRefs(allMaskstates())
	let { userinfo } = storeToRefs(userDetail())
	// 回到主页
	let back = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	// 列表数据/用户发布的文章
	let { essay } = storeToRefs(Alreadypublish())
	let { getEssayList } = Alreadypublish()
	
	// 判断是否有数据,没有则请求 -------------- 整不了,刷新sendAndlive数据也会丢
	// onMounted(() => {
	// 	if(userinfo.value.token) {
	// 		getEssayList(userinfo.value.userinfo.Account)
	// 	}
	// })
	// 判断是否有数据,没有则返回首页
	onMounted(() => {
		if(essay.value.length < 1) {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	})
</script>

<style lang="scss" scoped>
	.bar {
		z-index: 99;
		position: sticky;
		top: 0;
		margin-bottom: 25rpx;
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx 20rpx;
		font-size: 32rpx;
		height: 120rpx;
		box-shadow: 4rpx 4rpx 8rpx rgba(0,0,0,.2);
		background-color: #fff;
		.icon {
			margin-right: 20rpx;
			font-size: 50rpx;
		}
		.bar-text {
			padding-top: 5rpx;
		}
	}
	.body-con {
		padding: 0 20rpx 40rpx;
	}

</style>
