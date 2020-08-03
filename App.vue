<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/style/form.scss";
	@import "@/style/swiperItem.scss";
	@import "@/style/previewItem.scss";

	/*每个页面公共css */
	.u-label {
		flex: 0 0 !important;
	}
</style>
