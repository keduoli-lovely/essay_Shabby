<template>
	<view class="home">
		<pageHeader 
			:path="'/pages/picPage/picPage'"
			:title="'个人中心'"
		></pageHeader>
		
		<view class="header-move">
			
		</view>
		
		<view class="user-bg">
			<image src="../../serve/public/5e16a6ce67604727becb241ead6c5a20.jpg" mode="widthFix"></image>
		</view>
		
		<view class="user-info">
			<view class="userdetail">
				<view class="user-pic">
					<image src="../../serve/public/33dcdcd948984696a88dcc94a1439ee4.png" mode="aspectFill"></image>
				</view>
				<view class="user-name">
					珂朵莉
				</view>
				
				<view class="about">
					<view class="love">
						1 关注
					</view>
					<view class="live">
						1 点赞
					</view>
					<view class="star">
						1 收藏
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
import pageHeader from '../../components/pageHeader/pageHeader.vue'
import IndexCom from './components/index.vue'
import LiveCom from './components/live.vue'
import StarCom from './components/star.vue'


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
			width: 100%;
			image {
				width: 100%;
				display: block;
			}
		}
		
		.user-info {
			position: fixed;
			background-color: skyblue;
			top: 30%;
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
				background-color: rgba(0, 0, 0, .5);
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
					border-bottom: 6rpx solid seagreen;
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
	
	.nav {
		margin-bottom: 0;
	}
</style>
