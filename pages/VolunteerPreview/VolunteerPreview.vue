<template>
	<view class="previewItem">
		<view class="title">{{title}}</view>
		<view class="content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: ''
			}
		},
		methods: {},
		async onLoad(options) {
			const data = {
				volunteerId: options.id
			}
			const res = await this.$myRequest({
				url: '/app/volunteer/getVolunteerInfo',
				data: data
			})
			this.title = res.data.data[0].title
			this.content = this.$chgSpecialToText(res.data.data[0].content)
		}
	}
</script>

<style>

</style>
