// pages/share/index.js
const api = require('../../request/api.js')
Page({
  page: 1,
  pageCount: 1,
  isLoading: false,
  /**
   * 页面的初始数据
   */
  data: {
    shareArticles: []
  },

  addArticleClick () {
    wx.navigateTo({
      url: '/pages/addArticle/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async getMyArticles () {

    if (this.isLoading) {
      return
    }
    if (this.page > this.pageCount) {
      return
    }
    this.isLoading = true
    const resp = await api.getMyArticles(this.page)
    ++this.page
    this.pageCount = resp.data.pageCount
    this.isLoading = false
    this.setData({
      shareArticles: this.data.shareArticles.concat(
        resp.data.shareArticles.datas)
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
    this.page = 1
    this.pageCount = 1
    this.isLoading = false
    this.setData({
      shareArticles:[]
    })
    this.getMyArticles()

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
