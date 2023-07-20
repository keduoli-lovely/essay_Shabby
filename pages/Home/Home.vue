<template>
	<view class="home">
		<view class="header">
			<view class="back">
				<view class="back-icon">
					<pageHeader :path="'/pages/picPage/picPage'" ></pageHeader>
					<el-icon class="icon"><ArrowLeft /></el-icon>
				</view>
				<view class="back-text">
					返回
				</view>
			</view>
			
			<view class="header-move">
				
			</view>
		</view>
		
		<view class="user-bg">
			
		</view>
		
		<view class="user-info">
			<view class="userdetail">
				<view class="user-pic">
					
				</view>
				<view class="user-name">
					
				</view>
				
				<view class="about">
					<view class="love">
						
					</view>
					<view class="live">
						
					</view>
					<view class="star">
						
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

		</view>
	</view>
</template>

<script setup>
import pageHeader from '../../components/pageHeader/pageHeader.vue'

</script>

<style lang="scss" scoped>
	.home {
		.header {
			
		}
	}
</style>
