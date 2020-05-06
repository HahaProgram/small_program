// pages/goods_detail/index.js
import {request} from '../../request/index.js'
// 将ES7 编译为ES5
import regeneratorRuntime from '../../libs/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: '',
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods_id = options.goods_id

    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    let res = await request({url: '/goods/detail', data: {goods_id}})
    let goodsObj = res.data.message
    this.setData({
      goodsObj: {
        goods_id: goods_id,
        pics: goodsObj.pics,
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        goods_small_logo: goodsObj.goods_small_logo
      }
    })
  },
  handlePrevewImage(e){
    let current = e.currentTarget.dataset.url
    let urls = this.data.goodsObj.pics.map(v=>v.pics_mid)
    console.log(urls)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 添加购物车
  handleAddCart(){
    const cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v=>v.goods_id === this.data.goodsObj.goods_id)
    console.log(index)
    if(index === -1){
      this.data.goodsObj.num = 1
      this.data.goodsObj.checked = true
      cart.push(this.data.goodsObj)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)

    wx.showToast({
      title: '添加成功',
      mask: true,
      icon: 'success'
    })
  }







})