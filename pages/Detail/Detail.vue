<template>
	<view class="detail" v-if="temporarydata">
		<el-page-header @back="backtohome" :icon="ArrowLeft">
		    <template #content>
		      <span class="text-large font-600 mr-3" style="white-space: nowrap;"> {{ temporarydata.title }} </span>
			<view class="disappointed" @click="Leave">
				<el-icon><MoreFilled /></el-icon>
				
			</view>
			<view class="move" :style="{bottom: btnMask + 'rpx'}">
				<view class="delrow" v-if="isRoot" >
					<el-icon class="icon11" @click.stop="delfn"><Delete /></el-icon>
					<view class="move-text">
						删除文章
					</view>
				</view>
				<view class="report" v-else>
					<el-icon class="icon11"><Warning /></el-icon>
					<view class="move-text">
						举报
					</view>
				</view>
			</view>
			
		    </template>
			
		  </el-page-header>
		  <view style="height:45rpx">
		  	
		  </view>
		<el-card>
			
			<view class="author">
				<view class="pic">
					<image :src="temporarydata?.user?.pic" mode="aspectFill"></image>
				</view>
				
				<view class="userinfo">
					<view class="name">
						{{ temporarydata?.user?.name }}
					</view>
					<view class="time">
						{{ temporarydata?.time?.split('T')[0] }}
					</view>
				</view>
			</view>
			<view style="height:30rpx"></view>
			<view class="title">
				{{ temporarydata?.title }}
			</view>
			{{ temporarydata?.text[0] }}
		</el-card>
		<view style="height:20rpx"></view>		
		
		<el-card>
			<view class="live-nav">
				<view class="nav-left">
					<el-dropdown trigger="click" @command="select">
						<span class="el-dropdown-link">
						 回复 {{ testdata?.length}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
						</span>
						<template #dropdown>
						  <el-dropdown-menu >
							<el-dropdown-item :command="1" >默认排序</el-dropdown-item>
							<el-dropdown-item :command="2" >按时间排序</el-dropdown-item>
							<el-dropdown-item :command="3" >按热度排序</el-dropdown-item>
							<el-dropdown-item :command="4" >只看楼主</el-dropdown-item>
						  </el-dropdown-menu>
						</template>
					  </el-dropdown>
				</view>
				<view class="nav-right">
					转发 0
				</view>
			</view>
		</el-card>
		<view style="height:20rpx"></view>
		<el-card>
			<view class="Commentarea">
				<view class="pl-title">
					热门回复
				</view>
				
				<view class="pl-box" v-for="item in testdata" :key="item.id">
					<view class="header">
						<view class="pl-pic">
							<image :src="item?.pic" mode="aspectFill"></image>
						</view>
						<view class="pl-text-box">
							<view class="pl-name">
								{{ item.name }}
							</view>
							<view class="pl-content">
								{{ item.text }}
							</view>
						</view>
					</view>
					
					<view class="floor-detail">
						<view class="floor-time">
							{{ dayjs(item.time).format('MM-DD') }}
						</view>
						<view class="floor-btn">
							<view class="like-btn">
								<i class="iconfont icon-dianzan_kuai btn-icon"></i> <text class="t22">{{ item?.live?.length || 0 }}</text>
							</view>
							<view class="pl-btn">
								<el-icon class="btn-icon"><ChatDotRound /></el-icon> <text class="t22">0</text>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</el-card>
		
		<view class="oter">
			<view class="inpt-send">
				<el-icon><EditPen /></el-icon>
				<view class="keduoli" @click="topl">
					写回复
				</view>
			</view>
			
			<view class="oter-box">
				<view class="like" @click="liveEssay">
					<text class="t11">{{ temporarydata?.live.length }}</text>
					<view class="icon" :class="islive ? 'atv' : ''">
						<i class="iconfont icon-dianzan_kuai alicon"></i>
					</view>
				</view>
				
				<view class="add">
					<text class="t11">{{ temporarydata?.star.length }}</text>
					<view class="icon">
						<el-icon><StarFilled /></el-icon>
					</view>
				</view>
				
				<view class="give">
					<text class="t11">{{ temporarydata?.geiv }}</text>
					<view class="icon">
						<i class="iconfont icon-fenxiangfangshi alicon"></i>
					</view>
				</view>
			</view>
		</view>
		<!-- // 遮罩 -->
		<MaskItem :height='height' ></MaskItem>
		<view class="textarea-click" :style="{bottom: inputState + 'rpx'}">
			<view class="title-text">
				<view class="call">
					回复
				</view>
				<view class="push" @click="sendhuifu" :class="textarea.length > 1 ? 'atv' : ''">
					发布
				</view>
			</view>
			<el-input
				ref="ke"
			    v-model="textarea"
			    :rows="2"
			    type="textarea"
			    :placeholder="'回复: ' + atname"
				input-style="height: 100%"
				maxlength="350"
				minlength="2"
				autofocus
			  />
		</view>
		<!-- // mask -->
		<interrogate :why="true">
			您确定要删除吗?
		</interrogate>
	</view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { ArrowLeft } from '@element-plus/icons-vue'
	import { temporary } from '../../store/Usetemporary.js'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { storeToRefs } from 'pinia'
	import { addlike } from '../../apis/addlike.js'
	import { allMaskstates } from '../../store/allMaskState.js'
	import { postreply, getreply, getreplytime } from '../../apis/getreply.js'
	import { dayjs, ElMessage } from 'element-plus'
	import { Alreadypublish } from '../../store/Usepublish.js'

	let testdata = ref([])
	// 获取用户最文章的新数据
	let { getEssayList } = Alreadypublish()
	
	// 点击mask,传入元素的高度
	let height = ref(0)
	let { temporarydata } = storeToRefs(temporary())
	let { userinfo } = storeToRefs(userDetail())
	let { essay_id } = storeToRefs(Alreadypublish())
	// 输入框数据
	let ke = ref(null)
	let textarea = ref('')
	let atname = ref(temporarydata?.value?.user?.name || '珂朵莉')
	// 改变输入框的状态
	let { changenameSate, inputState, btnMask, changeloginState } = storeToRefs(allMaskstates())
	let { changeStateFn } = allMaskstates()
	
	// 当用户刷新页面,数据就会丢失,此时就需要将用户重定向
	onMounted( async () => {
		window.scrollTo(0, 0)
		if(!temporarydata.value) {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}else {
			let res = await getreply(temporarydata.value._id)
			testdata.value = res.data.data.result
		}
		
	})
	
	// 用户点击输入框,滑倒评论区
	let topl = () => {
		if(!userinfo.value.token) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}else {
			height.value = -700
			ke.value.focus()
			inputState.value = 0
			changenameSate.value = true
		}	
	}
	
	let backtohome = () => {
		uni.navigateTo({
			url: '/pages/index/index'
		})
	}
	let liveEssay = async () => {
		if(!temporarydata.value._id) return
		let res = await addlike(temporarydata.value._id)
		if(res.data.data.code == 201) {
			temporarydata.value.live = res.data.data.count
			ElMessage.success(res.data.data.message)
			getEssayList(userinfo.value.userinfo.Account)
		}
	}
	let islive = computed(() => {
		if(userinfo.value.token) {
			let tmp = temporarydata.value.live.some(item => userinfo.value.userinfo.Account == item)
			return tmp
		}else {
			return false
		}
	})
	let isRoot = computed(() => {
		let ifshow = false
		if(userinfo.value.token) {
			if(userinfo.value.userinfo.root) {
				return true
			}else {
				return userinfo.value.userinfo.Account == temporarydata.value.user_id ? true : false
			}
		}else {
			return false
		}
	})
	// 发送评论
	let sendhuifu = async () => {
		if(textarea.value.length > 1 && textarea.value.length < 350) {
			if(userinfo.value.token) {
				let res = await postreply({
					userid: userinfo.value.userinfo.Account,
					essayid: temporarydata.value._id,
					text: textarea.value,
					name: userinfo.value.userinfo.name,
					pic: userinfo.value.userinfo.pic
				})
				if(res.data.data.code == 201) {
					inputState.value = -700
					changenameSate.value = false
					textarea.value = ''
					let res1 = await getreply(temporarydata.value._id)
					testdata.value = res1.data.data.result
					ElMessage.success(res.data.data.message)
				}
			}
		}
	}
	
	// 选着评论的排序
	let select = async (e) => {
		if(e == 1) {
			let res1 = await getreply(temporarydata.value._id)
			testdata.value = res1.data.data.result
		}else if(e == 2) {
			// let res = await getreplytime(temporarydata.value._id)
			// console.log(res.data.data.result)
			testdata.value = testdata.value.reverse()
		}
	}
	
	// 文章中的更多选项
	let Leave = () => {
		btnMask.value = 0
		changenameSate.value = true
		height.value = -500
	}
	
	// 删除文章
	let delfn = () => {
		essay_id.value = temporarydata.value._id
		changeloginState.value = true
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 40rpx 20rpx 150rpx;
		.disappointed {
			position: fixed;
			top: 42rpx;
			right: 30rpx;
			transform: rotate(90deg);
			
		}
		.move {
			transition: all .4s ease;
			display: flex;
			text-align: center;
			z-index: 999;
			position: fixed;
			left: 0;
			padding: 40rpx 20rpx;
			color: #000;
			width: 100%;
			height: 500rpx;
			background-color: #fff;
			box-shadow: 4rpx 4rpx 8rpx rgba(0,0,0,.2),
			-4rpx -4rpx 8rpx rgba(0,0,0,.2);
			background-color: #fff;
			.delrow,
			.report {
				margin-right: 40rpx;
				// display: flex;
				font-size: 26rpx;
				.icon11 {
					margin-bottom: 10rpx;
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					font-size: 65rpx;
					border-radius: 50%;
					background-color: rgba(0,0,0,.3);
				}
			}

		}
		.title {
			margin-bottom: 30rpx;
			font-size: 50rpx;
		}
		.live-nav {
			display: flex;
			align-items: center;
			.nav-left {
				display: flex;
				flex: 4;
				opacity: .7;
				.icon-nav {
					font-size: 40rpx;
				}

			}
			.nav-right {
				text-align: right;
				flex: 6;
			}
		}
		.Commentarea {
			.pl-title {
				padding: 20rpx 0 40rpx 0;
			}
			.pl-box {
				margin-bottom: 60rpx;
				.header {
					display: flex;
					margin-bottom: 20rpx;
					.pl-pic {
						margin-right: 20rpx;
						width: 70rpx;
						height: 70rpx;
						overflow: hidden;
						border-radius: 50%;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.pl-text-box {
						padding-top: 2rpx;
						color: skyblue;
						.pl-name {
							margin-bottom: 8rpx;
						}
						.pl-content {
							color: rgba(0,0,0,.6);
							font-size: 24rpx;
						}
					}
				}
			}
			.floor-detail {
				padding: 0 8rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.floor-time {
					color: rgba(0,0,0,.3);
					font-size: 26rpx;
				} 
				.floor-btn {
					display: flex;
					align-items: center;
					color: rgba(0,0,0,.6);
					font-size: 26rpx;
					font-weight: 550;
					.like-btn,
					.pl-btn {
						display: flex;
						align-items: center;
						margin-right: 40rpx;
					}
					.like-btn {
						color: rgba(0,0,0,.2);
					}
					.btn-icon {
						vertical-align: middle;
						font-size: 35rpx;
					}
					.t22 {
						padding-top: 6rpx;
						color: rgba(0,0,0,.6);
						padding-left: 15rpx;
						display: block;
					}
				}
			}
			
		}
		.author {
			display: flex;
			align-items: center;
			.pic {
				margin-right: 30rpx;
				width: 90rpx;
				height: 90rpx;
				overflow: hidden;
				border-radius: 50%;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.userinfo {
				.name {
					line-height: 40rpx;
				}
				.time {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
		.oter {
			padding: 10rpx 0 10rpx 30rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			text-align: center;
			color: skyblue;
			box-shadow: -2rpx -2rpx 20rpx #2d2d2d2d;
			background-color: #fff;
			.inpt-send {
				flex: 4;
				display: flex;
				align-items: center;
				.keduoli {
					padding-left: 15rpx;
					color: rgba(0,0,0,.3)
				}
				
			}
			.oter-box {
				padding-top: 15rpx;
				flex: 6;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				.like,
				.add,
				.give {
					position: relative;
				}
				.t11 {
					position: absolute;
					top: -18rpx;
					right: -14rpx;
					font-size: 28rpx;
					font-weight: 550;
				}
				.icon {
					display: flex;
					align-items: center;
					font-size: 50rpx;
					color: #999;
				}
				.alicon {
					font-size: 38rpx;
					// margin-bottom: 10rpx;
				}
				.atv {
					color: red;
				}
			}
		}
		
		.textarea-click {
			z-index: 999;
			position: fixed;
			left: 0;
			width: 100%;
			max-height: 700rpx;
			height: 800rpx;
			background-color: #fff;
			box-shadow: 4rpx 4rpx 20rpx #9999;
			transition: all .4s ease;
			.title-text {
				padding: 40rpx;
				display: flex;
				justify-content: space-between;
				font-weight: 550;
				background-color: #fff;
				.push {
					opacity: .6;
				}
				.atv {
					opacity: 1;
					color: skyblue;
				}
			}
		}
	}
	::v-deep .el-input__wrapper,
	::v-deep .el-textarea__inner {
		box-shadow: none;
	}
	::v-deep .el-input__wrapper:hover,
	::v-deep .el-textarea__inner {
		box-shadow: none;
	}
	
</style>
.navigateBackMiniProgram({
	<custom-tab-bar direction="" :show-icon="" :selected="" @onTabItemTap="" />
})