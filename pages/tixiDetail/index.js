const api = require('../../request/api.js')

Page({
  page: 0,
  isShowLoading: false,
  pageCount: 1,
  cid: 0,
  /**
   * 页面的初始数据
   */
  data: {
    tixiDatas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.cid = options.cid
    this.getTixiList()
  },

  async getTixiList () {

    if (this.isShowLoading) {
      return
    }
    if (this.page > this.pageCount) {
      return
    }
    this.isShowLoading = true
    const resp = await api.getTixiList(this.page, this.cid)
    ++this.page
    this.pageCount = resp.data.pageCount,
      this.isShowLoading = false,
      this.setData({
        tixiDatas: this.data.tixiDatas.concat(
          resp.data.datas)
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
    this.getTixiList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
