import wepy from 'wepy'
export default class Example extends wepy.mixin {
  config = {
    // navigationBarTitleText: '大煊商城'
  }

  data = {
    swiperList: [],
    cateItems: [],
    floorData: []
  }
  methods = {
    goGoodsList(url) {
      wepy.navigateTo({
        url
      })
    }
  }
  // 获取轮播图数据
  async getSwiperData() {
    const { data: res } = await wepy.get('/home/swiperdata')
    console.log(res)
    if (res.meta.status !== 200) {
      // 显示微信界面
      return wepy.baseToast()
    }
    this.swiperList = res.message
    this.$apply()
  }
  // 获取cate数据
  async getCateItems() {
    const { data: res } = await wepy.get('/home/catitems')
    console.log(res)
    if (res.meta.status !== 200) {
      // 显示微信界面
      return wepy.baseToast()
    }
    this.cateItems = res.message
    this.$apply()
  }
  // 获取楼层导航
  async getFloorData() {
    const { data: res } = await wepy.get('/home/floordata')
    console.log(res)
    this.floorData = res.message
    this.$apply()
  }
  components = {}

  events = {}

  watch = {}

  computed = {}

  onLoad() {
    this.getSwiperData()
    this.getCateItems()
    this.getFloorData()
  }

  onShow() { }
}