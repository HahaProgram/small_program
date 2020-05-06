import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res)=>{
    //     if(res.data.meta.status === 200){
    //       this.setData({
    //         swiperList: res.data.message
    //       })
    //     }
    //   }
    // })

    //
    // 轮播请求
    this.getSwiperList()
    // 导航请求
    this.getNavList()
    // 楼层数据
    this.getFloorList()
  },
  // 轮播图数据请求
  getSwiperList(){
    request({
      url: '/home/swiperdata',
    }).then(res=>{
      this.setData({
        swiperList: res.data.message
      })
    })
  },
  // 导航请求
  getNavList(){
    request({
      url: "/home/catitems"
    }).then(res=>{
      this.setData({
        navList: res.data.message
      })
    })
  },
  getFloorList(){
    request({
      url: "/home/floordata"
    }).then(res=>{
      this.setData({
        floorList: res.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})