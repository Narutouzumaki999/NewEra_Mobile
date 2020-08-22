<template>
	<view class="form">
		<u-toast ref="uToast" />
		<view class="form-item">
			<view class="formlabel">用户名:</view>
			<view class="forminput">
				<u-input type="text" placeholder="用户名" v-model="c_username" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">确认用户名:</view>
			<view class="forminput">
				<u-input type="text" placeholder="确认用户名" v-model="c_confirmUsername" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">密码:</view>
			<view class="forminput">
				<u-input type="password" placeholder="密码" v-model="c_password" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">确认密码:</view>
			<view class="forminput">
				<u-input type="password" placeholder="确认密码" v-model="c_confirmPassword" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">电子邮箱:</view>
			<view class="forminput">
				<u-input type="text" placeholder="电子邮箱" v-model="c_email" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">确认电子邮箱:</view>
			<view class="forminput">
				<u-input type="text" placeholder="确认电子邮箱" v-model="c_confirmEmail" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">国家/地区:</view>
			<view class="forminput">
				<u-input type="text" placeholder="国家/地区" v-model="c_countryRegion" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">真实姓名:</view>
			<view class="forminput">
				<u-input type="text" placeholder="真实姓名" v-model="c_name" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">证件类型:</view>
			<view class="forminput">
				<u-input type="text" placeholder="证件类型" v-model="c_certificateType" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">证件号码:</view>
			<view class="forminput">
				<u-input type="text" placeholder="证件号码" v-model="c_idNumber" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">性别:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_sex">
					<u-radio name='man'>男</u-radio>
					<u-radio name='woman'>女</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">出生日期:</view>
			<view class="forminput">
				<u-input type="select" placeholder="出生日期" v-model="c_birthday" @click="b_birthday = true" />
				<u-picker mode="time" v-model="b_birthday" :params="p_birthday" @confirm="onChgBirthday" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">政治面貌:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_politicalSituation">
					<u-radio name="party">党员</u-radio>
					<u-radio name="group">团员</u-radio>
					<u-radio name="croud">群众</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">民族:</view>
			<view class="forminput">
				<u-input type="text" placeholder="民族" v-model="c_nation" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">籍贯:</view>
			<view class="forminput">
				<u-input type="text" placeholder="籍贯" v-model="c_nativePlace" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">手机:</view>
			<view class="forminput">
				<u-input type="number" placeholder="手机" v-model="c_mobile" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">固定电话:</view>
			<view class="forminput">
				<u-input type="text" placeholder="固定电话" v-model="c_telephone" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">QQ:</view>
			<view class="forminput">
				<u-input type="text" placeholder="QQ" v-model="c_qq" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">微博:</view>
			<view class="forminput">
				<u-input type="text" placeholder="微博" v-model="c_weibo" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">居住区域:</view>
			<view class="forminput">
				<u-input type="text" placeholder="居住区域" v-model="c_residentialArea" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">详细地址:</view>
			<view class="forminput">
				<u-input type="text" placeholder="详细地址" v-model="c_detailedAddress" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">邮编:</view>
			<view class="forminput">
				<u-input type="text" placeholder="邮编" v-model="c_postCode" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">最高学历:</view>
			<view class="forminput">
				<u-input type="text" placeholder="最高学历" v-model="c_highEducationLevel" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">从业状况:</view>
			<view class="forminput">
				<u-input type="text" placeholder="从业状况" v-model="c_employmentStatus" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">可服务领域:</view>
			<view class="forminput">
				<u-input type="select" placeholder="可服务领域" @click="b_serviceArea = true" v-model="c_serviceArea" />
				<u-select v-model="b_serviceArea" :list="a_serviceAreaList" @confirm="onChgServiceArea" :default-value="[v_serviceArea]" />
			</view>
		</view>
		<view class="form-item" v-if="v_serviceArea === 10">
			<view class="formlabel"></view>
			<view class="forminput">
				<u-input type="text" placeholder="" v-model="c_otherServiceArea" />
			</view>
		</view>
		<u-button class="submitbtn" @click="onSubmit">提交推荐</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				c_username: "",
				c_confirmUsername: "",
				c_password: "",
				c_confirmPassword: "",
				c_email: "",
				c_confirmEmail: "",
				c_countryRegion: "",
				c_name: "",
				c_certificateType: "",
				c_idNumber: "",
				c_sex: "man",
				c_birthday: "",
				b_birthday: false,
				p_birthday: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				c_politicalSituation: "party",
				c_nation: "",
				c_nativePlace: "",
				c_mobile: uni.getStorageSync("MOBILE"),
				c_telephone: "",
				c_qq: "",
				c_weibo: "",
				c_residentialArea: "",
				c_detailedAddress: "",
				c_postCode: "",
				c_highEducationLevel: "",
				c_employmentStatus: "",
				c_serviceArea: "",
				c_otherServiceArea: "",
				b_serviceArea: false,
				v_serviceArea: 0,
				a_serviceAreaList: [{
						value: 0,
						label: "理论宣讲"
					},
					{
						value: 1,
						label: "政策讲解"
					},
					{
						value: 2,
						label: "科技普及"
					},
					{
						value: 3,
						label: "文艺演出、文艺教学"
					},
					{
						value: 4,
						label: "卫生保健"
					},
					{
						value: 5,
						label: "文明引导"
					},
					{
						value: 6,
						label: "文明宣教"
					},
					{
						value: 7,
						label: "儿童教育"
					},
					{
						value: 8,
						label: "活动场地提供"
					},
					{
						value: 9,
						label: "场馆或企业参观"
					},
					{
						value: 10,
						label: "其他可服务社会"
					}
				]
			}
		},
		methods: {
			onChgBirthday(e) {
				this.c_birthday = `${e.year}-${e.month}-${e.day}`
			},
			showToast(title, type) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					position: 'bottom'
				})
			},
			async onSubmit() {
				const message_confirmUsername = "NO CONFIRM USERNAME"
				const message_confirmPassword = "NO CONFIRM PASSWORD"
				const message_confirmEmail = "NO CONFIRM EMAIL"

				if (this.c_username !== "" && this.c_confirmUsername !== "" && this.c_username !== this.c_confirmUsername) {
					this.showToast(message_confirmUsername, "warning")
					return
				}

				if (this.c_password !== "" && this.c_confirmPassword !== "" && this.c_password !== this.c_confirmPassword) {
					this.showToast(message_confirmPassword, "warning")
					return
				}

				if (this.c_email !== "" && this.c_confirmEmail !== "" && this.c_email !== this.c_confirmEmail) {
					this.showToast(message_confirmEmail, "warning")
					return
				}

				if (this.c_username === "" || this.c_confirmUsername === "" || this.c_password === "" || this.c_confirmPassword ===
					"" || this.c_email === "" || this.c_confirmEmail === "" || this.c_countryRegion === "" || this.c_name === "" ||
					this.c_certificateType === "" || this.c_idNumber === "" || this.c_birthday === "" || this.c_nation === "" || this
					.c_nativePlace === "" || this.c_mobile === "" || this.c_residentialArea === "" || this.c_detailedAddress === "" ||
					this.c_postCode === "" || this.c_highEducationLevel === "" || this.c_employmentStatus === "" || this.c_serviceArea ===
					"" || (this.v_serviceArea === 10 && this.c_otherServiceArea === "")) {
					this.showToast(this.$message_inputdata, "warning")
					return
				}

				const data = {
					volunteer: JSON.stringify({
						username: this.c_username,
						password: this.c_password,
						email: this.c_email,
						countryRegion: this.c_countryRegion,
						name: this.c_name,
						certificateType: this.c_certificateType,
						idNumber: this.c_idNumber,
						sex: this.c_sex,
						birthday: this.c_birthday,
						politicalSituation: this.c_politicalSituation,
						nation: this.c_nation,
						nativePlace: this.c_nativePlace,
						mobile: this.c_mobile,
						telephone: this.c_telephone,
						qq: this.c_qq,
						weibo: this.c_weibo,
						residentialArea: this.c_residentialArea,
						detailedAddress: this.c_detailedAddress,
						postCode: this.c_postCode,
						highEducationLevel: this.c_highEducationLevel,
						employmentStatus: this.c_employmentStatus,
						serviceArea: this.c_serviceArea,
						otherServiceArea: (this.v_serviceArea === 10 ? this.c_otherServiceArea : ""),
						logMobile: uni.getStorageSync("MOBILE")
					}),
					sessionId: uni.getStorageSync("SESSION")
				}

				const res = await this.$myRequest({
					url: '/app/volunteer/createNewActivityVolunteer',
					method: 'POST',
					data: data
				})
				if (res.data.code === 200) {
					this.$refs.uToast.show({
						title: this.$message_successsave,
						type: 'success',
						url: '/pages/Home/Home',
						position: 'bottom'
					})
					return
				}
				this.showToast(this.$message_errorsave, 'error')
			},
			onChgServiceArea(e) {
				this.c_serviceArea = e[0].label
				this.v_serviceArea = Number(e[0].value)
			}
		}
	}
</script>

<style>

</style>
