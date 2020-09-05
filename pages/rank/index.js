// pages/rank/index.js
const api = require('../../request/api.js')
Page({
  page: 1,
  pageCount: 1,
  isLoading: false,
  windowWidth: wx.getSystemInfoSync().windowWidth,
  initcoin: 0,
  /**
   * 页面的初始数据
   */
  data: {
    ranks: []

  },
  onItemClick (e) {

    wx.navigateTo({
      url: `../shareAuthor/index?userId=${e.currentTarget.dataset.userid}&shareUser=${e.currentTarget.dataset.username}`

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRank()
  },

  async getRank () {

    if (this.isLoading) {
      return
    }
    if (this.page > this.pageCount) {
      return
    }
    this.isLoading = true
    const resp = await api.getRank(this.page)
    resp.data.datas.forEach(((value, index, array) => {
      if (this.initcoin === 0) {
        this.initcoin = value.coinCount
      }
      let rankBgWidth = Math.floor(
        value.coinCount / this.initcoin * this.windowWidth)
      this.data.ranks.push({ rankBgWidth, ...value })

    }))
    ++this.page
    this.pageCount = resp.data.pageCount
    this.isLoading = false
    this.setData({
      ranks: this.data.ranks
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
    this.getRank()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
