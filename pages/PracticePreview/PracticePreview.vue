<template>
	<view class="practice">
		<view class="proimg">
			<image :src="practice.image" mode="aspectFit"></image>
		</view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabsList" :current="tabsCurrent" @change="tabsChange" swiper-width="750" :isScroll="false"></u-tabs-swiper>
		</view>
		<swiper :style="{height: tabsSwiper}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" v-if="b_loading">
			<swiper-item>
				<PracticeInfo :practice="practice" />
			</swiper-item>
			<swiper-item>
				<PracticeNews :practiceId="practice.id" />
			</swiper-item>
			<swiper-item>
				<PracticeActivity :practiceId="practice.id" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import PracticeInfo from './PracticeInfo.vue'
	import PracticeNews from './PracticeNews.vue'
	import PracticeActivity from './PracticeActivity.vue'
	export default {
		data() {
			return {
				practice: {},
				tabsList: [{
						name: '简介'
					},
					{
						name: '理论发布'
					},
					{
						name: '实践所活动'
					}
				],
				tabsSwiper: 0,
				swiperCurrent: 0,
				tabsCurrent: 0,
				b_loading: false
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
			}
		},
		async onLoad(options) {
			const data = {
				practiceId: options.id
			}
			const res = await this.$myRequest({
				url: '/app/practice/getPracticeInfo',
				data: data
			})
			this.practice = res.data.data[0]
			uni.setNavigationBarTitle({
				title: this.practice.title
			})
			this.b_loading = true
			this.tabsSwiper =
				`calc(${uni.getSystemInfoSync().windowHeight}px - 340rpx - ${uni.getSystemInfoSync().windowTop}px)`
		},
		components: {
			PracticeInfo,
			PracticeNews,
			PracticeActivity
		}
	}
</script>

<style lang="scss" scoped>
	.practice {
		.proimg {
			text-align: center;
			padding: 20rpx;

			image {
				height: 300rpx;
			}
		}
	}
</style>
