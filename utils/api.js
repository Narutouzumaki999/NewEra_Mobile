const BASE_URL = 'http://192.168.1.6:8086'
// const BASE_URL = 'http://sycxsd.sycbda.com:8081'
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
				resolve(res)
			},
			fail: (err) => {
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
