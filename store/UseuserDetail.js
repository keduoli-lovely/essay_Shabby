// 用于管理用户数据,也提供退出方法
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch  } from 'vue'
import { login } from '../apis/login.js'
import { Alreadypublish } from './Usepublish.js'



export const userDetail = defineStore('user', () => {
	
	const userinfo = ref(uni.getStorageSync('userinfo'))
	
	const userbgpic = ref(`http://127.0.0.1:3000/bg.jpg`)
	
	if(userinfo.value) {
		watch(userinfo.value, (newValue, oldValue) => {
			userinfo.value = newValue
		      uni.setStorageSync('userinfo', newValue)
		    });
	}
	
	const loginandgetinfo = async (data) => {
		let res = await login(data)
		userinfo.value = res.data.data
		uni.setStorageSync('userinfo', userinfo.value)
		if(res.data.data.code == 2000) {
			return res.data.data.message
		}
	}
	
	// 退出登入
	let outloginpop = () => {
		let { essay } = storeToRefs(Alreadypublish())
		essay.value = []
		userinfo.value = ''
		uni.removeStorageSync('userinfo')
	}
	
	// 更换背景图片
	let changebgpic = (url) => {
		userbgpic.value = url
	}
	
	return {
		userinfo,
		loginandgetinfo,
		outloginpop,
		userbgpic,
		changebgpic
	}
});
