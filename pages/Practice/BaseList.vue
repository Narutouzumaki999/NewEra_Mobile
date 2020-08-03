<template>
	<scroll-view scroll-y :style="{height: height}" class="swiperItem">
		<view class="newsItem" v-for="(item, index) in a_showList" :key="index" @click="onPreviewBase(item)">
			<image :src="item.image"></image>
			<view class="newsInfo">
				<view class="title">{{item.title}}</view>
				<view class="source">{{item.address}}</view>
			</view>
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
				url: '/app/basis/getBasisList',
				data: data
			})
			this.a_showList = res.data.data
			this.height = `calc(100vh - 44px - ${uni.getSystemInfoSync().windowTop}px)`
		}
	}
</script>

<style>
</style>
