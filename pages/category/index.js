import {
  request
} from '../../request/index.js'
// 将ES7 编译为ES5
import regeneratorRuntime from '../../libs/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    catesList: [],
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCats()
    } else {
      if (Date.now() - cates.time > 1000*60*10) { // 有效期 10分钟
        this.getCats()
      } else {
        let leftMenuList = cates.data.map(item => {
          return item.cat_name
        })
        let rightContent = cates.data[0]
        this.setData({
          leftMenuList,
          rightContent
        })
      }

    }


  },
  async getCats() {
    // request({
    //   url: '/categories'
    // }).then(res => {
    //   let catesList = res.data.message
    //   // 将数据缓存起来
    //   wx.setStorageSync("cates", {
    //     time: Date.now(),
    //     data: catesList
    //   })
    //   let leftMenuList = catesList.map(item => {
    //     return item.cat_name
    //   })
    //   let rightContent = catesList[0]
    //   this.setData({
    //     leftMenuList,
    //     rightContent,
    //     catesList
    //   })
    // })
    let res = await request({url: '/categories'})
    let catesList = res.data.message
      // 将数据缓存起来
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: catesList
      })
      let leftMenuList = catesList.map(item => {
        return item.cat_name
      })
      let rightContent = catesList[0]
      this.setData({
        leftMenuList,
        rightContent,
        catesList
      })
  },
  handleItemActive(e) {
    let index = e.currentTarget.dataset.index
    let catesList = wx.getStorageSync('cates').data
    this.setData({
      currentIndex: index,
      rightContent: catesList[index],
      scrollTop: 0
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