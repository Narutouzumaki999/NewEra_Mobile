import Vue from 'vue'
import Router from 'uni-simple-router'
import {
	myRequest
} from '../utils/api.js'

Vue.use(Router)

const router = new Router({
	loading: false,
	routes: [{
			path: "/pages/Login/Login",
			meta: {
				info: "auth"
			}
		},
		{
			path: "/pages/Home/Home",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/NewsPreview/NewsPreview",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/Volunteer/Volunteer",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/VolunteerPreview/VolunteerPreview",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/Practice/Practice",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/PracticePreview/PracticePreview",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/PracticePreview/PracticeActivityPreview/PracticeActivityPreview",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/ModelRecommend/ModelRecommend",
			meta: {
				info: "dash",
			}
		},
		{
			path: "/pages/VolunteerHelp/VolunteerHelp",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/Practice/BasePreview/BasePreview",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/ActivityVolunteer/ActivityVolunteer",
			meta: {
				info: "dash"
			}
		},
		{
			path: "/pages/ActivityAdvertising/ActivityAdvertising",
			meta: {
				info: "dash"
			}
		}
	]
})

router.beforeEach(async (to, from, next) => {
	const SESSION = uni.getStorageSync("SESSION")
	if (to.meta.info === "auth") {
		if (SESSION !== "") {
			next({
				path: '/pages/Home/Home'
			})
		} else if (from.meta.info && from.meta.info === "dash") next()
	} else if (SESSION === "") {
		uni.removeStorageSync("MOBILE")
		next({
			path: '/pages/Login/Login'
		})
	} else if (to.meta.info === "dash") {
		const res = await myRequest({
			url: '/app/login/checkAuth',
			data: {
				sessionId: SESSION
			}
		})
		if (res.data.code === 200)
			next()
		else {
			uni.removeStorageSync("SESSION")
			uni.removeStorageSync("MOBILE")
			next({
				path: '/pages/Login/Login'
			})
		}
	}
})
