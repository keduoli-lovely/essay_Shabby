<template>
	<view class="picshowbox">
		<view class="pic" v-for="(item, i) in pic" :key="i">
			<image @click="seepic(i)" :src="item" mode="widthFix"></image>
		</view>
		
		<view class="maxpic" @click="closemaks" id="maxpic" :style="{transform: `scale(${maskisshow})`}">
			<image :src="pic[picindex]" mode="widthFix" class="showmaxpic"></image>
			<view class="left-box" id="box-icon" v-if="isshowbtn">
				<el-icon class="icon-left" @click="clickLeft"><ArrowLeftBold /></el-icon>
				<el-icon class="icon-right" @click="clickRight"><ArrowRightBold /></el-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	
	// 当前图片的索引
	let picindex = ref(0)
	// mask的显示与隐藏
	let maskisshow = ref(0)
	let isshowbtn = ref(false)
	
	// 判断是否只有一张图片,有则不显示按钮
	onMounted(() => {
		if(listpic.pic) {
			isshowbtn = (listpic.pic.length <= 1) ? false : true
		}
	})
	
	let listpic = defineProps({
		pic: Array,
	})
	
	// 点击查看大图
	let seepic = (index) => {
		picindex.value = index
		maskisshow.value = 1
		console.log(index)
	}
	// 关闭大图显示
	let closemaks = (e) => {
		if(e.target.id === 'maxpic') {
			maskisshow.value = 0
		}
	}
	// 点击切换上一张/下一张
	let clickLeft = () => {
		if(picindex.value <= 0 ) {
			picindex.value = listpic.pic.length - 1
		}else {
			picindex.value--
		}
	}
	let clickRight = () => {
		if(picindex.value >= listpic.pic.length - 1) {
			picindex.value = 0
		}else {
			picindex.value++
		}
	}

</script>

<style lang="scss" scoped>
	.pic {
		margin-top: 20rpx;
		padding: 20rpx;
		width: 100%;
		background-color: #D2D2D2;
		border-radius: 4rpx;
		image {
			width: 100%;
		}
	}
	.maxpic {
		transition: all .4s ease-in-out;
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.showmaxpic {
			// position: relative;
			width: 100%;
			
		}
		
		.left-box {
			z-index: 999;
			.icon-left,
			.icon-right {
				color: #fff;
				font-size: 60rpx;
				position: absolute;
				top: 50%;
				// width: 40rpx;
				// height: 40rpx;
			}
			.icon-left {
				left: 10rpx;
			}
			.icon-right {
				right: 10rpx;
			}
		}
 	}
</style>