const BASE_URL = 'http://192.168.1.18:8086'
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				if (res.data.code !== 200) {
					return uni.showToast({
						title: res.data.msg
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '情求接口是白'
				})
				reject(err)
			}
		})
	})
}

export const chgSpecialToText = (text) => {
	text = text.replace(/&amp;/g, "&")
	text = text.replace(/&lt;/g, "<")
	text = text.replace(/&gt;/g, ">")
	text = text.replace(/&quot;/g, '"')
	text = text.replace(/&#039;/g, "'")
	text = text.replace(/alt=""/g, "style='width: 100%;' alt=''")
	return text
}

export const checkAuth = async () => {
	const data = {
		sessionId: uni.getStorageSync("SESSION")
	}
	uni.request({
		url: BASE_URL + "/app/login/checkAuth",
		data: data,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		success: (res) => {
			if (res.data.code === 401) {
				uni.removeStorageSync("SESSION")
				uni.navigateTo({
					url: '/pages/Login/Login'
				})
			}
		}
	})
}
