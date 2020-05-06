// pages/cart/index.js
import regeneratorRuntime from '../../libs/runtime/runtime';
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModel,
  showToast
} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    address: {},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    let address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 封装
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length ? allChecked : false
    wx.setStorageSync('cart', cart)
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
  },
  // 全选功能
  handleItemAllCheck(){
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(item=>item.checked = allChecked)
    this.setCart(cart)
  },
  // 复选框改变
  handleItemChange(e) {
    let goods_id = e.currentTarget.dataset.id
    let cart = this.data.cart
    let index = cart.findIndex(item => item.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 数量改变
  async handleItemNumEdit(e){
    let {operation, id} = e.currentTarget.dataset
    console.log(id)
    let {cart} = this.data
    let index = cart.findIndex(item=>item.goods_id === id)
    if(cart[index].num === 1 && operation === -1){
      let res = await showModel('确定要删除吗')
      if(res.confirm){
        cart.splice(index, 1)
      }
    }else{
      cart[index].num +=operation
    }
     this.setCart(cart)
  },
  //  结算
  async handlePay(){
    let {cart, address} = this.data
    let isSelect = cart.some(v=>v.checked === true)
    if(!cart.length){
      await showToast('购物车列表为空')
      return
    }else if(!address.userName){
      await showToast('请选择收货地址')
      return
    }else if(!isSelect){
      await showToast('请勾选要购买的商品')
      return
    }
    wx.navigateTo({url: '/pages/pay/index'})
  },
  // 授权选择地址
  async handleChooseAddress() {
    // wx.getSetting({
    //   success: (res)=>{
    //     const scopeAddress = res.authSetting["scope.address"]
    //     if(scopeAddress === true || scopeAddress === undefined){
    //       wx.chooseAddress({
    //         success: (res1)=>{
    //           console.log(res1)
    //         }
    //       })
    //     }else{
    //       wx.openSetting({
    //         success: (res2)=>{
    //           wx.chooseAddress({
    //             success: (res3)=>{
    //               console.log(res3)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    let res = await getSetting()
    const scopeAddress = res.authSetting['scope.address']
    // if(scopeAddress === true || scopeAddress === undefined){
    //   await chooseAddress()
    // }else{
    //   let address = await openSetting() 
    //   await chooseAddress()  // 当 authSetting['scope.address'] 为true时 chooseAddress 才会执行
    // } // 简化后 v
    if (scopeAddress === false) {
      await openSetting()
    }
    let address = await chooseAddress()
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    wx.setStorageSync('address', address)
  }
})