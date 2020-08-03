<template>
	<view class="previewItem">
		<view class="title">{{news.title}}</view>
		<view class="source">{{source}}</view>
		<view class="content">
			<view v-if="videoUrl!=''">
				<video :src="videoUrl" :poster="videoCover" controls></video>
			</view>
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: {},
				source: '',
				content: '',
				videoCover: '',
				videoUrl: ''
			}
		},
		methods: {},
		async onLoad(options) {
			const data = {
				newsId: options.id
			}
			const res = await this.$myRequest({
				url: '/app/column/getNewsDetail',
				data: data
			})
			this.news = res.data.data[0]
			this.source = `作者: ${this.news.createUser} ${this.news.publishTime.substr(0,10)}`
			this.videoUrl = this.news.videoUrl
			this.videoCover = this.news.videoCover
			this.content = this.$chgSpecialToText(this.news.content)
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
