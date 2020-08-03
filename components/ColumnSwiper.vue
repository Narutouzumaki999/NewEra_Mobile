<template>
	<scroll-view scroll-y :style="{height: tabsSwiper}" class="swiperItem">
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
				tabsSwiper: '0px',
				columnId: this.column,
				a_showList: []
			}
		},
		props: ['column'],
		methods: {
			onPreviewNews(newsItem) {
				uni.navigateTo({
					url: `/pages/NewsPreview/NewsPreview?id=${newsItem.id}`
				})
			}
		},
		async mounted() {
			this.tabsSwiper = `calc(100vh - 80px - 624rpx - ${uni.getSystemInfoSync().statusBarHeight}px)`
			const data = {
				columnId: this.column.id,
				startRow: 0
			}
			const res = await this.$myRequest({
				url: '/app/column/getNewsList',
				data: data
			})
			this.a_showList = res.data.data
		}
	}
</script>

<style lang="scss" scoped>
</style>
