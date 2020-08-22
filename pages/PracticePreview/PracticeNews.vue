<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem" @scrolltolower="onreachBottom">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index" @click="onPreviewNews(item)">
			<view class="newsInfo">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.source}}</view>
			</view>
			<u-image :src="item.cover" mode="heightFix" width="250rpx" height="135rpx" />
		</view>
		<u-loadmore status="loading" icon-type="flower" :load-text="loadText" v-if="loadingShow" />
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				allCount: 0,
				a_showList: [],
				loadingShow: false,
				loadText: {
					loading: this.$message_loading
				},
				height: 0
			}
		},
		props: ['practiceId'],
		methods: {
			onPreviewNews(newsItem) {
				uni.navigateTo({
					url: `/pages/NewsPreview/NewsPreview?id=${newsItem.id}`
				})
			},
			async onReload(startRow) {
				const data = {
					practiceId: this.practiceId,
					startRow: startRow
				}
				const res = await this.$myRequest({
					url: '/app/practice/getPracticeNewsList',
					data: data
				})
				this.a_showList = this.a_showList.concat(res.data.data)
			},
			async onreachBottom() {
				if (this.allCount > this.a_showList.length) {
					this.loadingShow = true
					await this.onReload(this.a_showList.length)
					this.loadingShow = false
				}
			}
		},
		async mounted() {
			const res = await this.$myRequest({
				url: '/app/practice/getPracticeNewsCount',
				data: {
					practiceId: this.practiceId
				}
			})
			this.allCount = res.data.data
			this.onReload(0)
			this.height = `calc(${uni.getSystemInfoSync().windowHeight}px - 420rpx)`
		}
	}
</script>

<style>
</style>
