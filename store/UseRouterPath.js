import { defineStore } from 'pinia'
import { ref } from 'vue'

export const routerhis = defineStore('his', () => {
	
	let pathUrl = ref('/pages/index/index')
	
	let useridsearch = ref('')
	
	let changePathFn = (p) => {
		pathUrl.value = p
	}
	let changeuserid = (id) => {
		useridsearch.value = id
	}
	
	return {
		pathUrl,
		changePathFn,
		useridsearch,
		changeuserid
	}
})