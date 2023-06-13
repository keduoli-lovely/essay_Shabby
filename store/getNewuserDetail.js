// 用于当更新了用户数据时,获取最新的用户数据,并修改pinia中用户的数据

import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { userDetail } from './UseuserDetail.js'
import { getnewuserdata } from '../apis/getnewuserdata.js'


export const NewuserDetail = defineStore('keduoli', () => {
	let { userinfo } = storeToRefs(userDetail())
	
	let getuserFn = async () => {
		if(!userinfo.value.token) return
		let res = await getnewuserdata()
		userinfo.value.userinfo = res.data.data.result
	}
	
	return {
		getuserFn
	}
})