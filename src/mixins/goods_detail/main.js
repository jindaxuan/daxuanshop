import wepy from 'wepy'

export default class Example extends wepy.mixin {
  data = {
    goods_id: '',
    goodsInfo: {},
    addressInfo: null
  }
  methods = {
    // 点击预览图片
    preview(current) {
      wepy.previewImage({
        urls: this.goodsInfo.pics.map(item => item.pics_big), //需要预览的图片链接列表,
        current: current
      });
    },
    async chooseAddress() {
      const res = await wepy.chooseAddress().catch(err => err)
      console.log(res)
      if (res.errMsg !== 'chooseAddress:ok') {
        return wepy.baseToast('获取地址失败')
      }
      this.addressInfo = res
      wepy.setStorageSync('address', 'res');
      // 异步调用一定要用$apply()
      this.$apply()
    },
    // 把选择的商品加入购物车
    addToCart() {
      // console.log('ok')
      // console.log('this.goodsInfo')
      // console.log(this.$parent)
      this.$parent.addGoodsToCart(this.goodsInfo)
      wepy.showToast({
        title: '已加入购物车', //提示的内容,
        icon: 'info', //图标,
        duration: 500, //延迟时间
      })
    }
  }
  computed = {
    addressStr() {
      if (this.addressInfo === null) {
        return '请选择收货地址'
      }
      const attr = this.addressInfo
      const str = attr.provinceName + attr.cityName + attr.countyName + attr.detailInfo
      return str
    }
  }
  onLoad(options) {
    console.log(options)
    this.goods_id = options.goods_id
    this.getGoodsInfo()
  }
  async getGoodsInfo() {
    const { data: res } = await wepy.get('/goods/detail', {
      goods_id: this.goods_id
    })
    console.log(res)
    if (res.meta.status !== 200) {
      return wepy.baseToast()
    }
    this.goodsInfo = res.message
    this.$apply()
    console.log(this.goodsInfo)
  }
}