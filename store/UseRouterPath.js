import { defineStore } from 'pinia'
import { ref } from 'vue'

export const routerhis = defineStore('his', () => {
	
	let pathUrl = ref('/pages/index/index')
	
	let changePathFn = (p) => {
		pathUrl.value = p
	} 
	
	return {
		pathUrl,
		changePathFn
	}
})