import wepy from 'wepy'
export default class Example extends wepy.mixin {
	config = {
		// navigationBarTitleText: '大煊商城'
	}
	data = {
		catesList: [],
		wh: 0,
		// 所有的二级分类数据
		secondCate: []
	}
	methods = {

		onChange(e) {
			// 获取索引值
			// console.log(e.detail)
			this.secondCate = this.catesList[e.detail].children
			console.log(this.secondCate)
		},
		// 点击跳转到商品列表
		goGoodsList(cid){
			console.log(cid)
			wepy.navigateTo({ url: '/pages/goods_list?cid=' + cid});
			
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
		this.secondCate = this.catesList[0].children
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
