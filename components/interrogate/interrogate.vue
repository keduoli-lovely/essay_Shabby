<template>
	<view class="Reply" v-if="changeloginState">
		<view class="text">
			<slot></slot>
		</view>
		<view class="btn">
			<el-button type="primary" @click="Confirm">确定</el-button>&nbsp;&nbsp;
			<el-button type="info" @click="Cancel">取消</el-button>
		</view>
	</view>
	<view class="mask" v-if="changeloginState">
		
	</view>
</template>

<script setup>
	import { allMaskstates } from '../../store/allMaskState.js'
	import { storeToRefs } from 'pinia'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { Alreadypublish } from '../../store/Usepublish.js'
	import { ElMessage } from 'element-plus'
	import { Uselistdata } from '../../store/listdata.js'
	
	
	
	let { getlistdatafn, getlistdatatimefn, getlistdatasoltfn } = Uselistdata()	
	
	let delandout = defineProps({
		why: Boolean
	})
	
	let { delfn } = Alreadypublish()
	
	let { changeloginState, changenameSate, btnMask } = storeToRefs(allMaskstates())
	let { outloginpop } = userDetail()
	// 取消遮罩
	let Cancel = () => {
		changeloginState.value = false
	}
	
	// 退出登入/删除文章
	let Confirm = () => {
		if(delandout.why) {
			delfn().then((data) => {
				if(data) {
					changenameSate.value = false
					changeloginState.value = false
					ElMessage.success('删除成功')
					getlistdatafn()
					getlistdatatimefn()
					getlistdatasoltfn()
					btnMask.value = -500
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			})
		}else {
			outloginpop()
			changeloginState.value = false
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	}
	

</script>

<style lang="scss" scpoed>
	.Reply {
		z-index: 998;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		top: 50%;
		left: 50%;
		width: 80%;
		height: 400rpx;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 14rpx;
		-webkit-box-shadow: 4px 7px 18px 0px rgba(50, 50, 50, 0.75);
		-moz-box-shadow:    4px 7px 18px 0px rgba(50, 50, 50, 0.75);
		box-shadow:         4px 7px 18px 0px rgba(50, 50, 50, 0.75);
		.text {
			font-size: 34rpx;
			padding-bottom: 60rpx;
		}
	}
	.mask {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: rgba(255,255,255,.8);
	}
</style>