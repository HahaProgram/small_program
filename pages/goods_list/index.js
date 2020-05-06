// pages/goods_list/index.js
import {request} from '../../request/index.js'
// 将ES7 编译为ES5
import regeneratorRuntime from '../../libs/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  handleChangeIsActive(e){
    let {index} = e.detail
    let tabs = this.data.tabs
    tabs.forEach((item, i)=>{
      i === index ? item.isActive=true:item.isActive=false
    })
    this.setData({
      tabs
    })
  },
  QueryParams: {
    query: '',
    cid: "",
    pagenum:1,
    pagesize: 10
  },
  totalPage: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  async getGoodsList(){
    let res = await request({url: '/goods/search', data: this.QueryParams})
    let goodsData = res.data.message
    this.setData({
      goodsList: [...this.data.goodsList, ...goodsData.goods]
    })
    this.totalPage = Math.ceil( goodsData.total / this.QueryParams.pagesize )
    wx.stopPullDownRefresh()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum >= this.totalPage){
      wx.showToast({
        title: '暂无数据加载'
      })
    }else{
      this.QueryParams.pagenum ++
      this.getGoodsList()
    }
  }
})