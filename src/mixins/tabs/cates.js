import wepy from 'wepy'
export default class Example extends wepy.mixin {
	config = {
		// navigationBarTitleText: '大煊商城'
	}
	data = {
		catesList: [],
		wh: 0,
	}
	methods = {
		onChange(e) {
			console.log(e.detail)
		}
	}
	// 获取左侧栏目
	async getCatesList() {
		const { data: res } = await wepy.get('/categories')
		console.log(res)
		if (res.meta.status !== 200) {
			return wepy.baseToast()
		}
		this.catesList = res.message
		this.$apply()
		// console.log(this.catesList)
	}
	// 动态获取屏幕可用高度
	async getWindowHeight() {
		const res = await wepy.getSystemInfo()
		console.log(res)
		if(res.errMsg === 'getSystemInfo:ok'){
			this.wh = res.windowHeight
			this.$apply()
		}
	}
	onLoad() {
		this.getCatesList()
		this.getWindowHeight()
		// console.log(567)
	}
}
