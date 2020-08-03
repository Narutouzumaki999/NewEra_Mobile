import Vue from 'vue'
import App from './App'
import {
	myRequest,
	chgSpecialToText,
	checkAuth
} from './utils/api.js'

Vue.prototype.$myRequest = myRequest
Vue.prototype.$chgSpecialToText = chgSpecialToText
Vue.prototype.$checkAuth = checkAuth
Vue.prototype.$message_inputdata = '자료를 모두 입력하시오'
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()
