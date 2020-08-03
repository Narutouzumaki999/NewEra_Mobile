<template>
	<view class="previewItem">
		<view class="title">{{title}}</view>
		<view class="content">
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="form">
			<view class="title">
				<view class="titleborder"></view>
				<view class="titletext">报名参与</view>
				<view class="titleborder"></view>
			</view>
			<view class="form-item">
				<view class="formlabel">被推荐人姓名:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入姓名" v-model="c_name" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">性别:</view>
				<view class="forminput">
					<u-radio-group v-model="c_sex" size="50">
						<u-radio name='man'>男</u-radio>
						<u-radio name='woman'>女</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">年龄:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入年龄" v-model="c_age" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">政治面貌:</view>
				<view class="forminput">
					<u-radio-group v-model="c_politicalOutlook" size="50">
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
					<u-input type="text" disabled />
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
				c_unit: ''
			}
		},
		methods: {
			onSubmit() {
				const data = {
					sign: {
						name: this.c_name,
						sex: this.c_sex,
						age: this.c_age,
						politicalOutlook: this.c_politicalOutlook,
						unit: this.c_unit,
						mobile: this.c_mobile
					},
					sessionId: uni.getStorageSync("SESSION"),
					activityId: this.activity.id
				}
				console.log(data)
			}
		},
		async onLoad(options) {
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
		}
	}
</script>

