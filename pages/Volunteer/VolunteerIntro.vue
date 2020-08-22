<template>
	<scroll-view scroll-y :style="{height: height}">
		<view class="relationBtn">
			<view class="lineBtnGroup">
				<view class="firstBtnGroup">
					<div class="rotateLine1"></div>
					<u-button type="primary" class="firstBtn">志愿总队</u-button>
					<div class="rotateLine2"></div>
				</view>
			</view>
			<view class="secondBtnGroup">
				<u-button type="primary" @click="changeTab(1)">志愿中队</u-button>
				<u-button type="primary" @click="changeTab(2)">特殊服务队</u-button>
			</view>
		</view>
		<view class="volunteerintro">
			<rich-text :nodes="content"></rich-text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				height: 0
			}
		},
		methods: {
			changeTab(index) {
				this.$emit("change-tab", index)
			}
		},
		async mounted() {
			const res = await this.$myRequest({
				url: '/app/volunteer/getVolunteerHome'
			})
			this.content = this.$chgSpecialToText(res.data.data.content)
			this.height = `calc(100vh - 44px - ${uni.getSystemInfoSync().windowTop}px)`
		}
	}
</script>

<style scoped>
	.volunteerintro {
		padding: 20rpx;
	}
</style>
