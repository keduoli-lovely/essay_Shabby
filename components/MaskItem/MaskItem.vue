<template>
	<view class="mask" v-if="changenameSate" @click="changemask"></view>
</template>

<script setup>
import { allMaskstates } from '../../store/allMaskState.js'
import { storeToRefs } from 'pinia'

let propsdata = defineProps({
    height: Number
})

let { changeStateFn } = allMaskstates()
let { changenameSate } = storeToRefs(allMaskstates())
 
let changemask = () => {
	changeStateFn(propsdata.height, false)
	
	
}

</script>

<style lang="scss" scoped>
	.mask {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: #999;
	}
</style>