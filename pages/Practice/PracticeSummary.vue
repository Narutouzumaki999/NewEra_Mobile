<template>
	<scroll-view scroll-y :style="{height: height}">
		<view class="relationBtn">
			<view class="lineBtnGroup">
				<view class="firstBtnGroup">
					<div class="rotateLine1"></div>
					<u-button type="primary" class="firstBtn">新时代文明<br />实践中心</u-button>
					<div class="rotateLine2"></div>
				</view>
			</view>
			<view class="secondBtnGroup">
				<u-button type="primary" @click="changeTab(1)">实践所</u-button>
				<u-button type="primary" @click="changeTab(2)">基地</u-button>
			</view>
		</view>
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
			this.height = `calc(${uni.getSystemInfoSync().windowHeight}px - 80rpx`
		},
		methods: {
			changeTab(index) {
				this.$emit("change-tab", index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.psummary {
		padding: 20rpx;
	}
</style>
