<template>
	<view class="home">
		<pageHeader 
			:path="path"
			:title="'个人中心'"
		></pageHeader>
		
		<view class="header-move">
			
		</view>
		
		<view class="user-bg">
			<view class="mask-bg">
				
			</view>
			<image :src="userbgpic" mode="widthFix"></image>
		</view>
		
		<view class="user-info">
			<view class="userdetail">
				<view class="user-pic">
					<image :src="userdetail?.pic" mode="aspectFill"></image>
				</view>
				<view class="user-name">
					{{ userdetail.name }}
				</view>
				
				<view class="about">
					<view class="love">
						1 <text class="nav-text">关注</text>
					</view>
					<view class="live">
						1 <text class="nav-text">点赞</text>
					</view>
					<view class="star">
						1 <text class="nav-text">收藏</text>
					</view>
				</view>
				
				<view class="love-btn">
					<view class="yes-love" v-if="false">
						已关注
					</view>
					<view class="no-love" v-else>
						关注
					</view>
					
					<view class="send-msessage">
						发私信
					</view>
				</view>
			</view>
			
			<view class="navcom">
				<view class="nav-item">
					<view class="index-item"
						@click="changenav(0)"
						:class="indexState == 0 ? 'atv-item' : ''"
						 >
						主页
					</view>
					
					<view class="live-item"
						@click="changenav(1)"
						:class="indexState == 1 ? 'atv-item' : ''"
						>
						喜欢
					</view>
					
					<view class="star-item"
						@click="changenav(2)"
						:class="indexState == 2 ? 'atv-item' : ''"
						>
						收藏
					</view>
				</view>
				
				<view class="showcom"
					:style="{transform: `translate(-${distance}rpx)`}"
				>
					<IndexCom />
					<LiveCom />
					<StarCom /> 
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import pageHeader from '../../components/pageHeader/pageHeader.vue';
import IndexCom from './components/index.vue';
import LiveCom from './components/live.vue';
import StarCom from './components/star.vue';
import { finddata } from '../../apis/finddata.js'
import { userDetail } from '../../store/UseuserDetail.js'
import { storeToRefs } from 'pinia'
import { getpicurl } from '../../apis/sendpic.js'



// 用户中i心背景图
let { userbgpic } = storeToRefs(userDetail())

let { changebgpic } = userDetail()

// 获取id&用户信息
let userdetail = ref('')
let path = ref('/pages/index/index')
onLoad( async ({userid}) => {
	if(userid) {
		let res = await finddata(userid)
		userdetail.value = res.data.result
	}else {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	
	let userbgurl = await getpicurl(userid)
	changebgpic(userbgurl.data.url)
})

// 切换状态
let indexState = ref(0)
let distance = ref(0)
let changenav = (e) => {
	indexState.value = e
	distance.value = e * 750
}

</script>

<style lang="scss" scoped>
	.home {
		.user-bg {
			position: relative;
			top: -100rpx;
			width: 100%;
			image {
				z-index: -1;
				width: 100%;
				display: block;
			}
			.mask-bg {
				position: absolute;
				width: 100%;
				height: 100%;
				inset: 0;
				background-color: rgba(0,0,0, .1);
			}
		}
		
		.user-info {
			position: fixed;
			background-color: skyblue;
			top: 25%;
			width: 100%;
			height: 100vh;
			padding-top: 30%;
			.userdetail {
				z-index: 1;
				padding: 20rpx;
				position: absolute;
				top: -55rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 90%;
				height: 340rpx;
				background-color: rgba(51,204,255, .35);
				box-shadow: 2rpx 2rpx 10rpx rgba(0,0,0, .2);
				border-radius: 14rpx;
				
				.user-pic {
					display: flex;
					justify-content: center;
					transform: translateY(-110rpx);
					overflow: hidden;
					image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 50%;
					}
				}
				
				.user-name {
					font-size: 46rpx;
					text-align: center;
					transform: translateY(-80rpx);
				}
				
				.about {
					display: flex;
					transform: translateY(-60rpx);
					justify-content: center;
					.live {
						padding: 0 50rpx;
					}
					.nav-text {
						opacity: .6;
						font-size: 24rpx;
					}
				}
				
				.love-btn {
					display: flex;
					justify-content: center;
					transform: translateY(-20rpx);
					.yes-love {
						padding-right: 20rpx;
					}
					.no-love {
						padding-right: 20rpx;
					}
					
					.send-msessage {
						padding-left: 20rpx;
					}
				}
			}
		}
		
		.navcom {
			transform: translateY(120rpx);
			.nav-item {
				margin-bottom: 40rpx;
				display: flex;
				justify-content: center;
				.index-item {
					margin-right: 60rpx;
				}
				.live-item {
					margin: 0 60rpx;
				}
				.star-item {
					margin-left: 60rpx;
				}
				
				.atv-item {
					padding-bottom: 8rpx;
					color: #303952;
					border-bottom: 6rpx solid #596275;
				}
			}
			
			.showcom {
				overflow: hidden;
				display: flex;
				width: 300%;
				height: 600rpx;
				transition: all .4s ease;
		}
	  }
	}
	
	::v-deep .nav {
		margin-bottom: 0;
		background-color: transparent;
	}
</style>
