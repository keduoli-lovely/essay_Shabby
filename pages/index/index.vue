<template>
	<view class="logding" v-loading.fullscreen.lock="fullscreenLoading">
		
	</view>
	<header class="header" :class="y > 50 ? 'atv' : ''">
		<view class="pic" @click="show">
			<image v-if="!userinfo.token" :src="user.pic" mode="aspectFill"></image>
			<image v-else :src="userinfo.userinfo.pic" mode="aspectFill"></image>
		</view>
		<view class="search">
			<el-input maxlength="15" v-model="input" @input="inputgetkeyword" placeholder="search" clearable />
			
			<view class="tips" @mousemove="move" v-if="keyWordData.length > 0 && input?.length > 0">
				<view class="row-text" :class="colorindex == i ? 'atv' : '' " :data-index="i" v-for="(item, i) in keyWordData" :key="i">
					{{ item.title }}
				</view>
			</view>
		</view>
		
		<view class="message">
			<el-icon><Message /></el-icon>
		</view>
	</header>
	
	<nav class="navs">
		 <el-tabs v-model="activeName" class="demo-tabs" @tab-change="newcon">
				 <el-tab-pane label="推荐" name="1">
					 <CardItem v-for="item in Storelistdata" :key="item._id" :listdata="item" @click="todetail(item)"></CardItem>
					 
					 <view class="messagefloor" v-if="movedatamessage">
					 	没有更多数据啦!!
					 </view>
				 </el-tab-pane>

		        <el-tab-pane label="最新" name="2">
					<CardItem v-for="item in Storelistdatatime" :key="item._id" :listdata="item" @click="todetail(item)"></CardItem>
					<view class="messagefloor" v-if="movedatamessage">
						没有更多数据啦!!
					</view>
				</el-tab-pane>
		        <el-tab-pane label="热门" name="3">
					<CardItem v-for="item in Storelistdatasolt" :key="item._id" :listdata="item" @click="todetail(item)"></CardItem>
					<view class="messagefloor" v-if="movedatamessage">
						没有更多数据啦!!
					</view>
				</el-tab-pane>
		  </el-tabs>
	</nav>
	
	<view class="leftSele-mask" @click="qiuemask" v-show="isshow">
		
	</view>
	<view class="leftSele" :style="{left: left + '%'}">
		<!-- // 未登入 -->
		<view class="userInfo" v-if="!userinfo.token">
			<view class="userPic" @click="tologin">
				<image :src="user.pic" mode="aspectFill"></image>
			</view>
			<view class="username">
				<view class="name" @click.stop='changename'>
					{{ user.name }}&nbsp;&nbsp;<el-icon ><EditPen /></el-icon>
				</view>
				<span class="status">
					权限: {{ user.root ? '管理员' : '平民' }}
				</span>
				<view class="age">
					年龄: {{ user.age }}
				</view>
			</view>
			
			<view class="home-page" @click="tologin">
				详情&nbsp;<el-icon class="toIcon"><ArrowRight /></el-icon>
			</view>
		</view>
		<!-- // 已经登入 -->
		<view class="userInfo" v-else>
			<view class="userPic" @click="tologin">
				<image :src="userinfo.userinfo.pic" mode="aspectFill"></image>
			</view>
			<view class="username">
				<view class="name" @click.stop='changename'>
					{{ userinfo.userinfo.name }}&nbsp;&nbsp;<el-icon ><EditPen /></el-icon>
				</view>
				<span class="status">
					权限: {{ userinfo.userinfo.root ? '管理员' : '群众' }}
				</span>
				<view class="age">
					年龄: {{ userinfo.userinfo.age }}
				</view>
			</view>
			
			<view class="home-page" @click="tologin">
				详情&nbsp;<el-icon class="toIcon"><ArrowRight /></el-icon>
			</view>
		</view>
		
		<view class="userNav">
			<view class="communicate" @click="tomypush(false)">
				<view class="num">
					{{ essay.send?.length || 0 }}
				</view>
				<view class="com-text">
					发布
				</view>
			</view>
			<view class="communicate" @click="tomypush(true)">
				<view class="num">
					{{ essay?.live?.length || 0 }}
				</view>
				<view class="com-text">
					点赞
				</view>
			</view>
			<view class="communicate">
				<view class="num">
					0
				</view>
				<view class="com-text">
					收藏
				</view>
			</view>
		</view>
		
		<view class="move">
			<view class="con">
				<view class="top-text">
					更多服务
				</view>
				
				<view class="move-list">
					<view class="move-row">
						<el-icon class="mess"><Message /></el-icon>&nbsp;&nbsp;&nbsp;我的消息
						<view class="todirection">
							<el-icon><ArrowRight /></el-icon>
						</view>
					</view>
				</view>
				<view class="move-list" @click="tologin">
					<view class="move-row">
						<el-icon class="mess"><Document /></el-icon>&nbsp;&nbsp;&nbsp;编辑资料
						<view class="todirection">
							<el-icon><ArrowRight /></el-icon>
						</view>
					</view>
				</view>
				<view class="move-list" @click="outlogin(true)" v-if="!userinfo.token">
					<view class="move-row">
						<el-icon class="mess"><UserFilled /></el-icon>&nbsp;&nbsp;&nbsp;登入
						<view class="todirection">
							<el-icon><ArrowRight /></el-icon>
						</view>
					</view>
				</view>
				<view class="move-list" @click="outlogin(false)" v-else>
					<view class="move-row">
						<el-icon class="mess"><UserFilled /></el-icon>&nbsp;&nbsp;&nbsp;退出登入
						<view class="todirection">
							<el-icon><ArrowRight /></el-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- // 确认框 -->
	<interrogate :why="false">
		您确定要退出吗?
	</interrogate>
	<!-- // 确认框 -->
	
	<!-- // 编辑按钮 -->
	<view class="edit">
		<view class="edit-sele-state" v-show="isshowedit" @click.stop="showmask">
			<el-icon><Edit /></el-icon>
		</view>
		<view class="round" @click.stop="closemask" :style="{transform: `scale(${magnify})`}">
			
		</view>
		
		<view class="gather" v-show="!isshowedit">
				<view class="row1">
					<view class="sendessay" id="toedit" @click.stop="toEdit">
						<i class="iconfont icon-xieboke icon1"></i>发文章
					</view>
					<view class="freepic">
						<i class="iconfont icon-pic icon1"></i>分享图片
					</view>
				</view>
				
				<view class="row2">
					<view class="wait">
						<el-icon><Warning /></el-icon>
					</view><view class="wait">
						<el-icon><Warning /></el-icon>
					</view><view class="wait">
						<el-icon><Warning /></el-icon>
					</view><view class="wait">
						<el-icon><Warning /></el-icon>
					</view><view class="wait">
						<el-icon><Warning /></el-icon>
					</view><view class="wait">
						<el-icon><Warning /></el-icon>
					</view>
				</view>
		</view>
	</view>
	
	<!-- // 编辑按钮 -->
	
	<changenameItem v-if="userinfo.token"></changenameItem>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { temporary } from '../../store/Usetemporary.js'
	import { storeToRefs } from 'pinia'
	import { Alreadypublish } from '../../store/Usepublish.js'
	import { NewuserDetail } from '../../store/getNewuserDetail.js'
	import changenameItem from '../../components/changename/changenameItem.vue'
	import { allMaskstates } from '../../store/allMaskState.js'
	import { Uselistdata } from '../../store/listdata.js'
	import { useScroll, useInfiniteScroll  } from '@vueuse/core'
	import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
	import { keywordFn } from '../../store/keywordsearch.js'
	import { ElMessage } from 'element-plus'
	
	
	// 改变颜色
	let colorindex = ref(-1)
	// 获取关键字方法
	let { getkeyword } = keywordFn()
	let { keyWordData } = storeToRefs(keywordFn())
	// 编辑状态的切换
	let isshowedit = ref(true)
	// logding
	const fullscreenLoading = ref(true)
	// 保存当前页面的index
	let pageIndex = ref(1)
	// 没有跟多数提示标签的状态 --- 显示/隐藏
	let movedatamessage = ref(false)
	// 获取mask的状态 -- 显示/隐藏
	let { changenameSate, changeloginState, activeName, sendAndlive } = storeToRefs(allMaskstates())
	// 最新列表数据
	// item组件的临时数据
	let { temporarydata } = storeToRefs(temporary())
	let { userinfo } = storeToRefs(userDetail())
	// 获取用户发布过的文章
	let { getEssayList } = Alreadypublish()
	let { essay } = storeToRefs(Alreadypublish())
	let { getuserFn } = NewuserDetail()
	// 列表数据/方法
	let { Storelistdata, Storelistdatatime, Storelistdatasolt } = storeToRefs(Uselistdata())
	let { getlistdatafn, getlistdatatimefn, getlistdatasoltfn } = Uselistdata()
	let user = ref({
		name: '未登入',
		age: '0',
		pic: '/pubilc/logImg/default.png',
		root: false
	})
	onMounted(() => {
		fullscreenLoading.value = false
		// 获取文章列表a
		if(Storelistdata.value.length < 1) {
			getlistdatafn()		
		}
		// 获取用户发布的文章数据
		if(userinfo.value.token && essay.value.length < 1) {
			// user.value = userinfo.value.userinfo
			getEssayList(userinfo.value.userinfo.Account)
		}
		if(!userinfo.value.token){
			// 更新用户数据
			getuserFn()
		}

	})
	const { x, y } = useScroll(window)
	
	// 输入框关键字
	const input = ref('')
	// 获取关键字相关数据
	let timer = ref(null)
	function inputgetkeyword(key) {
		if(!input.value) {
			keyWordData.value = []
		}
		if(timer.value) {
			clearTimeout(timer.value)
			timer.value = null
		}else {
			timer.value = setTimeout(() => {
				getkeyword(key)
			}, 1000)
		}
	}
	
	let move = (e) => {
		colorindex.value = e.target.dataset.index
	}
	
	// 跳转到用户发布的文章页面
	let tomypush = (s) => {
		sendAndlive.value = s
		uni.reLaunch({
			url: '/pages/myessay/myessay'
		})
	}
	
	let left = ref(-80)
	let isshow = ref(false)
	// 侧边栏的显示与隐藏
	let show = () => {
		left.value = 0
		isshow.value = true
	}
	// 侧边栏的显示与隐藏
	let qiuemask = () => {
		left.value = -80
		isshow.value = false
	}
	// 跳转到编辑页面
	let toEdit = (e) => {
		if(e.target.id !== 'toedit') return
		let key = uni.getStorageSync('userinfo')
		if(key.token) {
			userinfo.value = key
			uni.reLaunch({
				url: '/pages/edit/edit'
			})
		}else {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}	
	}
	// 展示遮罩,显示选项
	let magnify = ref(1)
	let showmask = () => {
		isshowedit.value = false
		magnify.value = 30
	}
	// 取消上面的跳转
	let closemask = () => {
		magnify.value = 1
		isshowedit.value = true
	}
	
	// 详情页面 
	let todetail = (data) => {
		temporarydata.value = data
		uni.navigateTo({
			url: `/pages/Detail/Detail?id=${data._id}`
		})
	}
	// 登入页面/个人中心
	let tologin = () => {
		if(uni.getStorageSync('userinfo').token) {
			uni.navigateTo({
				url: '/pages/UserHome/UserHome'
			})
		}else {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	}
	// 获取最新的数据
	let newcon = (e) => {
		pageIndex.value = e
		if(e == 1) {
			if(Storelistdata.value.length > 0) return
			getlistdatafn()
		}
		else if(e == 2) {
			if(Storelistdatatime.value.length > 0) return
			getlistdatatimefn()
		}else if(e == 3) {
			if(Storelistdatasolt.value.length > 0) return
			getlistdatasoltfn()
		}
	}
	
	// 修改昵称
	let changename = () => {
		changenameSate.value = true
	}
	
	// 退出登入
	let outlogin = (e) => {
		if(e) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}else {
			changeloginState.value = true
		}
	}
	
	// 实现下拉刷新
	onPullDownRefresh(() => {
		movedatamessage.value = false
		if(pageIndex.value == 1) {
			getlistdatafn().then(res => {
				showErrorandsuccess(res)
			})
		}
		else if(pageIndex.value == 2) {
			getlistdatatimefn().then(res => {
				showErrorandsuccess(res)
			})
		}else if(pageIndex.value == 3) {
			getlistdatasoltfn().then(res => {
				showErrorandsuccess(res)
			})
		}
	})
		
	// 触底加载跟多
	onReachBottom(() => {
		// 如果当前状态为true者表示没有数据,就没必要往下走
		if(movedatamessage.value) return
		
		if(pageIndex.value == 1) {
			if(Storelistdata.value.length) {
				let limit = Storelistdata.value.length + 15
				getlistdatafn(limit).then(res => {
					showErrorandsuccess(res)
					if(res) {
						movedatamessage.value = res
					}
				})
			}
		}else if(pageIndex.value == 2) {
			if(Storelistdatatime.value.length) {
				let limit = Storelistdatatime.value.length + 15
				getlistdatatimefn(limit).then(res => {
					showErrorandsuccess(res)
					if(res) {
						movedatamessage.value = res
					}
				})
			}
			
		}else if(pageIndex.value == 3) {
			if(Storelistdatasolt.value.length) {
				let limit = Storelistdatasolt.value.length + 15
				getlistdatasoltfn(limit).then(res => {
					showErrorandsuccess(res)
					if(res) {
						movedatamessage.value = res
					}
				})
			}
		}
	})
	
	// 判断是否还有最新数据
	let showErrorandsuccess = (has) => {
		if(has) {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500)
			ElMessage({
			    showClose: true,
			    message: '已经是最新!',
			  })
		}else {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500)
			ElMessage.success('加载成功!')
		}
	}
	
