import wepy from 'wepy'
export default class Example extends wepy.mixin {
  config = {
    // navigationBarTitleText: '大煊商城'
  }
  data = {
    value: '',
    suggesList: [],
    kwList: []
  }
  methods = {
    // 当搜索框内容发生变化时候
    onChange(e) {
      // console.log(e.detail)
      if (e.detail.trim().length <= 0) {
        this.suggesList = []
        return
      }
      this.value = e.detail.trim()
      this.getSuggesList(e.detail)
    },
    // 当搜索内容回车时
    onSearch(e) {
      // console.log(e.detail)
      const kw = e.detail.trim()
      if (kw.length <= 0) {
        this.suggesList = []
        return
      }
      console.log(kw)
      // 把搜索框输入的值放入kwlist中，并且储存到storage中，要加到数组的第一个
      // 保持不在存储输入重复的搜索词
      if (this.kwList.indexOf(kw) === -1) {
        this.kwList.unshift(kw)
      }
      // 数组的slice方法，不会修改原数组，而是返回一个新的数组
      this.kwList = this.kwList.slice(0, 10)
      console.log(this.kwList)
      wepy.setStorageSync(
        'kw',
        this.kwList
      );

      wepy.navigateTo({ url: '/pages/goods_list?query=' + kw });

    },
    // 当取消搜索时候
    onCancel() {
      this.suggesList = []
    },
    // 前往商品细节页
    goGoodsDetail(gid) {
      // console.log(gid)
      wepy.navigateTo({ url: '/pages/goods_detail/main?goods_id=' + gid });

    },
    // 前往商品详情页
    goGoodsList(query) {
      console.log(query)
      wepy.navigateTo({ url: '/pages/goods_list?query=' + query });

    },
    // 清除历史记录
    clearHistory() {
      this.kwList = []
      wepy.setStorageSync('kw',[]);
      
    }
  }

  computed = {
    // true展示历史记录，fals展示搜索
    isShowHistory() {
      if (this.value.length > 0) {
        return true
      }
      return false
    }
  }
  async getSuggesList(id) {
    const { data: res } = await wepy.get('/goods/qsearch', { query: id })
    // console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.suggesList = res.message
    this.$apply()
  }
  onLoad() {
    const kwList = wepy.getStorageSync("kw") || []
    // console.log(kwList)
    this.kwList = kwList
  }

}