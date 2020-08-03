<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index" @click="onPreviewNews(item)">
			<view class="newsInfo">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.source}}</view>
			</view>
			<image :src="item.cover"></image>
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
		methods: {
			onPreviewNews(newsItem) {
				uni.navigateTo({
					url: `/pages/NewsPreview/NewsPreview?id=${newsItem.id}`
				})
			}
		},
		async mounted() {
			const data = {
				practiceId: this.practiceId,
				startRow: 0
			}
			const res = await this.$myRequest({
				url: '/app/practice/getPracticeNewsList',
				data: data
			})
			this.a_showList = res.data.data
			this.height = `calc(${uni.getSystemInfoSync().windowHeight}px - 340rpx - ${uni.getSystemInfoSync().windowTop}px)`
		}
	}
</script>

<style>
</style>
