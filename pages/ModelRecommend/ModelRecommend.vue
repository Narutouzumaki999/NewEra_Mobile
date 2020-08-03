<template>
	<view class="form">
		<view class="form-item">
			<view class="formlabel">被推荐人姓名:</view>
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
				<u-input type="text" />
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
				<u-input type="text" placeholder="请输入单位信息" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">文化程度:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入文化程度" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">所在地址:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入所在地址" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">联系方式:</view>
			<view class="forminput">
				<u-input type="text" placeholder="请输入联系方式" />
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
				<u-input type="textarea" height="200" placeholder="请输入被推荐事迹简述" />
			</view>
		</view>
		<view class="form-item">
			<view class="formlabel">是否为自荐:</view>
			<view class="forminput">
				<u-radio-group size="40" v-model="c_isSelfRecommend">
					<u-radio name="1">是</u-radio>
					<u-radio name="0">否</u-radio>
				</u-radio-group>
			</view>
		</view>
		<u-button class="submitbtn">提交推荐</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				c_name: '',
				c_sex: 'man',
				c_type: '',
				c_politicalOutlook: 'party',
				c_isSelfRecommend: 1,
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
			}
		}
	}
</script>

<style>

</style>
