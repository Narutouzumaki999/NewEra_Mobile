<template>
	<scroll-view scroll-y :style="{height: height}">
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
		methods: {},
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
