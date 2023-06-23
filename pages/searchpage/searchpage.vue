<template>
	<view class="search">
		<view class="header">
			<view class="backicon" @click="back">
				<el-icon class="icon"><ArrowLeftBold /></el-icon>
			</view>
			
			<view class="title">
				搜索相关 &nbsp;&nbsp;{{'"' + titletext + '"' }}
			</view>
		</view>
		
		<view class="content">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			    <el-tab-pane label="搜索" name="1">
					<CardItem 
					v-for="item in keyWordDataAll"
					:key="item._id"
					:listdata="item"
					@click="todetail(item)"
					 ></CardItem>
				</el-tab-pane>
			    <el-tab-pane label="用户" name="2">
					loading....
				</el-tab-pane>
			    <el-tab-pane label="图集" name="3">
					loading...
				</el-tab-pane>
			  </el-tabs>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import CardItem from '../../components/CardItem/CardItem.vue'
	import { keywordFn } from '../../store/keywordsearch.js'
	import { onLoad } from "@dcloudio/uni-app"
	
	
	// title 文本
	let titletext = ref('')
	// 获取搜索数据
	let { keyWordDataAll } = storeToRefs(keywordFn())
	
	onLoad((e) => {
		titletext.value = e.key
	})
	
	// 判断是否有数据,没有这返回
	if(keyWordDataAll.value.length <= 0) {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	
	// 跳转详情页
	let todetail = (data) => {
		uni.navigateTo({
			url: `/pages/Detail/Detail?id=${data._id}`
		})
	}
	
	// 返回
	let back = () => {
		uni.navigateBack()
	}
	
	let activeName = ref('1')
	
	let handleClick = (e) => {
	}
</script>

<style lang="scss" scoped>
	.search {
		.header {
			margin-bottom: 20rpx;
			padding: 20rpx 30rpx;
			position: sticky;
			top: 0;
			width: 100%;
			height: 120rpx;
			display: flex;
			align-items: center;
			box-shadow: 4rpx 4rpx 8rpx rgba(0,0,0,.2);
			.backicon {
				font-size: 40rpx;
				.icon {
					vertical-align: middle;
				}
			}
			.title {
				margin-left: 20rpx;
				padding-top: 6rpx;
				font-size: 34rpx;
			}
		}
		
		.content {
			padding: 0 30rpx;
		}
	}
</style>
