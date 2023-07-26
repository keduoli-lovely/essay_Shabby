// 用于保存用户当前查看文章的数据,(准备废弃)

import { defineStore } from 'pinia'
import { ref } from 'vue'


export const temporary = defineStore('counter', () => {
	
	const temporarydata = ref('')
	
	return {
		temporarydata
	}
});
