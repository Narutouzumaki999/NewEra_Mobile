<template>
	<view class="swiperItem">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index">
			<view class="newsInfo" @click="onActivityClick(item)">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.startDate + " 至 " + item.endDate}}</view>
			</view>
			<u-button type="error" class="activitybtn" @click="onActivityClick(item)" v-if="currentDate <= new Date(item.endDate).toISOString().substr(0, 10) && item.status == 'published'">参与活动</u-button>
			<u-button class="activitybtn afterBtn" @click="onActivityClick(item)" v-if="currentDate > new Date(item.endDate).toISOString().substr(0, 10) || item.status != 'published'">活动结束</u-button>
		</view>
		<u-loadmore status="loading" icon-type="flower" :load-text="loadText" v-if="loadingShow" />
	</view>
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
				currentDate: new Date().toISOString().substr(0, 10)
			}
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
				const res = await this.$myRequest({
					url: '/app/activity/getAllAdminActivity',
					data: {
						startRow: startRow
					}
				})
				this.a_showList = this.a_showList.concat(res.data.data)
			}
		},
		async mounted() {
			const res = await this.$myRequest({
				url: '/app/activity/getAllAdminActivityCount'
			})
			this.allCount = res.data.data
			this.onReload(0)
		},
		async onReachBottom() {
			if (this.allCount > this.a_showList.length) {
				this.loadingShow = true
				await this.onReload(this.a_showList.length)
				this.loadingShow = false
			}
		}
	}
</script>

<style>

</style>
