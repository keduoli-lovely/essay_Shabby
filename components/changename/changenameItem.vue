<template>
	<view class="chanegnamemask" v-if="changenameSate">
		<view class="inp-name">
			<view class="text-mess">
				更改您的呢称
			</view>
			<view class="nikename">
				<view class="uni-form-item uni-column">
					<input class="uni-input" focus v-model="changename" :value="changename"/>
				</view>
			</view>
			
			<view class="btn">
				 <el-button type="primary" @click="snedname">确认</el-button>
				 <el-button type="info" @click="Cancel">取消</el-button>
			</view>
		</view>
		
	</view>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { userDetail } from '../../store/UseuserDetail.js'
import { allMaskstates } from '../../store/allMaskstate.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { changeusernameApi } from '/apis/changeuserdetail.js'
import { NewuserDetail } from '../../store/getNewuserDetail.js'
import { Uselistdata } from '../../store/listdata.js'


let { userinfo } = storeToRefs(userDetail())
let { changenameSate } = storeToRefs(allMaskstates())
// 获取最新用户数据
let { getuserFn } = NewuserDetail()
// 获取最新文章泪飙
let { getlistdatafn } = Uselistdata()

let Cancel = () => {
	changenameSate.value = false
}
// 用户输入的name
let changename= ref(userinfo.value.userinfo.name)

// 用户确认修改name
let snedname = async () => {
	if(changename.value) {
		if(changename.value == userinfo.value.userinfo.name) {
			ElMessage.error('未修改')
		}else if(changename.value.length < 2 || changename.value.length > 8) {
			ElMessage.error('昵称长度为2-8')
		}else {
			let res = await changeusernameApi({
				code: 'name',
				data: changename.value
			})
			if(res.data.data.code == 2010) {
				getuserFn()
				getlistdatafn()
				ElMessage.success(res.data.data.message)
				changenameSate.value = false
			}
		}
	}else {
		ElMessage.error('不能为空')
	}
	
}

</script>

<style lang="scss" scoped>
	.chanegnamemask {
		z-index: 99;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: rgba(255,255,255,.7);
		.inp-name {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 550rpx;
			height: 350rpx;
			background-color: #fff;
			border-radius: 14rpx;
			-webkit-box-shadow: 1px 6px 18px 0px rgba(50, 50, 50, 0.75);
			-moz-box-shadow:    1px 6px 18px 0px rgba(50, 50, 50, 0.75);
			box-shadow:         1px 6px 18px 0px rgba(50, 50, 50, 0.75);
			.text-mess {
				color: #000;
				letter-spacing: 5rpx;
				width: 50%;
				font-size: 32rpx;
			}
			.nikename {
				margin-bottom: 30rpx;
				overflow: hidden;
				padding: 20rpx 0 0;
				width: 50%;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>