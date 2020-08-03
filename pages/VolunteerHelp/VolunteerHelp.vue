<template>
	<view class="form">
		<view class="form-item">
			<view class="formlabel">需求主体:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_type">
					<u-radio name="personal">个人</u-radio>
					<u-radio name="unit">集体</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'personal'">
			<view class="formlabel">求助人姓名:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入姓名" v-model="c_personalName" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'personal'">
			<view class="formlabel">性别:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_personalSex">
					<u-radio name="man">男</u-radio>
					<u-radio name="woman">女</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'personal'">
			<view class="formlabel">年龄:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入求助人年龄" v-model="c_personalAge" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'personal'">
			<view class="formlabel">政治面貌:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_personalPoliticalOutlook">
					<u-radio name="party">党员</u-radio>
					<u-radio name="group">团员</u-radio>
					<u-radio name="croud">群众</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'personal'">
			<view class="formlabel">身份证号:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入身份证号码" v-model="c_personalIdcardNo" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'personal'">
			<view class="formlabel">所在地址:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入所在地址" v-model="c_personalAddress" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">求助单位名称:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入单位名称" v-model="c_unitName" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">单位地址:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入求助单位地址" v-model="c_unitAddress" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">社会代码:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入单位社会代码" v-model="c_unitSocialCode" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">单位法人:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入单位法人信息" v-model="c_unitLegalPerson" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">单位人数:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入单位人数" v-model="c_unitPersonNum" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">单位性质:</view>
			<view class="forminput">
				<u-input type="select" placeholder="请选择单位性质" v-model="c_unitProperty.text" @click="b_property = true" />
				<u-action-sheet :list="propertyList" v-model="b_property" @click="onChgProperty" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">所属行业:</view>
			<view class="forminput">
				<u-input type="select" placeholder="请选择单位所属行业" v-model="c_unitIndustry.text" @click="b_industry = true" />
				<u-action-sheet :list="industryList" v-model="b_industry" @click="onChgIndustry" />
			</view>
		</view>
		<view class="form-item" v-if="c_type === 'unit'">
			<view class="formlabel">联系人:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入单位联系人" v-model="c_unitContactName" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">联系方式:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入联系电话" v-model="c_mobile" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">具体需求:</view>
			<view class="forminput">
				<u-input type="textarea" placeholder="请输入求助需求" height="200" v-model="c_description" />
			</view>
		</view>
		<u-button class="submitbtn">提交求助信息</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				c_type: 'personal',
				c_personalName: '',
				c_personalSex: 'man',
				c_personalAge: '',
				c_personalPoliticalOutlook: 'party',
				c_personalIdcardNo: '',
				c_personalAddress: '',
				c_unitName: '',
				c_unitAddress: '',
				c_unitSocialCode: '',
				c_unitLegalPerson: '',
				c_unitPersonNum: '',
				c_unitProperty: {},
				c_unitIndustry: {},
				c_unitContactName: '',
				c_mobile: '',
				c_description: '',
				industryList: [],
				propertyList: [],
				b_property: false,
				b_industry: false
			}
		},
		methods: {
			onChgProperty(index) {
				this.c_unitProperty = this.propertyList[index]
			},
			onChgIndustry(index) {
				this.c_unitIndustry = this.industryList[index]
			}
		},
		async onLoad() {
			const industryList = [],
				propertyList = []
			const resIndustry = await this.$myRequest({
				url: '/app/request/getUnitIndustryList'
			})
			for (let i = 0; i < resIndustry.data.data.length; i++)
				industryList.push({
					text: resIndustry.data.data[i].title,
					id: resIndustry.data.data[i].id
				})
			this.industryList = industryList

			const resProperty = await this.$myRequest({
				url: '/app/request/getUnitPropertyList'
			})
			for (let i = 0; i < resProperty.data.data.length; i++)
				propertyList.push({
					text: resProperty.data.data[i].title,
					id: resProperty.data.data[i].id
				})
			this.propertyList = propertyList
		}
	}
</script>

<style>

</style>
