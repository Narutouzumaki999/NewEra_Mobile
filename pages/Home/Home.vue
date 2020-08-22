<template>
	<view class="home">
		<u-toast ref="uToast" />
		<view :style="{height: statusBarH + 'px'}"></view>
		<view class="title">新时代文明实践中心</view>
		<u-swiper :list="ad_list" img-mode="aspectFill" height="414" @click="onClickAdvert"></u-swiper>
		<view class="btnlist">
			<div class="btnarea">
				<button class="btn1 imgbtn" @click="onClickPractice"></button>
				<view class="btntitle">文明实践所</view>
			</div>
			<div class="btnarea">
				<button class="btn2 imgbtn" @click="onClickVolunteer"></button>
				<view class="btntitle">志愿服务队</view>
			</div>
			<div class="btnarea">
				<button class="btn5 imgbtn" @click="onClickActivityVolunteer"></button>
				<view class="btntitle">成为志愿者</view>
			</div>
		</view>
		<view class="btnlist">
			<div class="btnarea">
				<button class="btn6 imgbtn" @click="onClickActivityAdvertising"></button>
				<view class="btntitle">参与活动</view>
			</div>
			<div class="btnarea">
				<button class="btn3 imgbtn" @click="onClickModelRecommend"></button>
				<view class="btntitle">榜样推荐</view>
			</div>
			<div class="btnarea">
				<button class="btn4 imgbtn" @click="onClickVolunteerHelp"></button>
				<view class="btntitle">志愿需求</view>
			</div>
		</view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabsList" :current="tabsCurrent" @change="tabsChange" :is-scroll="true"
			 swiper-width="750"></u-tabs-swiper>
			<swiper :style="{height: tabsSwiper}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item v-for="(item, index) in tabsList" :key="index">
					<ColumnSwiper :column="item"></ColumnSwiper>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import ColumnSwiper from '../../components/ColumnSwiper.vue'
	export default {
		data() {
			return {
				statusBarH: uni.getSystemInfoSync().statusBarHeight,
				tabsSwiper: 0,
				ad_activity: '',
				ad_all: [],
				ad_list: [],
				tabsList: [],
				tabsCurrent: 0,
				swiperCurrent: 0
			}
		},
		methods: {
			async onClickAdvert(index) {
				const curActivity = this.ad_all[index]
				if (curActivity.linkType === "url") window.location.href = curActivity.url
				else if (curActivity.linkType === "practice") {
					uni.navigateTo({
						url: `/pages/PracticePreview/PracticePreview?id=${curActivity.practice}`
					})
				} else if (curActivity.linkType === "volunteer") {
					uni.navigateTo({
						url: `/pages/VolunteerPreview/VolunteerPreview?id=${curActivity.volunteerTeam}`
					})
				} else if (curActivity.linkType === "news") {
					uni.navigateTo({
						url: `/pages/NewsPreview/NewsPreview?id=${curActivity.news}`
					})
				} else if (curActivity.linkType === "activity") {
					uni.navigateTo({
						url: `/pages/PracticePreview/PracticeActivityPreview/PracticeActivityPreview?id=${curActivity.acActivity}&data=0`
					})
				}
			},
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
			onClickVolunteer() {
				uni.navigateTo({
					url: "/pages/Volunteer/Volunteer",
					animationType: 'slide-in-right',
					animationDuration: 1000
				})
			},
			onClickPractice() {
				uni.navigateTo({
					url: '/pages/Practice/Practice'
				})
			},
			onClickModelRecommend() {
				uni.navigateTo({
					url: '/pages/ModelRecommend/ModelRecommend'
				})
			},
			onClickVolunteerHelp() {
				uni.navigateTo({
					url: '/pages/VolunteerHelp/VolunteerHelp'
				})
			},
			async onClickActivityVolunteer() {
				const res = await this.$myRequest({
					url: '/app/login/checkAuth',
					data: {
						sessionId: uni.getStorageSync("SESSION")
					}
				})
				if (res.data.data.isVolunteer === 1) {
					this.$refs.uToast.show({
						title: this.$message_noactivityvolunteer,
						type: 'warning',
						position: 'bottom'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/ActivityVolunteer/ActivityVolunteer'
				})
			},
			onClickActivityAdvertising() {
				uni.navigateTo({
					url: '/pages/ActivityAdvertising/ActivityAdvertising'
				})
			}
		},
		async mounted() {
			this.tabsSwiper = `calc(${uni.getSystemInfoSync().windowHeight}px - 80rpx)`
			const res_ad_all = await this.$myRequest({
				url: '/app/advert/getAllAdverts'
			})
			this.ad_all = res_ad_all.data.data
			// this.ad_list = [{
			// 	image: this.ad_activity,
			// 	title: 'activity'
			// }]
			for (let i = 0; i < this.ad_all.length; i++) {
				this.ad_list = [...this.ad_list, {
					image: this.ad_all[i].image,
					title: `advert${i}`
				}]
			}

			// Get Column
			const res_column = await this.$myRequest({
				url: '/app/column/getAllColumns'
			})
			for (let i = 0; i < res_column.data.data.length; i++)
				this.tabsList.push({
					name: res_column.data.data[i].title,
					id: res_column.data.data[i].id
				})
		},
		onBackPress(options) {
			console.log(options)
			return false
		},
		components: {
			ColumnSwiper
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100vh;

		.title {
			font-size: 22px;
			font-weight: bolder;
			text-align: center;
			padding: 20rpx;
			line-height: 22px;
		}

		.btnlist {
			display: flex;
			padding: 20rpx;

			.btnarea {
				padding: 10rpx;
				flex: 1;

				.btn1 {
					background-image: url(../../static/btn1.png);
				}

				.btn2 {
					background-image: url(../../static/btn2.png);
				}

				.btn3 {
					background-image: url(../../static/btn3.png);
				}

				.btn4 {
					background-image: url(../../static/btn4.png);
				}

				.btn5 {
					background-image: url(../../static/launcher2.png);
				}

				.btn6 {
					background-image: url(../../static/launcher1.png);
				}

				.imgbtn {
					width: 100rpx;
					height: 100rpx;
					background-size: 100% 100%;

					&::after {
						border: none;
					}
				}

				.button-hover {
					opacity: 0.5;
				}

				.btntitle {
					padding-top: 10rpx;
					text-align: center;
					font-weight: bolder;
					line-height: 14px;
				}
			}
		}
	}
</style>
