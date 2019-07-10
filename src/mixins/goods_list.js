import wepy from 'wepy'
export default class Example extends wepy.mixin {

	data = {
		query: '',
		// 商品分类的id
		cid: '',
		pagenum: 1,
		pagesize: 10,
		goodsList: [],
		total: 0,
		flag: false,
		// 表示当前数据是否还在请求中
		isloading: false
	}
	methods = {
		// 点击跳转商品详情页
		goGoodsDetail(gid) {
			wepy.navigateTo({
				url: '/pages/goods_detail/main?goods_id='+gid
			})
		}
	}
	// 获取商品列表
	async getGoodsList() {
		this.isloading = true
		const { data: res } = await wepy.get('/goods/search', {
			query: this.query,
			cid: this.cid,
			pagenum: this.pagenum,
			pagesize: this.pagesize
		})
		console.log(res)
		if (res.meta.status !== 200) {
			return wepy.baseToast()
		}
		this.goodsList = [...this.goodsList, ...res.message.goods]
		this.total = res.message.total
		this.isloading = false
		this.$apply()
		wepy.stopPullDownRefresh()
	}
	// 触底操作
	onReachBottom() {
		// console.log('触底了')
		// 判断当前是否正在请求数据中
		if (this.isloading) { return }
		if (this.pagenum * this.pagesize >= this.total) {
			this.flag = true; 
			return
		}
		this.pagenum++
		this.getGoodsList()
	}
	// 下拉刷新操作
	onPullDownRefresh() {
		// 初始化必要值
		this.pagenum = 1
		this.total = 0
		this.goodsList = []
		this.flag = this.isloading = false
		this.getGoodsList()
	}
	onLoad(options) {
		// console.log(123)
		console.log(options)
		this.query = options.query || ''
		this.cid = options.cid || ''
		this.getGoodsList()
	}
}
