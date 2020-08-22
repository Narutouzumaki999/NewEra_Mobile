<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem" @scrolltolower="onreachBottom">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index">
			<view class="newsInfo" @click="onActivityClick(item)">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.startDate + " 至 " + item.endDate}}</view>
			</view>
			<u-button type="error" class="activitybtn" @click="onActivityClick(item)" v-if="currentDate <= new Date(item.endDate).toISOString().substr(0, 10) && item.status == 'published'">参与活动</u-button>
			<u-button class="activitybtn afterBtn" @click="onActivityClick(item)" v-if="currentDate > new Date(item.endDate).toISOString().substr(0, 10) || item.status != 'published'">活动结束</u-button>
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
				height: 0,
				currentDate: new Date().toISOString().substr(0, 10)
			}
		},
		props: ['practiceId'],
		async mounted() {
			const res = await this.$myRequest({
				url: '/app/activity/getAllPracticeActivityCount',
				data: {
					practiceId: this.practiceId
				}
			})
			this.allCount = res.data.data
			this.onReload(0)
			this.height = `calc(${uni.getSystemInfoSync().windowHeight}px - 420rpx)`
		},
		methods: {
			onActivityClick(item) {
				var data = 0
				if (this.currentDate <= new Date(item.endDate).toISOString().substr(0, 10) && item.status == 'published') data = 1
				uni.navigateTo({
					url: `/pages/PracticePreview/PracticeActivityPreview/PracticeActivityPreview?id=${item.id}&data=${data}`
				})
			},
			async onReload(startRow) {
				const data = {
					practiceId: this.practiceId,
					startRow: startRow
				}
				const res = await this.$myRequest({
					url: '/app/activity/getAllPracticeActivity',
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
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
