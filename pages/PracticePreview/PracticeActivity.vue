<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index">
			<view class="newsInfo">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.startDate + " 至 " + item.endDate}}</view>
			</view>
			<u-button type="error" class="activitybtn" @click="onActivityClick(item)">我要报名</u-button>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				a_showList: [],
				height: 0
			}
		},
		props: ['practiceId'],
		async mounted() {
			const data = {
				practiceId: this.practiceId,
				startRow: 0
			}
			const res = await this.$myRequest({
				url: '/app/activity/getAllPracticeActivity',
				data: data
			})
			this.a_showList = res.data.data
			this.height = `calc(${uni.getSystemInfoSync().windowHeight}px - 340rpx - ${uni.getSystemInfoSync().windowTop}px)`
		},
		methods: {
			onActivityClick(item) {
				uni.navigateTo({
					url: `/pages/PracticePreview/PracticeActivityPreview/PracticeActivityPreview?id=${item.id}`
				})
			}
		}
	}
</script>

<style>
</style>
