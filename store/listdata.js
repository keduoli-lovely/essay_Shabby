// 用于存放首页列表数据
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue' 
import { getlistdata, getlistdatatime, getlistdatasolt } from '../apis/getlistdata.js'
import { onLoad, onPullDownRefresh } from "@dcloudio/uni-app"

export const Uselistdata = defineStore('listdata', () => {
	const Storelistdata = ref([])
	const Storelistdatatime = ref([])
	const Storelistdatasolt = ref([])

	let getlistdatafn = async (limit = 15) => {
		let res = await getlistdata(limit)
		let isnews = JSON.stringify(Storelistdata.value) === JSON.stringify(res.data.data.result) ? true : false
		Storelistdata.value = res.data.data.result
		return isnews
	}
	
	let getlistdatatimefn = async (limit = 15) => {
		let res = await getlistdatatime(limit)
		let isnews = JSON.stringify(Storelistdatatime.value) === JSON.stringify(res.data.data.result) ? true : false
		Storelistdatatime.value = res.data.data.result
			
		return isnews
	}
	
	let getlistdatasoltfn = async (limit = 15) => {
		let res = await getlistdatasolt(limit)
		let isnews = JSON.stringify(Storelistdatasolt.value) === JSON.stringify(res.data.data.result) ? true : false
		Storelistdatasolt.value = res.data.data.result
		
		return isnews
	}
	
	return {
		Storelistdata,
		Storelistdatatime,
		getlistdatafn,
		getlistdatatimefn,
		Storelistdatasolt,
		getlistdatasoltfn
	}
})