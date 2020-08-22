<template>
	<view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabsList" :current="tabsCurrent" @change="tabsChange" swiper-width="750" :isScroll="false"></u-tabs-swiper>
		</view>
		<swiper :style="{height: tabsSwiper}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item>
				<VolunteerIntro @change-tab="changeTab"></VolunteerIntro>
			</swiper-item>
			<swiper-item>
				<VolunteerSquadron></VolunteerSquadron>
			</swiper-item>
			<swiper-item>
				<VolunteerService></VolunteerService>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import VolunteerIntro from './VolunteerIntro.vue'
	import VolunteerSquadron from './VolunteerSquadron.vue'
	import VolunteerService from './VolunteerService.vue'
	
	export default {
		data() {
			return {
				tabsSwiper: 0,
				swiperCurrent: 0,
				tabsCurrent: 0,
				tabsList: [{
					name: '志愿总队'
				}, {
					name: '志愿中队'
				}, {
					name: '特殊服务队'
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
			VolunteerIntro,
			VolunteerSquadron,
			VolunteerService
		}
	}
</script>

<style>

</style>
