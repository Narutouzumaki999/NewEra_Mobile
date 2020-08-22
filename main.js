import Vue from 'vue'
import App from './App'
import {
	myRequest,
	chgSpecialToText,
} from './utils/api.js'
import './router'

Vue.prototype.$myRequest = myRequest
Vue.prototype.$chgSpecialToText = chgSpecialToText
Vue.prototype.$message_inputdata = '请插入所有字段'
Vue.prototype.$message_errorsave = '添加数据失败'
Vue.prototype.$message_successsave = '报名成功'
Vue.prototype.$message_loading = '努力加载中'
Vue.prototype.$message_noactivityvolunteer = '您已经是志愿者，不能重新申请'
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()
