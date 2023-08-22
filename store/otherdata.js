import { defineStore } from 'pinia'
import { ref } from 'vue'

export const otherdata = defineStore('other', () => {
	let detail_choice = ref(false)
	
	return {
		detail_choice
	}
})