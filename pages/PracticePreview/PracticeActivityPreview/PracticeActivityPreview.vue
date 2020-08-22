<template>
	<view class="previewItem">
		<u-toast ref="uToast"></u-toast>
		<view class="title">{{title}}</view>
		<view class="content">
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="form" v-if="c_form">
			<view class="title">
				<view class="titleborder"></view>
				<view class="titletext">报名参与</view>
				<view class="titleborder"></view>
			</view>
			<view class="form-item">
				<view class="formlabel">姓名:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入姓名" v-model="c_name" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">性别:</view>
				<view class="forminput">
					<u-radio-group v-model="c_sex" size="40">
						<u-radio name='man'>男</u-radio>
						<u-radio name='woman'>女</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">年龄:</view>
				<view class="forminput">
					<u-input type="number" placeholder="请输入年龄" v-model="c_age" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">政治面貌:</view>
				<view class="forminput">
					<u-radio-group v-model="c_politicalOutlook" size="40">
						<u-radio name='party'>党员</u-radio>
						<u-radio name='group'>团员</u-radio>
						<u-radio name='croud'>群众</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">单位:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入所在单位" v-model="c_unit" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">电话:</view>
				<view class="forminput">
					<u-input type="text" disabled v-model="c_mobile" />
				</view>
			</view>
			<u-button class="submitbtn" @click="onSubmit">提交报名</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				activity: {},
				c_name: '',
				c_sex: 'man',
				c_age: '',
				c_politicalOutlook: 'party',
				c_unit: '',
				c_mobile: uni.getStorageSync("MOBILE"),
				c_form: false
			}
		},
		methods: {
			async onSubmit() {
				if (this.c_name === "" || this.c_age === "" || this.c_unit === "") {
					this.$refs.uToast.show({
						title: this.$message_inputdata,
						type: "warning",
						position: "bottom"
					})
					return
				}
				const data = {
					sign: JSON.stringify({
						name: this.c_name,
						sex: this.c_sex,
						age: this.c_age,
						politicalOutlook: this.c_politicalOutlook,
						unit: this.c_unit,
						mobile: this.c_mobile
					}),
					sessionId: uni.getStorageSync("SESSION"),
					activityId: this.activity.id
				}
				const res = await this.$myRequest({
					url: '/app/activity/signActivity',
					method: 'POST',
					data: data
				})
				if (res.data.code === 200) {
					this.$refs.uToast.show({
						title: "报名成功",
						type: "success",
						url: "/pages/Home/Home",
						position: "bottom"
					})
				} else {
					this.$refs.uToast.show({
						title: this.$message_errorsave,
						type: "error",
						position: "bottom"
					})
				}
			}
		},
		async onLoad(options) {
			this.c_form = Boolean(Number(options.data))
			const data = {
				activityId: options.id,
				sessionId: uni.getStorageSync("SESSION")
			}
			const res = await this.$myRequest({
				url: '/app/activity/getActivityDetail',
				data: data
			})
			this.activity = res.data.data
			this.title = this.activity.title
			this.content = this.$chgSpecialToText(this.activity.content)
			
			const resvol = await this.$myRequest({
				url: '/app/volunteer/getActivityVolunteer',
				data: {
					logMobile: uni.getStorageSync("MOBILE"),
					sessionId: uni.getStorageSync("SESSION")
				}
			})
			if (resvol.data.data.value === 1) {
				this.c_name = resvol.data.data.volunteer.name
				this.c_sex = resvol.data.data.volunteer.sex
				this.c_mobile = resvol.data.data.volunteer.mobile
				this.c_politicalOutlook = resvol.data.data.volunteer.politicalSituation
				const currentDate = new Date()
				this.c_age = Number(currentDate.toISOString().substr(0, 4)) - Number(resvol.data.data.volunteer.birthday.substr(0,4))
			}
		}
	}
</script>
