<template>
	<view class="login">
		<u-toast ref="uToast"></u-toast>
		<view :style="{height: statusBarH + 'px'}"></view>
		<view class="title">新时代文明中心</view>
		<view class="login-main">
			<u-field v-model="phone" placeholder="请输入手机号"></u-field>
			<u-field v-model="code" placeholder="请输入验证码">
				<u-button size="mini" slot="right" type="primary" @click="getCode">获取验证码</u-button>
			</u-field>
		</view>
		<view class="login-action">
			<u-button type="primary" @click="onLogin">登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarH: uni.getSystemInfoSync().statusBarHeight,
				phone: '',
				code: ''
			}
		},
		methods: {
			async getCode() {
				if (this.phone === '') {
					this.$refs.uToast.show({
						title: this.$message_inputdata,
						type: 'warning',
						position: 'top'
					})
					return
				}
				const data = {
					phone: this.phone
				}
				const res = await this.$myRequest({
					url: '/app/login/sendSmsCode',
					method: 'GET',
					data: data
				})
			},
			async onLogin() {
				const data = {
					phone: this.phone,
					code: this.code
				}
				if (data.phone === '' || data.code === '') {
					this.$refs.uToast.show({
						title: this.$message_inputdata,
						type: 'warning',
						position: 'top'
					})
					return
				}
				const res = await this.$myRequest({
					url: '/app/login/codeLogin',
					method: 'POST',
					data: data
				})
				uni.setStorageSync("SESSION", res.data.data)
				uni.setStorageSync("MOBILE", this.phone)
				uni.navigateTo({
					url: "/pages/Home/Home"
				})
			}
		},
		onLoad() {
			const SESSION = uni.getStorageSync("SESSION")
			if (SESSION !== "") {
				uni.navigateTo({
					url: "/pages/Home/Home"
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100wh;
		height: 100vh;

		.title {
			font-size: 25px;
			font-weight: bolder;
			text-align: center;
			padding-top: 20vh;
		}

		.login-main {
			margin-top: 10vh;
			padding: 20px;

			.u-border-bottom {
				&::after {
					border-bottom: 1px solid #333 !important;
				}
			}
		}

		.login-action {
			margin-top: 30px;
			padding: 20px;
		}
	}
</style>
