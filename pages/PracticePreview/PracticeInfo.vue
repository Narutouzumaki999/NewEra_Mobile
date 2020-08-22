<template>
	<scroll-view scroll-y :style="{height: height}">
		<view class="practiceinfo">
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
		props: ['practice'],
		methods: {},
		mounted() {
			this.content = this.$chgSpecialToText(this.practice.description)
			this.height =
				`calc(${uni.getSystemInfoSync().windowHeight}px - 420rpx)`
		}
	}
</script>

<style lang="scss" scoped>
	.practiceinfo {
		padding: 20rpx;
	}
</style>
