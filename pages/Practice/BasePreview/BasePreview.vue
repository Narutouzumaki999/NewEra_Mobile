<template>
	<view class="previewItem">
		<view class="title">{{base.title}}</view>
		<view class="content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base: {},
				content: ""
			}
		},
		async onLoad(options) {
			const res = await this.$myRequest({
				url: '/app/basis/getBasisInfo',
				data: {
					basisId: options.id
				}
			})
			
			this.base = res.data.data
			this.content = this.$chgSpecialToText(this.base.content)
		}
	}
</script>

<style>

</style>
