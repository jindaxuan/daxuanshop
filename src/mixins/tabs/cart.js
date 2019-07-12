import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        cart: []
    }

    onLoad() {
        console.log('cart')
        this.cart = this.$parent.globalData.cart
        console.log(this.cart)
    }
    computed = {
        // 判断购物车是否为空
        isempty() {
            if (this.cart.length <= 0) {
                return true
            }
            return false
        },
        amount() {
            let total = 0
            this.cart.forEach(x => {
                if (x.isCheck) {
                    total += x.price * x.count
                }
            })
            return total * 100
        },
        isFullCheck() {
            // 获取所有商品个数
            let total = this.cart.length
            let num = 0
            this.cart.forEach(item => {
                // 获取已经选中的商品数
                if (item.isCheck) {
                    num++
                }
            })
            // 返回总数是否等于数量
            return total === num
        }
    }
    methods = {
        // 当购物车数量发生变化时候
        countChanged(e) {
            // 获取到变化之后最新的数量值
            // console.log(e.detail)
            // 获取商品id值
            // console.log(e.target.dataset.id)
            const count = e.detail
            const id = e.target.dataset.id
            this.$parent.updateGoodsCount(id, count)
        },
        // 当商品的复选框选中状态发生变化时
        statusChange(e) {
            console.log(e)
            // 当点击选中状态
            const status = e.detail
            // 商品id
            const id = e.target.dataset.id
            this.$parent.updateGoodsStatus(id, status)
        },
        // 点击删除对应的商品
        close(id) {
            console.log(id)
            this.$parent.removeGoodsById(id)
        },
        submitCarder() {
            if(this.amount <= 0) {
                return wepy.baseToast('订单金额不能为空')
            }
            wepy.navigateTo({
                url:'/pages/order'
            })
        },
        onFullCheckChanged(e) {
            this.$parent.updateAllGoodsStatus(e.detail)
        }

    }
}
