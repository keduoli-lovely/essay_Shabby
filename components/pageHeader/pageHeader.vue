<template>
	<view @click="topage">
		111111111111111
	</view>
</template>

<script setup>
	
	let props = defineProps({
		path: String
	})
	
	let topage = () => {
		if(props.path) {
			uni.reLaunch({
				url: props.path
			})
		}else {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		}
	}

</script>

<style lang="scss">

</style>