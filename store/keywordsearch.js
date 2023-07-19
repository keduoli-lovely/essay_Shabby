import { defineStore } from 'pinia'
import { ref } from 'vue'
import { keyword } from '../apis/keywordsearch.js'


export const keywordFn = defineStore('keywords', () => {
	
	let keyWordData = ref([])
	let keyWordDataAll = ref([])
	
	
	let getkeyword = async (key) => {
		let res = await keyword(key)
		keyWordDataAll.value = res.data
		keyWordData.value = res.data.data.slice(0, 5)
	}
	
	
	
	return {
		keyWordData,
		getkeyword,
		keyWordDataAll
	}
})