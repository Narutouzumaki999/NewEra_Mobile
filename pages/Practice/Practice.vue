<template>
	<view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabsList" :current="tabsCurrent" @change="tabsChange" swiper-width="750" :isScroll="false"></u-tabs-swiper>
		</view>
		<swiper :style="{height: tabsSwiper}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item>
				<PracticeSummary @change-tab="changeTab"></PracticeSummary>
			</swiper-item>
			<swiper-item>
				<PracticeList></PracticeList>
			</swiper-item>
			<swiper-item>
				<BaseList></BaseList>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import PracticeSummary from './PracticeSummary.vue'
	import PracticeList from './PracticeList.vue'
	import BaseList from './BaseList.vue'

	export default {
		data() {
			return {
				tabsSwiper: 0,
				swiperCurrent: 0,
				tabsCurrent: 0,
				tabsList: [{
					name: '新时代文明实践中心'
				}, {
					name: '实践所'
				}, {
					name: '基地'
				}]
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(e) {
				let current = e.detail.current
				this.$refs.uTabs.setFinishCurrent(current)
				this.swiperCurrent = current
				this.tabsCurrent = current
			},
			changeTab(index) {
				document.querySelector(`.UEl_${index}`).click()
			}
		},
		mounted() {
			this.tabsSwiper = `calc(${uni.getSystemInfoSync().windowHeight}px - 80rpx)`
		},
		components: {
			PracticeSummary,
			PracticeList,
			BaseList
		}
	}
</script>

<style>

</style>
