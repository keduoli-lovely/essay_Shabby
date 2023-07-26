// 修改用户信息时弹出的遮罩状态
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const allMaskstates = defineStore('maskstore', () => {
	
	// 状态
	// 输入框的高度
	let inputState = ref(-700)
	  // 修改昵称时的遮罩
	let changenameSate = ref(false)
	  // 退出时的确认遮罩
	let changeloginState = ref(false)
	// 删除,或者举报的按钮 --- 显示/隐藏
	let btnMask = ref(-500)
	// 首页nav状态
	let activeName = ref('1')
	// 发布文章页/喜欢页
	let sendAndlive = ref(false)

	
	// 方法
	let changeStateFn = (height, state) => {
		if(height == -700) {
			inputState.value = height
			changenameSate.value = state
		}else if(height == -500){
			btnMask.value = height
			changenameSate.value = state
		}
	}
	
	return {
		inputState,
		changenameSate,
		changeloginState,
		btnMask,
		changeStateFn,
		activeName,
		sendAndlive
	}
})