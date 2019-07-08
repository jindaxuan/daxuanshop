import wepy from 'wepy'

console.log(123)
const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'

// 错误弹窗
wepy.baseToast = function(str = '获取数据失败'){
	 wepy.showToast({
		title: str,
		// 弹框不出现任何图片
		icon: 'none',
		duration: 2000
		})
		console.log('456')
}
// 发送请求
wepy.get = function(url,data = { }){
	wepy.request({
		url: baseURL + url,
		data, 
		method: 'GET'
	})
}