<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index" @click="onPreviewPractice(item)">
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
				height: 0,
				a_showList: []
			}
		},
		async mounted() {
			const data = {
				startRow: 0
			}
			const res = await this.$myRequest({
				url: '/app/practice/getPracticeList',
				data: data
			})
			this.a_showList = res.data.data
			this.height = `calc(100vh - 44px - ${uni.getSystemInfoSync().windowTop}px)`
		},
		methods: {
			onPreviewPractice(item) {
				uni.navigateTo({
					url: `/pages/PracticePreview/PracticePreview?id=${item.id}`
				})
			}
		}
	}
</script>

<style>
</style>