</script>

<style lang="scss" scped>
	.atv {
		box-shadow: 4rpx 4rpx 8rpx rgba(0,0,0,.4);
	}
	.header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 20rpx 30rpx;
		.pic {
			width: 80rpx;
			height: 80rpx;
			overflow: hidden;
			border-radius: 50%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.search {
			position: relative;
			width: 70%;
			min-width: 50%;
			.tips {
				position: absolute;
				top: 125%;
				left: 20rpx;
				width: 340rpx;
				color: skyblue;
				background-color: #6b778c;
				// border: 1rpx solid rgba(0,0,0,.4);
				box-shadow: -1rpx -1rpx 4rpx rgba(0,0,0,.4),
					1rpx 1rpx 4rpx rgba(0,0,0,.4);
				border-radius: 5rpx;
				.row-text {
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 28rpx 24rpx 10rpx;
				}
				.atv {
					background-color: skyblue;
				}
			}
		}
		.message {
			padding-top: 14rpx;
			font-size: 50rpx;
		}
	}
	
	.navs {
		padding: 20rpx 30rpx;
		.messagefloor {
			padding: 40rpx 0 15rpx 0;
			text-align: center;
			font-size: 32rpx;
		}
	}
	
	.leftSele,
	.leftSele-mask{
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 80%;
		height: 100%;
		background-color: #6b778c;
		transition: all .3s ease-in-out;
		.userInfo {
			padding: 50rpx 40rpx;
			position: relative;
			display: flex;
			.userPic {
				margin-right: 30rpx;
				width: 140rpx;
				height: 140rpx;
				overflow: hidden;
				border-radius: 50%;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.username {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name {
					font-size: 34rpx;
					color: #fff;
				}
				.status {
					display: inline;
					padding: 5rpx;
					font-size: 28rpx;
					color: #FFAFBD;
					line-height: 20rpx;
					border: 1rpx solid #FFAFBD;
				}
				.age {
					font-size: 28rpx;
					color: #D2D2D2;
				}
			}
			.home-page {
				position: absolute;
				top: 50%;
				right: 20rpx;
				transform: translateY(-50%);
				display: flex;
				justify-content: center;
				align-items: center;
				.toIcon {
					padding-top: 6rpx;
				}
			}
			
		}
		.userNav {
			padding: 20rpx 40rpx;
			margin: 30rpx 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.communicate {
				text-align: center;
			}
		}
		
		.move {
			background-color: #151515;
			height: 100%;
			.con {
				padding: 30rpx 25rpx;
				color: #fff;
				.top-text {
					margin-bottom: 40rpx;
				}
				.move-list {
					padding-left: 25rpx;
					margin-bottom: 60rpx;
					.move-row {
						position: relative;
						font-size: 32rpx;
						line-height: 40rpx;
						height: 40rpx;
						color: #6b778c;
						.mess {
							padding-bottom: 8rpx;
							vertical-align: middle;
							font-size: 44rpx;
							color: skyblue;
						}
						
						.todirection {
							padding-top: 6rpx;
							position: absolute;
							top: 50%;
							right: 0;
							transform: translateY(-50%);
							font-size: 35rpx;
							vertical-align: middle;
						}
					}
				}
			}
		}
		
	}
	.leftSele-mask {
		width: 100%;
		z-index: 10;
		background-color: transparent;
	}
	.edit,
	.edit-sele-state {
		z-index: 999;
		padding-top: 6rpx;
		position: fixed;
		right: 60rpx;
		bottom: 100rpx;
		font-size: 60rpx;
		width: 120rpx;
		height: 120rpx;
		text-align: center;
		line-height: 120rpx;
		border-radius: 50%;
		background-color: transparent;
		.round {
			z-index: 99;
			position: absolute;
			top: 0;
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			transition: all .4s ease-in-out;
			backdrop-filter: blur(.5rpx);
			background-color: rgba(255,255,255, .6);
		}
	}
	@keyframes gat {
		0% {
			transform: rotate(5deg);
		}
		50% {
			transform: rotate(-5deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	.gather {
		transition: all 1s ease;
		z-index: 100;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 80%;
		height: 30%;
		transform: translate(-50%, -50%);
		.row1 {
			display: flex;
			justify-content: space-between;
			.sendessay,
			.freepic {
				overflow: hidden;
				animation: .4s linear 0s alternate gat;
				font-size: 32rpx;
				width: 45%;
				height: 140rpx;
				line-height: 140rpx;
				border-radius: 14rpx;
				background-color: skyblue;
				.icon1 {
					margin-right: 12rpx;
					vertical-align: bottom;
					font-size: 50rpx;
				}
			}
		}
		.row2 {
			padding: 20rpx 60rpx 0;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.wait {
				animation: .4s linear 0s alternate gat;
				margin-right: 40rpx;
				margin-top: 40rpx;
				width: 100rpx;
				height: 100rpx;
				border-radius: 14rpx;
				background-color: skyblue;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
		}
	}
	.edit-sele-state {
		background-color: skyblue;
	}
	.demo-tabs > .el-tabs__content {
	  padding: 32px;
	  color: #6b778c;
	  font-size: 32px;
	  font-weight: 600;
	}
	
</style>