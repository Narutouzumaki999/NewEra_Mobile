<template>
	<view class="camera">
		<camera device-position="back" flash="off" @error="error" style="width: 100px; height: 100px;"></camera>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			error(e) {
				console.log(e)
			}
		}
	}
</script>

<style scoped>
	.camera {
		width: 100%;
		height: 100vh;
	}
</style>
