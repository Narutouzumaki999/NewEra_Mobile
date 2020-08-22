<template>
	<scroll-view scroll-y :style="{height: '100%'}" class="swiperItem" @scrolltolower="onreachBottom">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index" @click="onPreviewVolunteer(item)">
			<view class="newsInfo">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.address}}</view>
			</view>
			<u-image :src="item.image" mode="heightFix" width="250rpx" height="135rpx" />
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
				}
			}
		},
		async mounted() {
			const res = await this.$myRequest({
				url: '/app/volunteer/getVolunteerCount',
				data: {
					volunteerType: 'service'
				}
			})
			this.allCount = res.data.data
			this.onReload(0)
		},
		methods: {
			onPreviewVolunteer(item) {
				uni.navigateTo({
					url: `/pages/VolunteerPreview/VolunteerPreview?id=${item.id}`,
					animationType: 'zoom-fade-out',
					animationDuration: 400
				})
			},
			async onReload(startRow) {
				const data = {
					volunteerType: 'service',
					startRow: startRow
				}
				const res = await this.$myRequest({
					url: '/app/volunteer/getVolunteerList',
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

<style>
</style>
