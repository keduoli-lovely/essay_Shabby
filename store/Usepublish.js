// 用于获取用户发布的文章

import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { getuserEassyData } from '../apis/getUserEassy.js'
import { userDetail } from './UseuserDetail.js'
import { delessay } from '../apis/discard.js'
import { Uselistdata } from './listdata.js'


export const Alreadypublish = defineStore('publish', () => {
	
	let { userinfo } = storeToRefs(userDetail())
	let { getlistdatafn } = Uselistdata()
	// 存储登入用户发布过的文章
	const essay = ref([])
	
	let essay_id = ref('')
	
	// 获取登入用户发布的文章
	let getEssayList = async (id) => {
		if(!userinfo.value.token) {
			essay.value = []
			return
		}
		let res = await getuserEassyData(id)
		essay.value = res.data.data.result
	}
	
	// 删除发布过的文章
	let delfn = async () => {
		if(essay_id.value) {
			let res = await delessay(essay_id.value)
			if(res.data.data.code == 200) {
				getlistdatafn()
				return true
			}
		}
	}
	
	return {
		essay,
		getEssayList,
		delfn,
		essay_id
	}
})