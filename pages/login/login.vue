<template>
	<view class="login">
		<view class="disappointed">
			<el-form :model="form" :rules="rules" ref="formdata">
				
				<el-form-item label="账号" prop="Account">
				      <el-input v-model="form.Account" />
				</el-form-item>
				
				 <el-form-item label="密码" prop="password" >
				      <el-input v-model="form.password" show-password type="passwordword" autocomplete="off" />
				    </el-form-item>
					
					
				<el-form-item>
					&nbsp;&nbsp;&nbsp;&nbsp; <el-button type="primary" @click="onSubmit(formdata)">
						登入
					</el-button>
					<el-button @click="tohome">
						取消
					</el-button>
					<el-button type="success" @click="onenroll(0)">
						注册
					</el-button>
				</el-form-item>
			</el-form>
		</view>
	</view>
	
	<view class="registered" :style="{top: top + '%'}">
		<el-form :model="reForm" :rules="rules" ref="reformdata">
			
			<el-form-item label="昵称" prop="name">
			      <el-input v-model="reForm.name" />
			</el-form-item>
			<el-form-item label="账号" prop="Account">
			      <el-input v-model="reForm.Account" />
			</el-form-item>
			
			 <el-form-item label="密码" prop="password">
			      <el-input v-model="reForm.password" type="passwordword" autocomplete="off" />
			</el-form-item>
				
				
			<el-form-item>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <el-button type="success" @click="reuser(reformdata)">
					注册
				</el-button>
				<el-button @click="onenroll(100)">
					取消
				</el-button>
				
			</el-form-item>
		</el-form>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { ElMessage } from 'element-plus'
	import { login, registered } from '../../apis/login.js'
	import { userDetail } from '../../store/UseuserDetail.js'
	import { NewuserDetail } from '../../store/getNewuserDetail.js'
	let { getuserFn } = NewuserDetail()
	
	let { loginandgetinfo } = userDetail()
	// 登入/注册
	let top = ref(-100)
	// 登入数据
	let form = ref({
		password: '',
		Account: ''
	})
	// 注册数据
	let reForm = ref({
		name: '',
		password: '',
		Account: ''
	})
	
	let formdata = ref(null)
	let reformdata = ref(null)
	
	
	const rules = ref({
		Account: [
			{ required: true, message: '不能为空', trigger: 'blur'},
			{ min: 6, max: 14, message: '账号长度为6-14', trigger: 'blur'}
		],
		name: [
			{ required: true, message: '不能为空', trigger: 'blur'},
			{ min: 2, max: 8, message: '昵称长度为2-8', trigger: 'blur'}
		],
		password: [
			{ required: true, message: '不能为空', trigger: 'blur'},
			{ min: 6, max: 14, message: '密码长度为6-14', trigger: 'blur'}
		]
	})
	
	let onSubmit = (f) => {
		f.validate((v) => {
			if(v) {
				// console.log(form.value);
				// let res = await login(form.value)
				loginandgetinfo(form.value).then((data) => {
					ElMessage.success(data)
				}).catch((err) => {
					ElMessage.error('出错了')
				})
				
				getuserFn()
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}else {
				ElMessage.error('有内容未填写')
			}
		})
	}
	let reuser = (f) => {
		f.validate( async (v) => {
			if(v) {
				let res = await registered(reForm.value)
				if(res.data.data.code == 2006) {
					ElMessage.error(res.data.data.message)
				}else if(res.data.data.code == 200) {
					top.value = -100
					ElMessage.success('注册成功')
				}
			}else {
				ElMessage.error('有内容未填写')
			}
		})
	}
	let onenroll = (e) => {
		top.value = e
	}
	
	let tohome = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	
</script>

<style lang="scss" scoped>
	.login {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		.disappointed {
			width: 60%;
		}
	}
	.registered {
		transition: all .4s ease; 
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		// top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
</style>
