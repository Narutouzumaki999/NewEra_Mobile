<template>
	<view class="home">
		<view :style="{height: statusBarH + 'px'}"></view>
		<view class="title">新时代文明实践中心</view>
		<u-swiper :list="ad_list" img-mode="scaleToFill" height="414" @click="onClickAdvert"></u-swiper>
		<view class="btnlist">
			<div class="btnarea">
				<button class="btn1 imgbtn" @click="onClickPractice"></button>
				<view class="btntitle">实践所汇总</view>
			</div>
			<div class="btnarea">
				<button class="btn2 imgbtn" @click="onClickVolunteer"></button>
				<view class="btntitle">志愿队</view>
			</div>
			<div class="btnarea">
				<button class="btn3 imgbtn" @click="onClickModelRecommend"></button>
				<view class="btntitle">榜样推荐</view>
			</div>
			<div class="btnarea">
				<button class="btn4 imgbtn" @click="onClickVolunteerHelp"></button>
				<view class="btntitle">志愿求助</view>
			</div>
		</view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabsList" :current="tabsCurrent" @change="tabsChange" :is-scroll="true"
			 swiper-width="750"></u-tabs-swiper>
		</view>
		<swiper :style="{height: tabsSwiper}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item v-for="(item, index) in tabsList" :key="index">
				<ColumnSwiper :column="item"></ColumnSwiper>
			</swiper-item>
		</swiper>
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
				ad_all: '',
				ad_list: [],
				tabsList: [],
				tabsCurrent: 0,
				swiperCurrent: 0
			}
		},
		methods: {
			onClickAdvert(index) {
				console.log(index)
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
			}
		},
		async mounted() {
			await this.$checkAuth()
			this.tabsSwiper = `calc(100vh - 80px - 624rpx - ${this.statusBarH}px)`
			// Get Advert
			const res_ad_activity = await this.$myRequest({
				url: '/app/advert/getActivityAdvert'
			})
			this.ad_activity = res_ad_activity.data.data.url
			const res_ad_all = await this.$myRequest({
				url: '/app/advert/getAllAdverts'
			})
			this.ad_all = res_ad_all.data.data
			this.ad_list = [{
				image: this.ad_activity,
				title: 'activity'
			}]
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
