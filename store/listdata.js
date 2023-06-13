// 用于存放首页列表数据
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue' 
import { getlistdata, getlistdatatime, getlistdatasolt } from '../apis/getlistdata.js'

export const Uselistdata = defineStore('listdata', () => {
	const Storelistdata = ref([])
	const Storelistdatatime = ref([])
	const Storelistdatasolt = ref([])

	let getlistdatafn = async () => {
		let res = await getlistdata()
		Storelistdata.value = res.data.data.result
	}
	
	let getlistdatatimefn = async () => {
		let res = await getlistdatatime()
		Storelistdatatime.value = res.data.data.result
	}
	
	let getlistdatasoltfn = async () => {
		let res = await getlistdatasolt()
		Storelistdatasolt.value = res.data.data.result
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