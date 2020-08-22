<template>
	<scroll-view scroll-y :style="{height: '100%'}" class="swiperItem" @scrolltolower="onreachBottom">
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
				columnId: this.column,
				allCount: 0,
				a_showList: [],
				loadingShow: false,
				loadText: {
					loading: this.$message_loading
				}
			}
		},
		props: ['column'],
		methods: {
			onPreviewNews(newsItem) {
				uni.navigateTo({
					url: `/pages/NewsPreview/NewsPreview?id=${newsItem.id}`
				})
			},
			async onreachBottom() {
				if (this.allCount > this.a_showList.length) {
					this.loadingShow = true
					await this.onReload(this.a_showList.length)
					this.loadingShow = false
				}
			},
			async onReload(startRow) {
				const data = {
					columnId: this.column.id,
					startRow: startRow
				}
				const res = await this.$myRequest({
					url: '/app/column/getNewsList',
					data: data
				})
				this.a_showList = this.a_showList.concat(res.data.data)
			}
		},
		async mounted() {
			this.onReload(0)
			const res = await this.$myRequest({
				url: '/app/column/getNewsCount',
				data: {
					columnId: this.column.id
				}
			})
			this.allCount = res.data.data
		}
	}
</script>

<style lang="scss" scoped>
</style>
