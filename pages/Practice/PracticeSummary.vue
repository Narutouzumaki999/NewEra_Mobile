<template>
	<scroll-view scroll-y :style="{height: height}">
		<view class="psummary">
			<rich-text :nodes="content"></rich-text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				height: 0,
				content: ''
			}
		},
		async mounted() {
			const res = await this.$myRequest({
				url: '/app/practice/getPracticeHome'
			})
			this.content = this.$chgSpecialToText(res.data.data.content)
			this.height = `calc(100vh - 44px - ${uni.getSystemInfoSync().windowTop}px)`
		}
	}
</script>

<style lang="scss" scoped>
	.psummary {
		padding: 20rpx;
	}
</style>
