const utils = require('../../utils/util.js')
const api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: 60,
    webNavs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: utils.getNavHeight()
    })
    this.getCache()
  },

  async getCache () {
    const webNav = utils.hasCache('webNav')
    if (webNav) {
      this.dealWebNav(webNav, false)
    } else {
      const resp = await api.getWebNav()
      this.dealWebNav(resp, true)
    }
  },
  dealWebNav (resp, save) {
    if (save) {
      utils.setCache('webNav', resp)
    }
    this.setData({
      webNavs: resp.data
    })
  },
  onItemClick (e) {
    let url = encodeURIComponent(e.currentTarget.dataset.link)
    wx.navigateTo({
      url: `../articleDetail/index?url=${url}`
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
