import { defineStore } from 'pinia'
import { ref } from 'vue'

export const config = defineStore('configfile', () => {
	
	const BaseUrl = ref('http://127.0.0.1:3000')
	
	return {
		BaseUrl
	}
})