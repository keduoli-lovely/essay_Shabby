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
			    <el-tab-pane label="文章" name="1">
					<CardItem
					v-if="keyWordDataAll.data?.length"
					v-for="item in keyWordDataAll.data"
					:key="item._id"
					:listdata="item"
					@click="todetail(item)"
					 ></CardItem>
					 
					 <view v-else class="noessay">
					 	没有相关的文章
					 </view>
				</el-tab-pane>
			    <el-tab-pane label="用户" name="2">
					<userCard
						v-if="keyWordDataAll.user?.length"
						v-for="item in keyWordDataAll.user"
						:key="item._id"
						:userInfoList="item"
						@tipsUserId="touserhome"
					></userCard>
					
					<view v-else class="noessay">
						没有相关的用户
					</view>
				</el-tab-pane>
			    <el-tab-pane label="图集" name="3">
					loading...
				</el-tab-pane>
			  </el-tabs>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import CardItem from '../../components/CardItem/CardItem.vue'
	import { keywordFn } from '../../store/keywordsearch.js'
	import { onLoad } from "@dcloudio/uni-app"
	import userCard from '../../components/userCard/userCard.vue'
	import { routerhis } from '../../store/UseRouterPath.js'
	
	// path
	let { changePathFn, changeuserid } = routerhis()
	// title 文本
	let titletext = ref('')
	// 获取搜索数据
	let { keyWordDataAll } = storeToRefs(keywordFn())
	let { getkeyword } = keywordFn()
	onLoad((e) => {
		titletext.value = e.key	
	})

	onMounted(() => {
		if(!titletext.value) {
			titletext.value = uni.getStorageSync('search')
		}
		// 判断是否有数据
		if(!keyWordDataAll?.value.data && !keyWordDataAll?.value.user) {
			if(titletext.value) {
				getkeyword(titletext.value)
			}else {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
		// 判断文章数量，如果没有切换到用户
		if(!keyWordDataAll.value.data.length) {
			if(keyWordDataAll.value.user.length) {
				activeName.value = '2'
			}
		}
	})
	
	
	// 跳转详情页
	let todetail = (data) => {
		uni.navigateTo({
			url: `/pages/Detail/Detail?id=${data._id}`
		})
	}
	let touserhome = (id) => {
		// 用户id, 用户中心没有写,暂时不做下一步
		// console.log(id)
		if(id) {
			uni.setStorageSync('search', titletext.value)
			changeuserid(id)
			changePathFn('/pages/searchpage/searchpage')
			uni.navigateTo({
				"animationType": 'slide-in-left',
				url: `/pages/Home/Home?userid=${id}`,
				"animationDuration": 300
			})
		}
	}
	
	// 返回
	let back = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
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
