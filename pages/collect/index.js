const api = require('../../request/api.js')
Page({
  page: 0,
  pageCount: 1,
  isLoading: false,
  /**
   * 页面的初始数据
   */
  data: {
    collects: []
  },

  async getMyCollects () {

    if (this.isLoading) {
      return
    }
    if (this.page > this.pageCount) {
      return
    }
    this.isLoading = true
    const resp = await api.getMyCollects(this.page)
    const mapResp = resp.data.datas.map(
      ((value, index, array) => ({ collect: true, ...value })))
    console.log(mapResp)
    ++this.page
    this.pageCount = resp.data.pageCount
    this.isLoading = false
    this.setData({
      collects: this.data.collects.concat(
        mapResp)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCollects()
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
