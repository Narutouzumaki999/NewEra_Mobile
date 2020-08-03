<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index" @click="onPreviewVolunteer(item)">
			<view class="newsInfo">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.address}}</view>
			</view>
			<image :src="item.image"></image>
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
		methods: {
			onPreviewVolunteer(item) {
				uni.navigateTo({
					url: `/pages/VolunteerPreview/VolunteerPreview?id=${item.id}`,
					animationType: 'zoom-fade-out',
					animationDuration: 400
				})
			}
		},
		async mounted() {
			const data = {
				volunteerType: 'squadron',
				startRow: 0
			}
			const res = await this.$myRequest({
				url: '/app/volunteer/getVolunteerList',
				data: data
			})
			this.a_showList = res.data.data
			this.height = `calc(100vh - 44px - ${uni.getSystemInfoSync().windowTop}px)`
		}
	}
</script>

<style>
</style>
