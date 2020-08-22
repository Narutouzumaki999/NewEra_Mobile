<template>
	<view class="form">
		<u-toast ref="uToast" />
		<view class="form-item">
			<view class="formlabel">姓名:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入姓名" v-model="c_name" />
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
			<view class="formlabel">民族:</view>
			<view class="forminput">
				<u-input type="text" v-model="c_nation" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">政治面貌:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_politicalOutlook">
					<u-radio name='party'>党员</u-radio>
					<u-radio name='group'>团员</u-radio>
					<u-radio name='croud'>群众</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">单位:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入单位信息" v-model="c_unit" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">文化程度:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入文化程度" v-model="c_cultureLevel" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">所在地址:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入所在地址" v-model="c_address" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">联系方式:</view>
			<view class="forminput">
				<u-input type="number" placeholder="请输入联系方式" v-model="c_mobile" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">被推荐事迹:</view>
			<view class="forminput">
				<u-input type="select" v-model="c_type" placeholder="请选择被推荐事迹分类" @click="b_typeList = true" />
				<u-action-sheet :list="typeList" v-model="b_typeList" @click="onChgType" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">事迹简述:</view>
			<view class="forminput">
				<u-input type="textarea" height="200" placeholder="请输入被推荐事迹简述" v-model="c_description" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">是否为自荐:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_isSelfRecommend" @change="chgIsSelfRecommend">
					<u-radio name="1">是</u-radio>
					<u-radio name="0">否</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view v-if="c_isSelfRecommend === '0'">
			<view class="form-item">
				<view class="formlabel">推荐人姓名:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入推荐人姓名" v-model="c_recommendName" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">推荐人联系方式:</view>
				<view class="forminput">
					<u-input type="number" placeholder="请输入推荐人手机号" v-model="c_recommendMobile" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">推荐人单位:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入推荐人单位" v-model="c_recommendUnit" />
				</view>
			</view>
			<view class="form-item">
				<view class="formlabel">推荐人邮箱:</view>
				<view class="forminput">
					<u-input type="text" placeholder="请输入推荐人邮箱地址" v-model="c_recommendEmail" />
				</view>
			</view>
		</view>
		<u-button class="submitbtn" @click="onSubmit">提交推荐</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				c_name: '',
				c_sex: 'man',
				c_nation: "",
				c_politicalOutlook: 'party',
				c_unit: "",
				c_cultureLevel: "",
				c_address: "",
				c_mobile: uni.getStorageSync("MOBILE"),
				c_type: '',
				c_description: "",
				c_isSelfRecommend: '1',
				c_recommendName: "",
				c_recommendMobile: uni.getStorageSync("MOBILE"),
				c_recommendUnit: "",
				c_recommendEmail: "",
				b_typeList: false,
				typeList: [{
						text: '敬业奉献'
					},
					{
						text: '孝老爱亲'
					},
					{
						text: '诚实守信'
					},
					{
						text: '助人为乐'
					},
					{
						text: '见义勇为'
					},
					{
						text: '热心公益'
					},
					{
						text: '自强不息'
					},
					{
						text: '勤俭节约'
					},
					{
						text: '其他'
					}
				]
			}
		},
		methods: {
			onChgType(index) {
				this.c_type = this.typeList[index].text
			},
			chgIsSelfRecommend(e) {
				if (e === '0') this.c_mobile = ""
				else this.c_mobile = uni.getStorageSync("MOBILE")
			},
			async onSubmit() {
				const recommend = {
					name: this.c_name,
					sex: this.c_sex,
					nation: this.c_nation,
					politicalOutlook: this.c_politicalOutlook,
					unit: this.c_unit,
					cultureLevel: this.c_cultureLevel,
					address: this.c_address,
					mobile: this.c_mobile,
					type: this.c_type,
					description: this.c_description,
					isSelfRecommend: this.c_isSelfRecommend,
					recommendName: "",
					recommendMobile: "",
					recommendUnit: "",
					recommendEmail: ""
				}

				if (this.c_name === "" || this.c_nation === "" || this.c_unit === "" || this.c_cultureLevel === "" || this.c_address ===
					"" || this.c_mobile === "" || this.c_type === "" || this.c_description === "") {
					this.$refs.uToast.show({
						title: this.$message_inputdata,
						type: 'warning',
						position: 'bottom'
					})
					return
				}

				if (this.c_isSelfRecommend === '0') {
					if (this.c_recommendName === "" || this.c_recommendMobile === "" || this.c_recommendUnit === "" || this.c_recommendEmail ===
						"") {
						this.$refs.uToast.show({
							title: this.$message_inputdata,
							type: 'warning',
							position: 'bottom'
						})
						return
					}
					recommend.recommendName = this.c_recommendName
					recommend.recommendMobile = this.c_recommendMobile
					recommend.recommendUnit = this.c_recommendUnit
					recommend.recommendEmail = this.c_recommendEmail
				}

				const data = {
					recommend: JSON.stringify(recommend),
					sessionId: uni.getStorageSync("SESSION")
				}

				const res = await this.$myRequest({
					url: '/app/request/createNewRecommend',
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
				} else {
					this.$refs.uToast.show({
						title: this.$message_errorsave,
						type: 'error',
						position: 'bottom'
					})
				}
			}
		}
	}
</script>

<style>

</style>
