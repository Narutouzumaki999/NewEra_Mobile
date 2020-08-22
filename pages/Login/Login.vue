<template>
	<view class="login">
		<u-toast ref="uToast"></u-toast>
		<view :style="{height: statusBarH + 'px'}"></view>
		<view class="title">新时代文明实践中心</view>
		<view class="login-main">
			<u-field v-model="phone" placeholder="请输入手机号"></u-field>
			<u-field v-model="code" placeholder="请输入验证码">
				<view slot="right" v-if="leftSeconds != 0" class="seconds">{{leftSeconds}}s</view>
				<u-button size="mini" slot="right" type="primary" @click="getCode" v-if="leftSeconds == 0">获取验证码</u-button>
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
				code: '',
				leftSeconds: 0,
				v_leftSeconds: -1
			}
		},
		methods: {
			showToast(title, type) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					position: 'bottom'
				})
			},
			calSeconds() {
				this.leftSeconds = this.leftSeconds - 1
				if (this.leftSeconds === 0) clearInterval(this.v_leftSeconds)
			},
			async getCode() {
				if (this.phone === '') {
					this.showToast(this.$message_inputdata, 'warning')
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
				if (res.data.code === 200) {
					this.leftSeconds = 60
					this.v_leftSeconds = setInterval(this.calSeconds, 1000)
					this.showToast(res.data.msg, 'info')
					return
				}
				this.showToast(res.data.msg, 'error')
			},
			async onLogin() {
				const data = {
					phone: this.phone,
					code: this.code
				}
				if (data.phone === '' || data.code === '') {
					this.showToast(this.$message_inputdata, 'warning')
					return
				}
				const res = await this.$myRequest({
					url: '/app/login/codeLogin',
					method: 'POST',
					data: data
				})
				if (res.data.code === 200) {
					uni.setStorageSync("SESSION", res.data.data)
					uni.setStorageSync("MOBILE", this.phone)
					this.$refs.uToast.show({
						title: res.data.msg,
						type: 'success',
						url: '/pages/Home/Home',
						position: 'bottom'
					})
					return
				}
				this.showToast(res.data.msg, 'error')
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			
			.seconds {
				font-weight: bolder;
				color: #2979FF;
			}
		}

		.login-action {
			margin-top: 30px;
			padding: 20px;
		}
	}
</style>
