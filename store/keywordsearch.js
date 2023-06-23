import { defineStore } from 'pinia'
import { ref } from 'vue'
import { keyword } from '../apis/keywordsearch.js'


export const keywordFn = defineStore('keywords', () => {
	
	let keyWordData = ref([])
	
	
	let getkeyword = async (key) => {
		let res = await keyword(key)
		
		keyWordData.value = res.data
	}
	
	
	
	return {
		keyWordData,
		getkeyword
	}
})